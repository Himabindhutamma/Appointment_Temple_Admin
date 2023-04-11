import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Paper,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,Typography
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import Axios from '../../Services/API'

const AddParticipants = ({ userId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobilenumber, setMobileNumber] = useState('')
  const [address, setAddress] = useState('')
  const [idprooftype, setIdproofType] = useState('')
  const [idproofNo, setIdproofNo] = useState('')
  const [formObj, setFormObj] = useState({})
  const [usetTypeData, setUserTypeData] = useState([])

  const state = useLocation().state
  const navigate = useNavigate()
  console.log(state, userId)

  useEffect(() => {
    getUserTypeList()
  }, [])

  const getUserTypeList = () => {
    let data = {
      eventSessionId_eventFee: state.bookingdata.eventSessionId_eventBookings
    }
    Axios.postData('SelectConditionWithChildAndParent_eventFee', data)
      .then(res => {
        console.log(res)
        setUserTypeData(res.Message)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const addParticipant = async e => {
    e.preventDefault()
    let totalfee = 0
    await Promise.all(
      Object.keys(formObj).map(i => {
        totalfee = totalfee + parseInt(formObj[i].fee || 0)
      })
    )
    let bookingdata = {
      userId_eventBookings:state.bookingdata.userId_eventBookings,
      eventTypeId_eventBookings: state.bookingdata.eventTypeId_eventBookings,
      eventSessionId_eventBookings:
        state.bookingdata.eventSessionId_eventBookings,
      ticketCount_eventBookings: state.bookingdata.ticketCount_eventBookings,
      ticketFee_eventBookings: totalfee,
      totalPaidFee_eventBookings: totalfee,
      status_eventBookings: 'BOOKED',
      transactionId_eventBookings: 1
    }
    Axios.postData('DirectInsert_eventBookings', bookingdata)
      .then(res => {
        let participants = Object.keys(formObj).map((i, j) => {
          return {
            userTypeId_eventParticipants: formObj[i].usertype,
            eventBookingId_eventParticipants: res.Message.insertId,
            name_eventParticipants: formObj[i].name,
            fees_eventParticipants: formObj[i].fee,
            email_eventParticipants: formObj[i].email,
            mobileNumber_eventParticipants: formObj[i].mobilenumber,
            address_eventParticipants: formObj[i].address,
            identity_eventParticipants: formObj[i].idprooftype,
            identityNumber_eventParticipants: formObj[i].idproofNo
          }
        })
        return Axios.postData('DirectInsert_eventParticipants', participants)
      })
      .then(res => {
        console.log(res)
        let updatedata ={
            "eventSessionId_eventSessions":state.bookingdata.eventSessionId_eventBookings,
            "availableTickets_eventSessions":parseInt(state.bookingdata.availableTickets) - parseInt(state.bookingdata.ticketCount_eventBookings)
        }
        return Axios.putData('Update_eventSessions',updatedata)
      }).then(res =>{
        alert('participant added sucessfully..')
        navigate('/home')
    })
   .catch(err => {
        console.log(err)
      })
  }
  const fieldChange = (e, j) => {
    let fee = 0
    if (e.target.name === 'usertype') {
      let feeData = usetTypeData.find(
        i => i.userTypeId_userType === e.target.value
      )
      fee = feeData ? feeData.fee_eventFee : 0
    }
    let object = {}

    object = formObj[j] || { [e.target.name]: e.target.value }

    object = {
      ...object,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'usertype' ? { fee } : {})
    }
    let newObj = { ...formObj }
    newObj = { ...newObj, [j]: object }
    setFormObj(newObj)
    console.log(newObj)
  }
  return (
      <Paper elevation={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    Add Participants
                  </Typography>
                 
                </Stack>
        <form onSubmit={addParticipant} className='participant-form'>
          {[
            ...Array(parseInt(state.bookingdata.ticketCount_eventBookings))
          ].map((i, j) => {
            return (
              <Card sx={{ margin: '10px', padding: '10px' }}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{ marginBottom: '20px' }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Select User Type</InputLabel>
                      <Select
                        name='usertype'
                        label='Select User Type'
                        onChange={e => fieldChange(e, j)}
                      >
                        {usetTypeData &&
                          usetTypeData.map((i, j) => {
                            return (
                              <MenuItem value={i.userTypeId_userType}>
                                {i.userTypec_userType} - ({i.fee_eventFee})
                              </MenuItem>
                            )
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='text'
                      name='name'
                      label='Name'
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='text'
                      name='email'
                      label='Email'
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='number'
                      name='mobilenumber'
                      label='Mobile Number'
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='text'
                      name='address'
                      label='Address'
                      rows={4}
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='text'
                      name='idproof'
                      label='Id Proof Type'
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      type='text'
                      name='idproofno'
                      label='Id Proof No'
                      variant='outlined'
                      required
                      onChange={e => fieldChange(e, j)}
                    />
                  </Grid>
                </Grid>
           <Button type='submit' variant='contained' sx={{float:'right'}}>
            Book
          </Button>
              </Card>
              
            )
          })}

         
        </form>
      </Paper>
  )
}
const mapStateToProps = state => {
  return {
    userId: state.User.userId
  }
}
export default connect(mapStateToProps)(AddParticipants)
