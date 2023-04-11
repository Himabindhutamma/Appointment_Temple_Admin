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
import axios from 'axios';
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
const actions = [{ icon: "", actionName: Basic.EDIT_ACTION }]
const Howweare = ({ whowearedata, wid, getData }) => {
    console.log(whowearedata);
    const [valid, setValid] = useState(false)
    const [files, selectFiles] = useFileUpload()
    const [profile, setProfile] = useState('');
    const [whoweare, setWhoweare] = useState('')
    const [mainheading, setMainheading] = useState('')
    const [para, setPara] = useState('')
    const [subheading, setSubheading] = useState('')
    const [para1, setPara1] = useState('')
    const [para2, setPara2] = useState('')
    const [para3, setPara3] = useState('')
    const [para4, setPara4] = useState('')
    const [para5, setPara5] = useState('')
    const [para6, setPara6] = useState('')
    const [formstatus, setFormstatus] = useState(false)
    const [rowdata, setRowdata] = useState(null)
    const [img, setImg] = useState()
    console.log(rowdata);
    console.log(files) 
    useEffect(() => {
      fetchImage()
    }, [whowearedata])
    useEffect(() => {
        if (rowdata) {
            console.log(rowdata);
            setWhoweare(rowdata.whoweare);
            setMainheading(rowdata.mainheading);
            setPara(rowdata.para);
            setSubheading(rowdata.subheading);
            setPara1(rowdata.para1);
            setPara2(rowdata.para2);
            setPara3(rowdata.para3);
            setPara4(rowdata.para4);
            setPara5(rowdata.para5);
            setPara6(rowdata.para6);
            setProfile(rowdata.profile)
        }
    }, [rowdata])
    const openForm = () => {
        setWhoweare("");
        setMainheading("");
        setPara("");
        setSubheading("");
        setPara1("");
        setPara2("");
        setPara3("");
        setPara4("");
        setPara5("");
        setPara6("");
        setProfile("")
        setFormstatus(true);
    }

    const cancelForm = () => {
        setValid(false);
        setWhoweare("");
        setMainheading("");
        setPara("");
        setSubheading("");
        setPara1("");
        setPara2("");
        setPara3("");
        setPara4("");
        setPara5("");
        setPara6("");
        setProfile("");
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
          updateForm()
        }else{
          submitForm()
        }
    
      }
    
      const updateForm = (profilePath) => {
        let data1 = {
            whoweare: whoweare,
            mainheading: mainheading,
            para: para,
            subheading: subheading,
            para1: para1,
            para2: para2,
            para3: para3,
            para4: para4,
            para5: para5,
            para6: para6,
            profilePath: profilePath
        }
        let data2 = {
          staticPageId_staticPages: wid,
          name_staticPages: 'AWhoWeAreData3',
          data_staticPages: JSON.stringify(data1),
          isActive_staticPages:1
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
            mainheading: mainheading,
            para: para,
            subheading: subheading,
            para1: para1,
            para2: para2,
            para3: para3,
            para4: para4,
            para5: para5,
            para6: para6,
            profilePath: profilePath
        }
        let data = {
          staticPageId_staticPages: null,
          name_staticPages: 'AWhoWeAreData3',
          data_staticPages: JSON.stringify(data1),
          isActive_staticPages:1
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
    return (
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
                                    id={'whoweare'} name={'whoweare'} value={whoweare} key={'whoweare'} label={'Who we are'} error
                                    validate={valid}
                                    onChange={e => {
                                        setWhoweare(e.target.value)
                                    }}
                                />
                                <MBTextField
                                    fullWidth
                                    id={'mainheading'} name={'mainheading'} value={mainheading} key={'mainheading'} label={'Main Heading'} error
                                    validate={valid}
                                    onChange={e => {
                                        setMainheading(e.target.value)
                                    }}
                                />
                                <MBTextArea id={"para"} name={"para"} value={para} key={"para"} label={"Paragraph"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"subheading"} name={"subheading"} value={subheading} key={"subheading"} label={"Sub heading"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setSubheading(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para1"} name={"para1"} value={para1} key={"para"} label={"Paragraph1"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara1(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para2"} name={"para2"} value={para2} key={"para2"} label={"Paragraph2"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara2(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para3"} name={"para3"} value={para3} key={"para3"} label={"Paragraph3"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara3(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para4"} name={"para4"} value={para4} key={"para4"} label={"Paragraph4"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara4(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para5"} name={"para5"} value={para5} key={"para5"} label={"Paragraph5"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara5(e.target.value);
                                    }}
                                />
                                <MBTextArea id={"para6"} name={"para6"} value={para6} key={"para6"} label={"Paragraph6"}
                                    validate={valid}
                                    onChange={(e) => {
                                        setPara6(e.target.value);
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
                      <div class="overlay">
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
                        </MBForm> : (
                            <> 
                                <h5 className='w-h5'>{whowearedata.whoweare}</h5>
                                <Grid container>
                                <Grid item xs={12} md={6} lg={6}>
                                <img className="h-img" src={img} alt='icons' />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <h5 className='w-h5'>{whowearedata.heading}</h5>
                                    <p className="w-p-cont">{whowearedata.para}</p>
                                                  <p className="w-p-cont"> {whowearedata.subheading}</p>
                                                  <p className="w-p-cont">{whowearedata.para1}</p>
                                                 
                                                  
                                                  
                                  </Grid>
                                  <p className="w-p-cont">{whowearedata.para2}</p>
                                  <p className="w-p-cont">{whowearedata.para3}</p>
                                  <p className="w-p-cont">{whowearedata.para4}</p>
                                  <p className="w-p-cont">{whowearedata.para5}</p>
                                  <p className="w-p-cont">{whowearedata.para6}</p>  
                              </Grid>
                              </>

                        )

                    }

                </ContentStyle>
            </Paper>
        </>
    );
}
export default Howweare;
