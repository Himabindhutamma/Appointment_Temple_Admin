import React, { useState, useEffect } from 'react'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import { TextField, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { useFileUpload } from 'use-file-upload'
import MBTextArea from '../../FunctionalComponents/MBTextArea/MBTextArea'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import { AlertTypes, ReducerTypes } from "../../Assets/Constants";
import Store from "../../Store";
import MBTable from '../../FunctionalComponents/MBTable/MBTable'
import { Basic } from '../../Assets/Constants'
import { Box } from '@mui/material'
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
 
  const actions = [{icon: "", actionName: Basic.EDIT_ACTION}]
const Howweare=({whowearedata, wid, getData })=>{
  console.log(whowearedata);
    const [valid, setValid] = useState(false)
    const [files, selectFiles] = useFileUpload()
    const [profile, setProfile] = useState('');
    const [whoweare, setWhoweare] = useState('')
    const [heading, setHeading] = useState('')
    const [signaturepic, setSignaturepic] = useState('')
    const [para, setPara] = useState('')
    const [formstatus, setFormstatus]= useState(false)
    const [rowdata, setRowdata]= useState(null)
    const [img, setImg] = useState()
    console.log(rowdata);
    console.log(files)
    useEffect(() => {
      fetchImage()
    }, [whowearedata])
    useEffect(()=>{
     if(rowdata){
      console.log(rowdata);
      setWhoweare(rowdata.whoweare);
      setHeading(rowdata.heading);
      setPara(rowdata.para);
      setProfile(rowdata.profile)
     }
    },[rowdata])
    const openForm = () =>{
      setWhoweare("");
      setHeading("");
      setPara("");
      setProfile('')
      setFormstatus(true);
  }  
    
     const cancelForm = () =>{
      setValid(false);
      setHeading("");
      setPara("");
      setWhoweare("");
      setProfile("")
      }
      const handleClick = (value) => {
        console.log(value);
        setFormstatus(true);
        setRowdata(value.whowearedata);
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
          whoweare: whoweare,     
          heading: heading,
          para: para,
          profilePath: profilePath
      }
      let data2 = {
        staticPageId_staticPages: wid,
        name_staticPages: 'WhoWeAre-1',
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
        whoweare: whoweare,     
          heading: heading,
          para: para,
          profilePath: profilePath
      }
      let data = {
        staticPageId_staticPages: null,
        name_staticPages: 'WhoWeAre-1',
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
        `${process.env.REACT_APP_API_URL}GetFile/${whowearedata.profilePath}`
      )
      const imageBlob = await res.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)
      setImg(imageObjectURL)
    }
    return(
        <>
          <Paper elevation={16}>
        <ContentStyle>
        <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
               {!whowearedata ? (
                <MBFormButton variant='outlined' onClick={openForm}>
                  {' '}
                  Add Content
                </MBFormButton>
              ) : (
                <MBFormButton
                  variant='outlined'
                  onClick={() => handleClick({ whowearedata })}
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
                            id={'whoweare'}
                            name={'whoweare'}
                            value={whoweare}
                            key={'whoweare'}
                            label={'Who we are'}
                            error
                            validate={valid}
                            onChange={e => {
                                setWhoweare(e.target.value)
                            }}
                        />
        <MBTextField
                            fullWidth
                            id={'heading'}
                            name={'heading'}
                            value={heading}
                            key={'heading'}
                            label={'Heading'}
                            error
                            validate={valid}
                            onChange={e => {
                                setHeading(e.target.value)
                            }}
                        />
         <MBTextArea id={"para"} name={"para"} value={para} key={"para"} label={"Paragraph"} validate={valid}
                        onChange={(e) => {
                            setPara(e.target.value);
                        }}
                    />      
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
            <Stack
            direction='row'
            alignItems='right'
            justifyContent='right'
            sx={{ my: 2 }}
          >
            <MBFormButton
              variant='contained'
              fullWidth={false}
              color='error'
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
      </Stack>
      </MBForm>:(
        <>
              <h5 className='w-h5'>{whowearedata.whoweare}</h5>
             {/* <Grid container> */}
               {/* <Grid item xs={12} md={6} lg={6}> */}
                 
               {/* </Grid> */}
              {/* <Grid item xs={12} md={6} lg={6}> */}
                  <h5 className='w-h5'style={{textAlign:'center'}}>{whowearedata.heading}</h5>
                  <p className="w-p-cont">
                  <img style={{float:"left"}} className='h-img' src={img} alt='icons' />
                  {whowearedata.para}</p>
                {/* </Grid>   */}
             {/* </Grid> */}
              </>     
        
      )
      
        }
          
          </ContentStyle>
          </Paper>
        </>
    );
}
export default Howweare;
