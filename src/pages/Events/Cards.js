import React, { useState, useEffect } from 'react'
import { useFileUpload } from 'use-file-upload'
import { styled } from '@mui/material/styles'
import { Typography, Box, Grid, Stack,Paper } from '@mui/material'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import MBTable from '../../FunctionalComponents/MBTable/MBTable'
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
  { id: 'para', label: 'Content', alignRight: false },
  { id: 'backgroundPath', label: 'Image', alignRight: false },
  { id: 'frontPath', label: 'Image', alignRight: false }
]

const Cards = ({ nid, getData, news }) => {
  const [open, setOpen] = useState(false)
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [file, selectFile] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [heading, setHeading] = useState('')
  const [para, setPara] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [logo, setLogo] = useState('')
  const [imgs, setImgs] = useState([])
  const [files, selectFiles] = useFileUpload()

  console.log(news)
  const openForm = () => {
    setHeading('')
    setPara('')
    setOpen(true)
    // setFormstatus(true);
  }
  const onCancel = () => {
    setValid(false)
    setFormstatus(false)
  }
  const handleClick = value => {
    console.log(value)
    setCardsList(value.news.cardsList)
    setFormstatus(true)
  }

  const handleClose = () => {
    setValid(false)
    setProfile('')
    // setPara('');
    setOpen(false)
  }
  const formSubmit = e => {
    e.preventDefault()
    setValid(true)
    console.log(formstatus)
    console.log('form Submitted...')
    if (news) {
      updateForm()
    } else {
      saveCards()
    }
    // setFormstatus(false);
  }
const updateForm = () => {
    console.log(cardsList)
    let data1 = {
      cardsList: cardsList
    }
    let data2 = {
      staticPageId_staticPages: nid,
      name_staticPages: 'eventcardone',
      content_staticPages: JSON.stringify(data1),
      createdDate_staticPages: ' ',
      updatedDate_staticPages: ' '
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
      getData()
      setFormstatus(false)
    })
  }
  const saveCards = () => {
    console.log(cardsList)
    let data1 = {
      cardsList: cardsList
    }
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'eventcardone',
      content_staticPages: JSON.stringify(data1),
      createdDate_staticPages: ' ',
      updatedDate_staticPages: ' '
    }

    Axios.postData('InsertWithParent_staticPages', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Banner Added Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      getData()
    })
  }

  const addMultipleCards = e => {
    console.log('added multiple cards....')
    e.preventDefault()
    setValid(false)
    var formdata = new FormData()
    formdata.append('images', files.file, 'bannerlogo.jpg')
    formdata.append('images', file.file, 'bannerlogo.jpg')

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
          para: para,
          backgroundPath:result.Message[0].filename,
          frontPath:result.Message[1].filename
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
  }

  return (
    <>
      <div>
        <Paper elevation={16}>
          <ContentStyle>
            <Box mt={2} className='bottom-login'>
              <Box sx={{ marginLeft: 'auto' }}>
                {!news ? (
                  <MBFormButton variant='outlined' onClick={openForm}>
                    {' '}
                    Add Cards
                  </MBFormButton>
                ) : (
                  <MBFormButton
                    variant='outlined'
                    onClick={() => handleClick({ news })}
                  >
                    Update Cards
                  </MBFormButton>
                )}
              </Box>
            </Box>
            <MBForm onSubmit={formSubmit}>
              {formstatus ? (
                <>
                  <Grid spacing={1} container>
                    {cardsList.map((data1, index) => (
                      <Grid item xs={6}>
                        <fieldset className='fieldset'>
                          <legend>{data1.heading}</legend>
                          <MBTextField
                            className='marignb'
                            id={'heading'}
                            name={'heading'}
                            value={data1.heading}
                            key={'index'}
                            label={'Heading'}
                            validate={valid}
                            onChange={e => {
                              data1.heading = e.target.value
                              setCardsList([...cardsList])
                            }}
                          />
                          <MBTextField
                            className='marignb'
                            id={'para'}
                            name={'para'}
                            value={data1.para}
                            key={'index'}
                            label={'Paragraph'}
                            validate={valid}
                            onChange={e => {
                              data1.para = e.target.value
                              setCardsList([...cardsList])
                            }}
                          />
                          <input type='file' accept='image/*'
                            onChange={e => {
                              console.log(e.target.files[0])
                              var formdata = new FormData()
                              formdata.append(
                                'images',
                                e.target.files[0],
                                'medical.jpg'
                              )
                              var requestOptions = {
                                method: 'POST',
                                body: formdata,
                                redirect: 'follow'
                              }
                              fetch(
                                `${process.env.REACT_APP_API_URL}Upload_files/`,
                                requestOptions
                              )
                                .then(response => response.json())
                                .then(result => {
                                  data1.backgroundPath = result.Message[0].filename
                                  setCardsList([...cardsList])
                                })
                                .catch(error => {
                                  console.log('error', error)
                                })
                            }}
                          />
                           <input type='file' accept='image/*'
                            onChange={e => {
                              console.log(e.target.files[0])
                              var formdata = new FormData()
                              formdata.append(
                                'images',
                                e.target.files[0],
                                'medical.jpg'
                              )
                              var requestOptions = {
                                method: 'POST',
                                body: formdata,
                                redirect: 'follow'
                              }
                              fetch(
                                `${process.env.REACT_APP_API_URL}Upload_files/`,
                                requestOptions
                              )
                                .then(response => response.json())
                                .then(result => {
                                  data1.frontPath = result.Message[0].filename
                                  setCardsList([...cardsList])
                                })
                                .catch(error => {
                                  console.log('error', error)
                                })
                            }}
                          />
                          {data1 ? data1.backgroundPath : ' no file selected'} {data1 ? data1.frontPath : ' no file selected'}
                        </fieldset>
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <>
                  {
                    <MBTable
                      data={news ? news.cardsList : cardsList}
                      head={TABLE_HEAD}
                    />
                  }
                </>
              )}
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
                  onClick={onCancel}
                  type={'button'}
                >
                  Cancel
                </MBFormButton>
                {news ? (
                  <MBFormButton
                    onClick={() => {
                      setValid(true)
                    }}
                    type={'submit'}
                    variant='contained'
                    fullWidth={false}
                  >
                    Update
                  </MBFormButton>
                ) : (
                  <MBFormButton
                    onClick={() => {
                      setValid(true)
                    }}
                    type={'submit'}
                    variant='contained'
                    fullWidth={false}
                  >
                    Submit
                  </MBFormButton>
                )}
              </Stack>
            </MBForm>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle>Add Events</DialogTitle>
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
                    name={para}
                    value={para}
                    id={para}
                    key={'para'}
                    required={true}
                    validate={valid}
                    className='marignb'
                    onChange={e => { 
                      setPara(e.target.value)
                    }}
                    label={'Paragraph'}
                  />
                  <Grid container spacing={3} style={{ margin: '7px -24px' }}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography
                        variant='body1'
                        sx={{ color: 'text.secondary' }}
                        noWrap
                      >
                        Upload Doctor Picture
                      </Typography>
                      <div className=''>
                        <img src={files?.source} alt='preview' />
                        <MBFormButton
                          className='upload-button'
                          type='button'
                          onClick={() =>
                            selectFiles(
                              { accept: 'image/*' },
                              ({ name, size, source, file }) => {
                                // let setdata = { name, size, source, file }
                                // setProfile(setdata)
                              }
                            )
                          }
                        >
                          Upload
                        </MBFormButton>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <Typography
                        variant='body1'
                        sx={{ color: 'text.secondary' }}
                        noWrap
                      >
                        Upload Disease Logo
                      </Typography>
                      <div className=''>
                        <img src={file?.source} alt='preview' />
                        <MBFormButton
                          className='upload-button'
                          type='button'
                          onClick={() =>
                            selectFile(
                              { accept: 'image/*' },
                              ({ name, size, source, file }) => {
                                // let setdata = { name, size, source, file }
                                // setLogo(setdata)
                                // console.log(setdata)
                              }
                            )
                          }
                        >
                          Upload
                        </MBFormButton>
                      </div>
                    </Grid>
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
export default connect(mapStateToProps)(Cards)