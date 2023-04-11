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

const actions = [{ icon: "", actionName: Basic.EDIT_ACTION }]
const Content = ({ onSubmit, tid, getData, content }) => {
  console.log(content);
  const [open, setOpen] = useState(false)
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [file, selectFile] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [subpara, setSubpara] = useState('')
  const [mainheading1, setMainheading1] = useState('')
  const [parap, setParap] = useState('')
  const [mainpara, setMainpara] = useState('')
  const [subheading, setSubheading] = useState('')
  const [parap1, setParap1] = useState('')
  const [parap2, setParap2] = useState('')
  const [parap3, setParap3] = useState('')
  const [formstatus, setFormstatus] = useState(false)
  const [rowdata, setRowdata] = useState(null)
  console.log(rowdata);
  const onAction = (e) => {
    console.log(e);
    setRowdata(e.item);
    setFormstatus(true);
  }
  useEffect(() => {
    if (rowdata) {
      console.log(rowdata);
      setMainheading1(rowdata.mainheading1);
      setMainpara(rowdata.mainpara)
      setSubheading(rowdata.subheading);
      setParap(rowdata.parap);
      setParap1(rowdata.parap1);
      setParap2(rowdata.parap2);
      setParap3(rowdata.parap3);
      setSubpara(rowdata.subpara);
    }
  }, [rowdata])
  const openForm = () => {
    setMainheading1("");
    setMainpara("");
    setSubheading("");
    setParap("");
    setParap1("");
    setParap2("");
    setParap3("");
    setSubpara("");
    setFormstatus(true);
  }
  const cancelForm = () => {
    setValid(false);
    setMainheading1("");
    setMainpara("");
    setSubheading("");
    setParap("");
    setParap1("");
    setParap2("");
    setParap3("");
    setSubpara("");
  }
  const handleClick = (value) => {
    console.log(value);
    setFormstatus(true);
    setRowdata(value.content);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setValid(true);
    e.preventDefault();
    if (rowdata) {
      updateForm();
    } else {
      submitForm();
    }
  }
 
 

  const updateForm = () => {
    let data1 = {
      mainheading1: mainheading1,
          mainpara: mainpara,
          subheading: subheading,
          parap: parap,
          parap1: parap1,
          parap2: parap2,
          parap3: parap3,
          subpara: subpara
    }
    let data2 = {
      staticPageId_staticPages: tid,
      name_staticPages: 'mcont',
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
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
  const submitForm = () => {
    let data1 = {
      mainheading1: mainheading1,
          mainpara: mainpara,
          subheading: subheading,
          parap: parap,
          parap1: parap1,
          parap2: parap2,
          parap3: parap3,
          subpara: subpara
    }
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'mcont',
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
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
 


  

  return (
    <>

      <div>
      
        <Paper elevation={16}>
          <ContentStyle>
            <Box mt={2} className='bottom-login'>
              <Box sx={{ marginLeft: 'auto' }}>
               
              {!content ? (
                <MBFormButton variant='outlined' onClick={openForm}>
                  {' '}
                  Add Content
                </MBFormButton>
              ) : (
                <MBFormButton
                  variant='outlined'
                  onClick={() => handleClick({ content })}
                >
                  Update Content
                </MBFormButton>
              )}
              </Box>
            </Box>
            {formstatus ?
              <MBForm onSubmit={formSubmit}>
                <Stack spacing={3}>
                  <MBTextField
                    fullWidth
                    id={'mainheading1'} name={'mainheading1'} value={mainheading1} key={'mainheading1'} label={'mainheading1'} error
                    validate={valid}
                    onChange={e => {
                      setMainheading1(e.target.value)
                    }}
                  />
                  <MBTextArea
                    fullWidth
                    id={'mainpara'} name={'mainpara'} value={mainpara} key={'mainpara'} label={'Paragraph'} error
                    validate={valid}
                    onChange={e => {
                      setMainpara(e.target.value)
                    }}
                  />
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
                    name={parap} value={parap} id={parap} key={'parap'} validate={valid}
                    onChange={e => {
                      setParap(e.target.value)
                    }}
                    label={'Paragraph'}
                  />
                  <MBTextField
                    fullWidth
                    name={parap1} value={parap1} id={parap1} key={'parap1'} validate={valid}
                    onChange={e => {
                      setParap1(e.target.value)
                    }}
                    label={'Paragraph1'}
                  />
                  <MBTextField
                    fullWidth
                    name={parap2} value={parap2} id={parap2} key={'parap2'} validate={valid}
                    onChange={e => {
                      setParap2(e.target.value)
                    }}
                    label={'Paragraph2'}
                  />
                  <MBTextField
                    fullWidth
                    name={parap3} value={parap3} id={parap3} key={'parap3'} validate={valid}
                    onChange={e => {
                      setParap3(e.target.value)
                    }}
                    label={'Paragraph3'}
                  />
                  <MBTextArea
                    fullWidth
                    id={'subpara'} name={'subpara'} value={subpara} key={'subpara'} label={'Paragraph'} error
                    validate={valid}
                    onChange={e => {
                      setSubpara(e.target.value)
                    }}
                  />

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
                      setFormstatus(false)
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
                  <h5 className='w-h5'>{content.mainheading1}</h5>
                  <p className="w-p-cont">{content.mainpara}</p>
                  <p className="w-p-cont">{content.subheading}</p>
                  <p className="w-p-cont">{content.parap}</p>
                  <p className="w-p-cont">{content.parap1}</p>
                  <p className="w-p-cont">{content.parap2}</p>
                  <p className="w-p-cont">{content.parap3}</p>
                  <p className="w-p-cont">{content.subpara}</p>

                </>)
            }

         
          </ContentStyle>
        </Paper>
      </div>
    </>
  )
}

export default Content;

