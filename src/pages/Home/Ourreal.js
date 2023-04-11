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
import { AlertTypes, ReducerTypes,Basic } from '../../Assets/Constants'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { connect } from 'react-redux'
import Paper from '@mui/material/Paper'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Axios from '../../Services/API'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 580,
  padding: '25px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
  // padding: theme.spacing(12, 0),
}))

const actions = [{ icon: "", actionName: Basic.EDIT_ACTION }]
const Ourreal = ({tid, getData, testimonials }) => {
  console.log(testimonials);
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
  const [subheading, setSubheading] = useState('')
  const [smalltext, setSmalltext] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [rowdata, setRowdata] = useState(null)
  const [img, setImg] = useState()
  console.log(rowdata);
  console.log(files)
  useEffect(() => {
    fetchImage()
  }, [testimonials])
  useEffect(() => {
    if (rowdata) {
      console.log(rowdata);
      setMainheading(rowdata.mainheading);
      setPara(rowdata.para);
      setSubheading(rowdata.subheading);
      setSmalltext(rowdata.smalltext);
      setProfile(rowdata.profile)
    }
  }, [rowdata])
  const openForm = () => {
    setMainheading("");
    setPara("");
    setSubheading("");
    setSmalltext("");
    setProfile('')
    setFormstatus(true);
  }
  const cancelForm = () => {
    setValid(false);
    setMainheading("");
    setPara("");
    setSubheading("");
    setSmalltext("");
    setProfile('')
  }
  const handleClick = (value) => {
    console.log(value);
    setFormstatus(true);
    setRowdata(value.testimonials);
  };
  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   setValid(true);
  //   e.preventDefault();
  //   if (rowdata) {
  //     updateForm();
  //   } else {
  //     submitForm();
  //   }
  // }
  // const updateForm = () => {
  //   let data1 = {
  //     "mainheading": mainheading,
  //     "para": para,
  //     "subheading":subheading,
  //     "smalltext":smalltext
  //   }
  //   let data = {
  //     "staticPageId_staticPages": tid, "name_staticPages": "Test", "content_staticPages": JSON.stringify(data1),
  //     "createdDate_staticPages": " ", "updatedDate_staticPages": " "
  //   };
  //   axios.put(`${process.env.REACT_APP_URL}staticpage/updateStaticPage`, data)
  //     .then(res => {
  //       Store.dispatch({
  //         type: ReducerTypes.SHOW_ALERT.toString(),
  //         payload: {
  //           showAlert: true,
  //           message: `Updated Successfully!`,
  //           type: AlertTypes.SUCCESS_ALERT_TYPE
  //         }
  //       });
  //       cancelForm();
  //       getData();
  //       setFormstatus(false);
  //     })
  // }
  // const submitForm = () => {
  //   let data1 = {
  //     "mainheading": mainheading,
  //     "para": para,
  //     "subheading":subheading,
  //     "smalltext":smalltext
  //   }
  //   let data = {
  //     "staticPageId_staticPages": null, "name_staticPages": "Test", "content_staticPages": JSON.stringify(data1),
  //     "createdDate_staticPages": " ", "updatedDate_staticPages": " "
  //   };

  //   axios.post(`${process.env.REACT_APP_URL}staticpage/addstaticData`, data).then(res => {
  //     Store.dispatch({
  //       type: ReducerTypes.SHOW_ALERT.toString(),
  //       payload: {
  //         showAlert: true,
  //         message: `Cards added successfully`,
  //         type: AlertTypes.SUCCESS_ALERT_TYPE,
  //         timeOut: 1000
  //       }
  //     })
  //     cancelForm();
  //     setFormstatus(false);

  //   })
  // }
  const uploadImg = (e) => {
    e.preventDefault();
    setValid(true)
    if(files){
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
          // formSubmit(result.Message[0].filename)
          if(rowdata){
            updateForm(result.Message[0].filename)
          }else{
            submitForm(result.Message[0].filename)
          }
          
        })
        .catch(error => {
          console.log('error', error)
        })
    }else if(rowdata){
      updateForm()
    }else{
      submitForm()
    }

  }

  const updateForm = (profilePath) => {
    let data1 = {
      mainheading: mainheading,
           para: para,
           subheading: subheading,
           smalltext:smalltext,
        profilePath: profilePath
    }
    let data2 = {
      staticPageId_staticPages: tid,
      name_staticPages: 'Test1',
      data_staticPages: JSON.stringify(data1),
      isActive_staticPages: 1
    }
    Axios.putData('Update_staticPages/', data2).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Updated Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
  const submitForm = profilePath => {
    let data1 = {
      mainheading: mainheading,
      para: para,
      subheading: subheading,
      smalltext:smalltext,
   profilePath: profilePath
    }
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'Test1',
      data_staticPages: JSON.stringify(data1),
      isActive_staticPages: 1,
    }

    Axios.postData('DirectInsert_staticPages', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Banner Added Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
  const fetchImage = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}GetFile/${testimonials.profilePath}`
    )
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    setImg(imageObjectURL)
  }
  
  return (
    <>
    
            <Paper elevation={16}>
        <ContentStyle>
          <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
              {/* <MBFormButton variant='outlined' onClick={openForm}>
                Add WhyChooseUs
              </MBFormButton> */}
              {/* {!testimonials ?
                <MBFormButton variant='outlined' onClick={openForm}> Add Testimonials</MBFormButton> : <MBFormButton variant='outlined' onClick={() => handleClick({ testimonials })}>Update Choose_us</MBFormButton>
              } */}
               {!testimonials ? (
                <MBFormButton variant='outlined' onClick={openForm}>
                  {' '}
                  Add Content
                </MBFormButton>
              ) : (
                <MBFormButton
                  variant='outlined'
                  onClick={() => handleClick({ testimonials })}
                >
                  Update Content
                </MBFormButton>
              )}
            </Box>
          </Box>
          {formstatus ?
            <MBForm onSubmit={uploadImg}>
              <Stack spacing={3}>
              <MBTextField
                fullWidth
                id={'mainheading'}  name={'mainheading'} value={mainheading} key={'mainheading'}label={'Mainheading'}error
                validate={valid}
                onChange={e => {
                  setMainheading(e.target.value)
                }}
              />
              <MBTextArea
                className='marignb' id={'para'}name={'para'}  value={para} key={'para'}  label={'Paragraph'} validate={valid}
                onChange={e => {
                  setPara(e.target.value)
                }}
              />
              <MBTextField
                className='marignb' id={'subheading'}  name={'subheading'} value={subheading} key={'subheading'} label={'Sub Heading'}
                validate={valid}
                onChange={e => {
                  setSubheading(e.target.value)
                }}
              />
              <MBTextField
                className='marignb' id={'smalltext'} name={'smalltext'} value={smalltext} key={'smalltext'} label={'Small Text'}
                validate={valid}
                onChange={e => {
                  setSmalltext(e.target.value)
                }}
              />
              {/* <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='body1'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  Upload Our Real Testimonials Picture
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
              </Grid> */}
              <Grid container spacing={3} style={{ margin: '7px -24px' }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography
                      variant='body1'
                      sx={{ color: 'text.secondary' }}
                      noWrap
                    >
                       Upload Our Real Testimonials Picture
                    </Typography>
                    <div className='img-container'>
                     <img src={files ? files.source : img} alt='preview' />
                    <div className="overlay">
                        <CloudUploadOutlinedIcon
                        onClick={() =>
                          selectFiles(
                            { accept: 'image/*' },
                            ({ name, size, source, file }) => {
                              //   let setdata = {name, size, source, file}
                              //   setProfile(setdata);
                            }
                          )
                        }
                        />
                      </div>
                      
                      {/* <MBFormButton
                        className='upload-button'
                        type='button'
                        onClick={() =>
                          selectFiles(
                            { accept: 'image/*' },
                            ({ name, size, source, file }) => {
                              //   let setdata = {name, size, source, file}
                              //   setProfile(setdata);
                            }
                          )
                        }
                      >
                        Upload
                      </MBFormButton> */}
                    </div>
                  </Grid>
                </Grid>
            </Stack>
            {/* <MBTable data={cardsList} head={TABLE_HEAD} /> */}
            <Stack
              direction='row'
              alignItems='right'
              justifyContent='right'
              sx={{ my: 2 }}
            >
              <MBFormButton
                fullWidth={false}
                color='error'
                variant='contained'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  setFormstatus(false);
                }}
                type={'button'}
              >
                Cancel
              </MBFormButton>
              {rowdata ?
                  <MBFormButton onClick={() => {
                    setValid(true)
                  }} type={'submit'} variant="contained" fullWidth={false}>
                    Update
                  </MBFormButton> :
                  <MBFormButton onClick={() => {
                    setValid(true)
                  }} type={'submit'} variant="contained" fullWidth={false}>
                    Submit
                  </MBFormButton>
                }
            </Stack>
          </MBForm>: (
              <>
                <h5 className='w-h5' style={{textAlign:'center'}}>{testimonials.mainheading}</h5>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4} lg={4}>
                     <img  src={img} alt='icons' />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                  <div className="w-p-cont">{testimonials.para}</div>
                  <div className="w-p-cont">{testimonials.subheading}</div>
                  <div className="w-p-cont">{testimonials.smalltext}</div>
                   </Grid>
               </Grid>
              
                

              </>
            )
         }
        </ContentStyle>
      </Paper>

    </>
  )
}
export default Ourreal;

