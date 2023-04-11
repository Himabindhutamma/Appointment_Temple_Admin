import React, { useState, useEffect } from 'react'
import { useFileUpload } from 'use-file-upload'
import { styled } from '@mui/material/styles'
import { Typography, Box, Grid, Stack } from '@mui/material'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import MBTable from '../../FunctionalComponents/MBTable/MBTable'
import MBTextArea from '../../FunctionalComponents/MBTextArea/MBTextArea'
import axios from 'axios'
import Store from '../../Store'
import { AlertTypes, ReducerTypes } from '../../Assets/Constants'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { connect } from 'react-redux'
import Paper from '@mui/material/Paper'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
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
  { id: 'name', label: 'Specialization', alignRight: false },
  { id: 'para', label: 'Content', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'para1', label: 'Content', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'para2', label: 'Content', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'profilePath', label: 'Image', alignRight: false }
]

const Ourspecialists = ({ onSubmit, did, getData, doctor }) => {
  const [open, setOpen] = useState(false)
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [files, selectFiles] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [heading, setHeading] = useState('')
  const [mainheading, setMainheading] = useState('')
  const [para, setPara] = useState('')
  const [para1, setPara1] = useState('')
  const [para2, setPara2] = useState('')
  const [time, setTime] = useState('')
  const [time1, setTime1] = useState('')
  const [time2, setTime2] = useState('')
  const [name, setName] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [imgs, setImgs] = useState([])
  console.log(doctor)
  const openForm = () => {
    setHeading("");
    setPara("");
    setPara1("");
    setPara2("");
    setTime("");
    setTime1("");
    setTime2("");
    setName("");
    setOpen(true);
  }
  const onCancel = () => {
    setValid(false);
    setFormstatus(false);
  }
  const handleClick = (value) => {
    console.log(value);
    setCardsList(value.doctor.cardsList);
    setMainheading(value.doctor.mainheading);
    setFormstatus(true);
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
    if (doctor) {
      updateForm();
    } else {
      saveCards();
    }
    // setFormstatus(false);
  }

  const updateForm = () => {
    console.log(cardsList)
    const data1 ={
      "mainheading":mainheading,
      "cardsList":cardsList
    }  
    let data = {
      "staticPageId_staticPages": did, "name_staticPages": "doctorsdata4", "data_staticPages": JSON.stringify(data1),
      "isActive_staticPages":1
    };

    Axios.putData('Update_staticPages/', data).then(res => {
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
      setFormstatus(false);
    })
  }

  const saveCards = () => {
    console.log(cardsList)
    const data1 ={
      "mainheading":mainheading,
      "cardsList":cardsList
    }  
    let data = {
      "staticPageId_staticPages": null, "name_staticPages": "doctorsdata4", "data_staticPages": JSON.stringify(data1),
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
      name: name,
      para: para,
      time: time,
      para1: para1,
      time1: time1,
      para2: para2,
      time2: time2,
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
    setHeading('');
    setName('');
    setPara('');
    setTime('');
    setPara1('');
    setTime1('');
    setPara2('');
    setTime2('');
  }

  return (
    <>
      <div>
        <Paper elevation={16}>
          <ContentStyle>
            <Box mt={2} className='bottom-login'>
              <Box sx={{ marginLeft: 'auto' }}>
                {!doctor ?
                  <MBFormButton variant='outlined' onClick={openForm}> Add Cards</MBFormButton> : <MBFormButton variant='outlined' onClick={() => handleClick({ doctor })}>Update Cards</MBFormButton>
                }
              </Box>
            </Box>
            <MBForm onSubmit={formSubmit}>
              {formstatus ? <>
                <Stack spacing={3}>
                <MBTextField
                  fullWidth
                  id={'mainheading'}
                  name={'mainheading'}
                  value={mainheading}
                  key={'mainheading'}
                  label={'Mainheading'}
                  error
                  validate={valid}
                  onChange={e => {
                    setMainheading(e.target.value)
                  }}
                />
              </Stack>
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
                      <MBTextField
                       className='marignb' id={'name'} name={'name'} value={data1.name} key={'index'} label={'name'} validate={valid}
                       onChange={(e) => {
                        data1.name = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                     <MBTextField
                       className='marignb' id={'para'} name={'para'} value={data1.para} key={'index'} label={'Paragraph'} validate={valid}
                       onChange={(e) => {
                        data1.para = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                     <MBTextField
                       className='marignb' id={'time'} name={'time'} value={data1.time} key={'index'} label={'Time Paragraph'} validate={valid}
                       onChange={(e) => {
                        data1.time = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                      <MBTextField
                       className='marignb' id={'para1'} name={'para1'} value={data1.para1} key={'index'} label={'para1'} validate={valid}
                       onChange={(e) => {
                        data1.para1 = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                     <MBTextField
                       className='marignb' id={'time1'} name={'time1'} value={data1.time1} key={'index'} label={'Time Paragraph'} validate={valid}
                       onChange={(e) => {
                        data1.time1 = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                     <MBTextField
                       className='marignb' id={'para2'} name={'para2'} value={data1.para2} key={'index'} label={'para2'} validate={valid}
                       onChange={(e) => {
                        data1.para2 = e.target.value;
                        setCardsList([...cardsList]);
                       }}
                     />
                      <MBTextField
                       className='marignb' id={'time2'} name={'time2'} value={data1.time2} key={'index'} label={'Time Paragraph'} validate={valid}
                       onChange={(e) => {
                        data1.time2 = e.target.value;
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
              {/* <Stack spacing={3}>
                <MBTextField
                  fullWidth
                  id={'mainheading'}
                  name={'mainheading'}
                  value={mainheading}
                  key={'mainheading'}
                  label={'Mainheading'}
                  error
                  validate={valid}
                  onChange={e => {
                    setMainheading(e.target.value)
                  }}
                />
              </Stack> */}
              <h5 className='w-h5'>{doctor && doctor.mainheading}</h5> 
               {<MBTable data={doctor ? doctor.cardsList : cardsList} head={TABLE_HEAD} />}
              </>
              }
              <Stack
                direction='row'
                alignItems='right'
                justifyContent='right'
                sx={{ my: 2 }}
              >
                <MBFormButton fullWidth={false} color='error' variant='contained' style={{ marginRight: '5px' }} onClick={onCancel} type={'button'}>
                  Cancel
                </MBFormButton>
                {doctor ? <MBFormButton onClick={() => {
                  setValid(true)
                }} type={'submit'} variant="contained" fullWidth={false}>
                  Update
                </MBFormButton> : <MBFormButton onClick={() => {
                  setValid(true)
                }} type={'submit'} variant="contained" fullWidth={false}>
                  Submit
                </MBFormButton>}
              </Stack>
            </MBForm>
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
                    label={'Doctor Name'}
                    required={true}
                    validate={valid}
                    onChange={e => {
                      setHeading(e.target.value)
                    }}
                  />
                  <MBTextField
                    className='marignb'
                    id={'name'}
                    name={'name'}
                    value={name}
                    key={'name'}
                    label={'Specialization'}
                    required={true}
                    validate={valid}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  />
                  <MBTextField
                    name={para}
                    value={para} id={para} key={'para'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setPara(e.target.value)
                    }}
                    label={'Paragraph'}
                  />
                  <MBTextField
                    name={time}
                    value={time} id={time} key={'time'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setTime(e.target.value)
                    }}
                    label={'Time Paragraph'}
                  />
                  <MBTextField
                    name={para1}
                    value={para1} id={para1} key={'para1'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setPara1(e.target.value)
                    }}
                    label={'Paragraph'}
                  />
                  <MBTextField
                    name={time1}
                    value={time1} id={time1} key={'time1'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setTime1(e.target.value)
                    }}
                    label={'Time Paragraph'}
                  />
                  <MBTextField
                    name={para2}
                    value={para2} id={para2} key={'para2'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setPara2(e.target.value)
                    }}
                    label={'Paragraph'}
                  />
                  <MBTextField
                    name={time2}
                    value={time2} id={time2} key={'time2'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setTime2(e.target.value)
                    }}
                    label={'Time Paragraph'}
                  />

                  <Grid item xs={12} sm={6} md={6}>
                    <Typography
                      variant='body1'
                      sx={{ color: 'text.secondary' }}
                      noWrap
                    >
                      Upload Doctor Picture
                    </Typography>
                    <div className=''>
                      <img src={profile?.source} alt='preview' />
                      <MBFormButton
                        className='upload-button'
                        type='button'
                        onClick={() =>
                          selectFiles(
                            { accept: 'image/*' },
                            ({ name, size, source, file }) => {
                              let setdata = { name, size, source, file }
                              setProfile(setdata)
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
        </Paper>
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(Ourspecialists)

