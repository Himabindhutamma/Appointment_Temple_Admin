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
  { id: 'number', label: 'Number', alignRight: false },
  { id: 'heading', label: 'Heading', alignRight: false },
  { id: 'para', label: 'Content', alignRight: false }
  
]

const Onlineappointment = ({ onSubmit }) => {
  const [open, setOpen] = useState(false)
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [file, selectFile] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [heading, setHeading] = useState('')
  const [mainheading, setMainheading] = useState('')
  const [para, setPara] = useState('')
  const [number, setNumber] = useState('')
  const [subheading, setSubheading] = useState('')


  console.log(cardsList)
  const handleClickOpen = () => {
    setOpen(true)
    setHeading('');
    setPara('');
    setNumber("");

  }

  const handleClose = () => {
    setValid(false)
    setProfile('');
    setPara('');
    setOpen(false);
}

  const saveCards = e => {
    e.preventDefault()

    console.log(cardsList)
    let data1 = {
      "heading":heading,
      "subheading":subheading,
      "cardsList":cardsList
    } 
    let data = {"staticPageId_staticPages":null, "name_staticPages":"Cards", "content_staticPages": JSON.stringify(data1),
        "createdDate_staticPages":" ", "updatedDate_staticPages":" " };

    axios.post(`${process.env.REACT_APP_URL}user/addstaticData`, data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Cards added successfully`,
          type: AlertTypes.SUCCESS_ALERT_TYPE,
          timeOut: 1000
        }
      })
      setCardsList([]);
      setMainheading('')
      setSubheading('')

    })
  }

 
  const addMultipleCards = e => {
    console.log('added multiple cards....')
    e.preventDefault()
    setValid(false)
    let cf = {
      heading: heading,
      para: para,
      number: number
    }
    let newList = [...cardsList]
    newList.push(cf)
    setCardsList(newList)
    console.log(newList)
    console.log(cf)

    setOpen(false)
    setHeading('')
    setPara('')
    setNumber('')
  }

  return (
    <>
         
      <div>
      <Paper elevation={16}>
      <ContentStyle> 
        <MBForm onSubmit={saveCards}>
       
          <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
              <MBFormButton variant='outlined' onClick={handleClickOpen}>
                Add Card
              </MBFormButton>
            </Box>
          </Box>
          <Stack spacing={3}>
            <MBTextField
                                fullWidth
                                id={'mainheading'}
                                name={'mainheading'}
                                value={mainheading}
                                key={'mainheading'}
                                label={'Mainheading'}
                                required={true}
                                error
                                validate={valid}
                                onChange={e => {
                                  setMainheading(e.target.value)
                                }}
                            />
            <MBTextField
                                fullWidth
                                id={'subheading'}
                                name={'subheading'}
                                value={subheading}
                                key={'whosubheadingweare'}
                                label={'Sub Heading'}
                                required={true}
                                error
                                validate={valid}
                                onChange={e => {
                                    setSubheading(e.target.value)
                                }}
                            />
           </Stack>
          <MBTable data={cardsList} head={TABLE_HEAD} />
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
                setValid(false)
              }}
              type={'cancel'}
            >
              Cancel
            </MBFormButton>
            <MBFormButton type={'submit'} variant='contained' fullWidth={false}>
              Submit
            </MBFormButton>
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
                  id={'number'}
                  name={'number'}
                  value={number}
                  key={'number'}
                  label={'Number'}
                  required={true}
                  validate={valid}
                  onChange={e => {
                    setNumber(e.target.value)
                  }}
                />
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
                <MBTextArea
                  name={para}
                  value={para} id={para} key={'para'} required={true} validate={valid}
                  className='marignb'
                  onChange={e => {
                    setPara(e.target.value)
                  }}
                  label={'Paragraph'}
                />
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
export default connect(mapStateToProps)(Onlineappointment)

