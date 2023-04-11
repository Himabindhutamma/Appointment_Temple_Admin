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
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker'

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
  { id: 'doctorName', label: 'Doctor Name', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'heading', label: 'Heading', alignRight: false },
  { id: 'para', label: 'Content', alignRight: false },
  { id: 'profilePath', label: 'Image', alignRight: false }
]

const Latestnews = ({ onSubmit, nid, getData, news }) => {
  console.log(getData,nid)
  const [open, setOpen] = useState(false)
  const [doctor,setDoctor]=useState('')
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [files, selectFiles] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [heading, setHeading] = useState('')
  const [head,setHead]=useState('')
  const [date,setDate]=useState(new Date())
  const [mainheading, setMainheading] = useState('')
  const [para, setPara] = useState('')
  const [para1, setPara1] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [imgs, setImgs] = useState([])
  console.log(date)
  console.log(news)
  const openForm = () => {
    setHeading("");
    setPara("");
    setPara1("");
    setOpen(true);
    // setFormstatus(true);
  }
  const onCancel = () => {
    setValid(false);
    setFormstatus(false);
  }
  useEffect(() => {
    if (news) {
      setMainheading(news.mainheading)
    }
  }, [news])
  const handleClick = (value) => {
    console.log(value);
    setCardsList(value.news.cardsList);
    setMainheading(value.news.mainheading);
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
    if (news) {
      updateForm();
    } else {
      saveCards();
    }
    // setFormstatus(false);
  }

  const updateForm = () => {
    console.log(cardsList)
    const data1 = {
      "mainheading": mainheading,
      "cardsList": cardsList
    }
    let data = {
      "staticPageId_staticPages": nid, "name_staticPages": "latestnew4", "data_staticPages": JSON.stringify(data1),
      "isActive_staticPages": 1,
    };
    console.log(data)
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
    const data1 = {
      "mainheading": mainheading,
      "cardsList": cardsList
    }
    let data = {
      "staticPageId_staticPages": null, "name_staticPages": "latestnew4", "data_staticPages": JSON.stringify(data1),
      "isActive_staticPages": 1,
      
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
      doctorName:doctor,
      date:date,
      heading: head,
      para: para,      
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
    setPara('')
    setPara1('')
  }

  return (
    <>
      <div>
        <Paper elevation={16}>
          <ContentStyle>
            <Box mt={2} className='bottom-login'>
              <Box sx={{ marginLeft: 'auto' }}>
                {!news ?
                  <MBFormButton variant='outlined' onClick={openForm}> Add Cards</MBFormButton> : <MBFormButton variant='outlined' onClick={() => handleClick({ news })}>Update Cards</MBFormButton>
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
                    label={'Main Heading'}
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
                        <legend>{data1.doctorName}</legend>
                        <MBTextField
                          className='marignb' id={'doctor'} name={'doctor'} value={data1.doctorName} key={'index'} label={'Doctor Name'} validate={valid}
                          onChange={(e) => {
                            data1.doctorName = e.target.value;
                            setCardsList([...cardsList]);
                          }}
                        />
                         <MBDatePicker
                          className='marignb' id={'date'} name={'date'} value={data1.date} key={'index'} label={'Date'} validate={valid}
                          onChange={(e) => {
                            data1.date = e.target.value;
                            setCardsList([...cardsList]);
                          }}
                        />
                        <MBTextField
                          className='marignb' id={'heading'} name={'heading'} value={data1.heading} key={'index'} label={'heading'} validate={valid}
                          onChange={(e) => {
                            data1.heading = e.target.value;
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
                disabled={false}
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
                <h5 className='w-h5'>{news && news.mainheading}</h5>
                {<MBTable data={news ? news.cardsList : cardsList} head={TABLE_HEAD} />}
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
                {news ? <MBFormButton onClick={() => {
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
              <DialogTitle>Add</DialogTitle>
              <MBForm onSubmit={addMultipleCards}>
                <DialogContent>
                  <MBTextField
                    className='marignb'
                    id={'doctor'}
                    name={'doctor'}
                    value={doctor}
                    key={'doctor'}
                    label={'Doctor Name'}
                    required={true}
                    validate={valid}
                    onChange={e => {
                      setDoctor(e.target.value)
                    }}
                  />
                   <MBDatePicker
                    name={para1}
                    value={date} id={date} key={date} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setDate(e.target.value)
                    }}
                    label={'Date'}
                  />
                   <MBTextField
                    name={head}
                    value={head} id={head} key={'head'} required={true} validate={valid}
                    className='marignb'
                    onChange={e => {
                      setHead(e.target.value)
                    }}
                    label={'Heading'}
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
export default connect(mapStateToProps)(Latestnews)
