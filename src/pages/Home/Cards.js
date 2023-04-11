import React, { useState, useEffect } from 'react'
import { useFileUpload } from 'use-file-upload'
import { styled } from '@mui/material/styles'
import { Typography, Box, Grid, Stack } from '@mui/material'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import MBTable from '../../FunctionalComponents/MBTable/MBTable'
import axios from 'axios'
import Store from '../../Store'
import { AlertTypes, ReducerTypes } from '../../Assets/Constants'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { connect } from 'react-redux'
import Axios from '../../Services/API'

const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 580,
  padding: '25px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
  // padding: theme.spacing(12, 0),
}))

const TABLE_HEAD = [
  { id: 'heading', label: 'Heading', alignRight: false },
  // { id: 'para', label: 'Content', alignRight: false },
  { id: 'profilePath', label: 'Image', alignRight: false }
]

const Cards = ({ onSubmit, cid1, getData, dataset1 }) => {
  const [open, setOpen] = useState(false)
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [files, selectFiles] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [heading, setHeading] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [para, setPara] = useState('')
  const [img, setImg] = useState()
  const [imgs, setImgs] = useState([])
  // const [file, setFile] = useState(null);
  console.log(files,imgs[2]);
  console.log(imgs)
  console.log("updatedimg")
  useEffect(() => {
    fetchImage()
  }, [dataset1])
  
  console.log(dataset1)

  const openForm = () => {
    setHeading("");
    setProfile("");
    setOpen(true);
  }
  const onCancel = () =>{
    setValid(false);
    setFormstatus(false);
  }
  const handleClick = (value) => {
    console.log(value);
    setFormstatus(true);
    setCardsList(value.dataset1)
   
  };


  const handleClose = () => {
    setValid(false)
    setProfile('');
    // setPara('');
    setOpen(false);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    setValid(true);
    console.log(formstatus)
    console.log("form Submitted...")
    if (dataset1) {
      updateForm();
    } else {
      saveCards();
    }
    // setFormstatus(false);
  }

  const updateForm = () => {
  console.log(cardsList)
     let data1 = cardsList
    let data = {
      "staticPageId_staticPages": cid1, "name_staticPages": "banner-card5", "data_staticPages": JSON.stringify(data1),
      "isActive_staticPages":1
    };

    Axios.putData('Update_staticPages/', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Updated cards successfully`,
          type: AlertTypes.SUCCESS_ALERT_TYPE,
          timeOut: 1000
        }
      })
      getData();
      setFormstatus(false);
})
  }


  const saveCards = () => {
  console.log(cardsList)
    let data1 = cardsList
    let data = {
      "staticPageId_staticPages": null, "name_staticPages": "banner-card5", "data_staticPages": JSON.stringify(data1),
      "isActive_staticPages": 1
    };

    Axios.postData('DirectInsert_staticPages', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Cards added successfully`,
          type: AlertTypes.SUCCESS_ALERT_TYPE,
          timeOut: 1000
        }
      })
      getData();

    })


  }
  const fetchImage = () => {
    const promises = [];
    // dataset1.forEach((profilePath) => {
    //   console.log("profilePath",profilePath.profilePath)
    //     promises.push(fetch(`http://183.82.144.189:4000/RestApi/v1/GetFile/${profilePath.profilePath}`));
    // })

    Promise.all(promises).then((responses) => {
      console.log(responses)
      const imageObjectURL = responses.map((response) =>response.url);
      console.log(imageObjectURL)
      setImgs(imageObjectURL)
      
    })
    

}
  // const fetchImage = async () => {
  //   // let dataimg = dataset1.forEach(i => i.profilePath)
  //   const res = await fetch(
  //     `http://localhost:4000/RestApi/v1/GetFile/1658313722477538803document1.png`
  //   )
  //   const imageBlob = await res.blob()
  //   const imageObjectURL = URL.createObjectURL(imageBlob)
  //   setImg(imageObjectURL)
  // }
  const addMultipleCards = e => {
    console.log('added multiple cards....')
    e.preventDefault()
    setValid(false)
    var formdata = new FormData()
    formdata.append('images', files.file, 'bannerlogo.jpg')

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    fetch(`${process.env.REACT_APP_API_URL}Upload_files/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        console.log(result.Message[0].filename)
        // formSubmit(result.Message[0].filename)
        let cf = {
          heading: heading,
          // para: para
          profilePath:result.Message[0].filename,
        }
        let newList = [...cardsList]
        newList.push(cf)
        setCardsList(newList)
        console.log(newList)
        console.log(cf)
        })
      .catch(error => {
        console.log('error', error)
      })
   

    setOpen(false)
    setHeading('')
    // setFormstatus(true)
    // setPara('')
  }


  return (
    <>
      <div>
        {/* <img src={files?.source}/>  */}
      <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
              {!dataset1 ?
                <MBFormButton variant='outlined' onClick={openForm}> Add Cards</MBFormButton> : <MBFormButton variant='outlined' onClick={() => handleClick({ dataset1 })}>Update Cards</MBFormButton>
              }
            </Box>
          </Box>
        <MBForm onSubmit={formSubmit}>
        {formstatus ? <>
          <Grid spacing={1} container>
           {cardsList.map((data1, index) => (
            <Grid item xs={6}>
            <fieldset className='fieldset'>
               <legend>{data1.heading}</legend>
               <MBTextField
                  className='marignb' id={'heading'} name={'heading'} value={data1.heading} key={'index'} label={'Heading'} validate={valid}
                  onChange={(e) => {
                   data1.heading = e.target.value;
                   setCardsList([...cardsList]);
                  }}
                />
                <input type="file" accept="image/*" onChange={(e) =>{
                  console.log(e.target.files[0]);
                   var formdata = new FormData()
                    formdata.append('images', e.target.files[0], 'medical.jpg')
                    var requestOptions = {method: 'POST',body: formdata,redirect: 'follow'}
                    fetch(`${process.env.REACT_APP_API_URL}Upload_files/`, requestOptions)
                      .then(response => response.json())
                      .then(result => {
                          data1.profilePath = result.Message[0].filename;
                          setCardsList([...cardsList]);
                        })
                      .catch(error => {
                        console.log('error', error)
                      })
                  }
                 
                 } />
                 {data1 ? data1.profilePath : " no file selected"}
                </fieldset>
                </Grid>
            ))}
            </Grid>
          </> : <>
          <MBTable  data={dataset1? dataset1 : cardsList} head={TABLE_HEAD} />
        </>
        }
        
        <Stack
            direction='row'
            alignItems='right'
            justifyContent='right'
            sx={{ my: 2 }}
          >
            <MBFormButton fullWidth={false} color='error'variant='contained' style={{ marginRight: '5px' }} onClick={onCancel} type={'button'}>
                  Cancel
                </MBFormButton>
            {dataset1 ? <MBFormButton onClick={() => {setValid(true)
                }} type={'submit'} variant="contained" fullWidth={false}>
                  Update
                </MBFormButton> : <MBFormButton onClick={() => {setValid(true)
                }} type={'submit'} variant="contained" fullWidth={false}>
                  Submit
                </MBFormButton>}
                

          </Stack>
      </MBForm>
        <ContentStyle>
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle>Add Tariff</DialogTitle>
            <MBForm onSubmit={addMultipleCards}>
              <DialogContent>
                <MBTextField
                  className='marignb'
                  id={'heading'}
                  name={'heading'}
                  value={heading}
                  key={'heading'}
                  label={'Heading'}
                  required={true}
                  validate={valid}
                  onChange={e => {
                    setHeading(e.target.value)
                  }}
                />
 

                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant='body1'
                    sx={{ color: 'text.secondary' }}
                    noWrap
                  >
                    Upload logo Picture
                  </Typography>
                  <div className=''>
                      <img src={files ? files.source : img} alt='preview' />
                      <MBFormButton
                        className='upload-button'
                        type='button'
                        onClick={() =>
                          selectFiles(
                            { accept: 'image/*' },
                            ({ name, size, source, file }) => {
                              console.log(file);
                              //   let setdata = {name, size, source, file}
                              //   setProfile(setdata);
                            }
                          )
                        }
                      >
                        Upload
                      </MBFormButton>
                    </div>
                </Grid>
              </DialogContent>
              <DialogActions>
                <MBFormButton
                  variant={'contained'}
                  fullWidth={false}
                  color='error'
                  style={{ marginRight: '5px' }}
                  onClick={handleClose}
                  type={'cancel'}
                >
                  Cancel
                </MBFormButton>
                <MBFormButton
                  variant={'contained'}
                  type={'submit'}
                  onClick={() => {
                    setValid(true)
                  }}
                  fullWidth={false}
                >
                  Submit
                </MBFormButton>
              </DialogActions>
            </MBForm>
          </Dialog>
        </ContentStyle>
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(Cards)
