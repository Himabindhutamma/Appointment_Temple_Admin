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

import { connect } from 'react-redux'
import Paper from '@mui/material/Paper'
import MBNumberField from '../../FunctionalComponents/MBNumberField/MBNumberField'

import Axios from '../../Services/API'
import { makeStyles } from "@material-ui/core/styles";
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
const Whychoouseus = ({chooseData, cid, getData }) => {
  console.log(chooseData);
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
  const [rowdata, setRowdata] = useState(null)
  const [formstatus, setFormstatus] = useState(false)
  const [heading1, setHeading1] = useState('')
  const [heading2, setHeading2] = useState('')
  const [heading3, setHeading3] = useState('')
  const [para1, setPara1] = useState('')
  const [para2, setPara2] = useState('')
  const [para3, setPara3] = useState('')
  const [number, setNumber] = useState('')
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [number3, setNumber3] = useState('')
  const [img, setImg] = useState()

  console.log(rowdata);
  console.log(files)
  useEffect(() => {
    fetchImage()
  }, [chooseData])
  useEffect(() => {
    if (rowdata) {
      console.log(rowdata);
      setMainheading(rowdata.mainheading);
      setSubheading(rowdata.subheading);
      setNumber(rowdata.number);
      setHeading(rowdata.heading);
      setPara(rowdata.para);
      setNumber1(rowdata.number1);
      setHeading1(rowdata.heading1);
      setPara1(rowdata.para1);
      setNumber2(rowdata.number2);
      setHeading2(rowdata.heading2);
      setPara2(rowdata.para2);
      setNumber3(rowdata.number3);
      setHeading3(rowdata.heading3);
      setPara3(rowdata.para3);
      setProfile(rowdata.profile)
    }
  }, [rowdata])
  const openForm = () => {
    setMainheading("");
    setSubheading("");
    setNumber("");
    setHeading("");
    setPara("");
    setNumber1("");
    setHeading1("");
    setPara1("");
    setNumber2("");
    setHeading2("");
    setPara2("");
    setNumber3("");
    setHeading3("");
    setPara3("");
    setProfile('')
    setFormstatus(true);
  }
  const cancelForm = () => {
    setValid(false);
    setMainheading("");
    setSubheading("");
    setNumber("");
    setHeading("");
    setPara("");
    setNumber1("");
    setHeading1("");
    setPara1("");
    setNumber2("");
    setHeading2("");
    setPara2("");
    setNumber3("");
    setHeading3("");
    setPara3("");
    setProfile('')
  }
  const handleClick = (value) => {
    console.log(value);
    setFormstatus(true);
    setRowdata(value.chooseData);
  };
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
      updateForm(rowdata.profile)
    }else{
      submitForm()
    }

  }

  const updateForm = (profilePath) => {
    let data1 = {
      mainheading: mainheading,
          subheading: subheading,
          number: number,
          heading: heading,
          para: para,
          number1: number1,
          heading1: heading1,
          para1: para1,
          number2: number2,
          heading2: heading2,
          para2: para2,
          number3: number3,
          heading3: heading3,
          para3: para3,
        profilePath: profilePath
    }
    let data2 = {
      staticPageId_staticPages: cid,
      name_staticPages: 'WhyChooseUs',
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
          subheading: subheading,
          number: number,
          heading: heading,
          para: para,
          number1: number1,
          heading1: heading1,
          para1: para1,
          number2: number2,
          heading2: heading2,
          para2: para2,
          number3: number3,
          heading3: heading3,
          para3: para3,
        profilePath: profilePath
    }
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'WhyChooseUs',
      data_staticPages: JSON.stringify(data1),
      isActive_staticPages: 1
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
      `${process.env.REACT_APP_API_URL}GetFile/${chooseData.profilePath}`
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
              {!chooseData ? (
                <MBFormButton variant='outlined' onClick={openForm}>
                  {' '}
                  Add Content
                </MBFormButton>
              ) : (
                <MBFormButton
                  variant='outlined'
                  onClick={() => handleClick({ chooseData })}
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
                  id={'subheading'} name={'subheading'} value={subheading} key={'whosubheadingweare'} label={'Sub Heading'} error
                  validate={valid}
                  onChange={e => {
                    setSubheading(e.target.value)
                  }}
                />
                <MBTextField
                  fullWidth
                  id={'mainheading'} name={'mainheading'} value={mainheading} key={'mainheading'} label={'Mainheading'} error
                  validate={valid}
                  onChange={e => {
                    setMainheading(e.target.value)
                  }}
                />
                <Grid spacing={1} container>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>First:</legend>
                      <MBNumberField
                        className='marignb' id={'number'} name={'number'} value={number} key={'number'} label={'Number'} validate={valid}
                        onChange={e => {
                          setNumber(e.target.value)
                        }}
                      />
                      <MBTextField
                        className='marignb' id={'heading'} name={'heading'} value={heading} key={'heading'} label={'Heading'} validate={valid}
                        onChange={e => {
                          setHeading(e.target.value)
                        }}
                      />
                      <MBTextArea
                        name={para} value={para} id={para} key={'para'} validate={valid}
                        className='marignb'
                        onChange={e => {
                          setPara(e.target.value)
                        }}
                        label={'Paragraph'}
                      />
                    </fieldset>
                  </Grid>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>Second:</legend>
                      <MBNumberField
                        className='marignb' id={'number1'} name={'number1'} value={number1} key={'number1'} label={'Number1'} validate={valid}
                        onChange={e => {
                          setNumber1(e.target.value)
                        }}
                      />
                      <MBTextField
                        className='marignb' id={'heading1'} name={'heading1'} value={heading1} key={'heading1'} label={'Heading1'} validate={valid}
                        onChange={e => {
                          setHeading1(e.target.value)
                        }}
                      />
                      <MBTextArea
                        name={para1}
                        value={para1} id={para1} key={'para1'} validate={valid} className='marignb'
                        onChange={e => {
                          setPara1(e.target.value)
                        }}
                        label={'Paragraph1'}
                      />
                    </fieldset>
                  </Grid>
                </Grid>
                <Grid spacing={1} container>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>Third:</legend>
                      <MBNumberField
                        className='marignb' id={'number2'} name={'number2'} value={number2} key={'number2'} label={'Number2'} validate={valid}
                        onChange={e => {
                          setNumber2(e.target.value)
                        }}
                      />
                      <MBTextField
                        className='marignb' id={'heading2'} name={'heading2'} value={heading2} key={'heading2'} label={'Heading2'} validate={valid}
                        onChange={e => {
                          setHeading2(e.target.value)
                        }}
                      />
                      <MBTextArea
                        name={para2} value={para2} id={para2} key={'para2'} validate={valid} className='marignb'
                        onChange={e => {
                          setPara2(e.target.value)
                        }}
                        label={'Paragraph2'}
                      />
                    </fieldset>
                  </Grid>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>Fourth:</legend>
                      <MBNumberField
                        className='marignb' id={'number3'} name={'number3'} value={number3} key={'number3'} label={'Number3'} validate={valid}
                        onChange={e => {
                          setNumber3(e.target.value)
                        }}
                      />
                      <MBTextField
                        className='marignb' id={'heading3'} name={'heading3'} value={heading3} key={'heading3'} label={'Heading3'}
                        validate={valid}
                        onChange={e => {
                          setHeading3(e.target.value)
                        }}
                      />
                      <MBTextArea
                        name={para3}
                        value={para3} id={para3} key={'para3'} validate={valid} className='marignb'
                        onChange={e => {
                          setPara3(e.target.value)
                        }}
                        label={'Paragraph3'}
                      />
                    </fieldset>
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ margin: '7px -24px' }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography
                      variant='body1'
                      sx={{ color: 'text.secondary' }}
                      noWrap
                    >
                      Upload Howweare Picture
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
                      
                    </div>
                  </Grid>
                </Grid>
              </Stack>
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
            </MBForm> : (
              <>
                <h5 className='w-h5'>{chooseData.subheading}</h5>
                <h5 className='w-h5' style={{textAlign:"center"}}>{chooseData.mainheading}</h5>

                <Grid spacing={2} container>
                <Grid item xs={6}>
                <Grid spacing={2} container>
                  <Grid item xs={6}>
                      <div className='w-d-s'>
                      <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.number}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.heading}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {chooseData.para}
                        </Typography>
                      </div>
                    
                  </Grid>
                  <Grid item xs={6}>
                    <div className='w-d-s'>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.number1}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.heading1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {chooseData.para1}
                        </Typography>
                    </div>
                  </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className='w-d-s'>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.number2}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.heading2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {chooseData.para2}
                        </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className='w-d-s'>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.number3}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {chooseData.heading3}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {chooseData.para3}
                        </Typography>
                    </div>
                  </Grid>
                  </Grid>
                  </Grid>
                  <Grid item xs={6}>  <img className='h-img' src={img} alt='icons' /></Grid>
                </Grid>
              
               
              </>
            )

          }
        </ContentStyle>
      </Paper>
    </>
  )
}
export default Whychoouseus;