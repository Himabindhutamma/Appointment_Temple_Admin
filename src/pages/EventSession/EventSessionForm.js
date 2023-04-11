import React, { useState, useEffect } from 'react'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import {Col, Form, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect'
import { Stack, TextField, Grid,InputLabel,Box,Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import { AlertTypes, ReducerTypes } from '../../Assets/Constants'
import Axios from '../../Services/API'
import Store from '../../Store'
import { connect } from 'react-redux'
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker'
import MBTimePicker from '../../FunctionalComponents/MBTimePicker/MBTimePicker'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const eventtype = { label: 'eventType_eventType', value: 'eventTypeId_eventType' }
const slotObj = {Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []}

const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 580,
  padding: '25px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
  // padding: theme.spacing(12, 0),
}))
const docobj={label:'name_users', value:'userId_users'}
const EventSessionForm = ({ onCancel, userid }) => {
  console.log('user id...', userid)
  const [valid, setValid] = useState(false)
  const [fromdate, setFromDate] = useState(null)
  const [todate, setToDate] = useState(null)
  const [time, setTime] = useState(null)
  const [allocationSlots, setAllocationSlots] = useState('')
  const [slot, setSlot]= useState([]);
  const [fee, setFee]= useState();
  const [dates, setDate]=useState([]);
  const [doctorsData, setDoctorsData]=useState([]);
  const [selectedDoc, setSelectedDoc]=useState('')

    const [slots, setSlots] = useState(slotObj);
    const [slotsSelected, setSlotsSelected] = useState(false);
    const [fromH, setFromH] = useState(null)
    const [fromM, setFromM] = useState(null)
    const [toH, setToH] = useState(null)
    const [toM, setToM] = useState(null)
    const [days, setDays] = useState([]);
    const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    const minutes = ["00", "30"];
    console.log(slots,slot,selectedDoc)
    console.log(JSON.stringify(slots))
    console.log(dates,fromdate,todate);

  useEffect(()=>{
    console.log("days....")
    Object.entries(slots).map(([dayKey, day])=>{
      return day.map((x,i)=>{
        console.log("object",x);
      })
    })
  },[slots])
useEffect(()=>{
  console.log("getdoctors....")
  getDoctors()
},[])

useEffect(()=>{
  getDatesInRange();
  console.log(fromdate,todate)
  },[fromdate,todate])
const getDatesInRange = () => {
  if(fromdate && todate){
  const date = new Date(new Date(fromdate).getTime());

  const dates = [];

  while (date <= new Date(todate)) {
    dates.push(new Date(date).toISOString().slice(0, 10));
    date.setDate(date.getDate() + 1);
  }
  console.log("dates..",dates)
  setDate(dates);
  }
  
}
function getDoctors() {
  let data={
     "userTypeId_users":4
  }
  Axios.postData('SelectConditionWithChildAndParent_users/',data).then((res)=>{
     console.log(res)
     let ids=res.Message.map(o => o.userId_users);
     let filterdData=res.Message.filter(({userId_users},index) => !ids.includes(userId_users,index+1))
     console.log(filterdData);
     setDoctorsData(filterdData)
  }).catch(err =>{

  })
}
  const submitForm = e => {
    e.preventDefault()
    setValid(true)
    Object.entries(slots).map(([dayKey, day])=>{
     return day.map((x,i)=>{
        dates.map((date,j)=>{
      // slot.map((slot,s)=>{
         let data = {
          "userId_userSlots":selectedDoc,
          "fee_userSlots":fee,
          "name_userSlots":"",
          "date_userSlots":date,
          // "time_userSlots":slot.time,
          "time_userSlots":x,
          "maxAllocation_userSlots":allocationSlots,
          "availableAllocation_userSlots":allocationSlots,
          "isActive_userSlots":1,
          "createdTime_userSlots":"",
          "updatedTime_userSlots":"",
          


    
    // "date_eventSessions":date,
    // "time_eventSessions":slot.time,
    // "dateTime_eventSessions":date + slot.time,
    // "totalTickets_eventSessions":totaltickets,
    // "availableTickets_eventSessions":totaltickets,
    // "status_eventSessions":"OPEN",
    }
    console.log(data)

    Axios.postData('DirectInsert_userSlots', data).then(res => {
      console.log(res)
      Store.dispatch({
        type:ReducerTypes.SHOW_ALERT.toString(),
        payload:{
          showAlert:true,
          message:`Schedule Timings added sucessfully!`,
          type:AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      onCancel()
      // let fees = Object.keys(fee).map((i,j)=>{
      //   return {
      //   "eventSessionId_eventFee":res.Message.insertId,
      //   "userTypeId_eventFee":i,
      //   "fee_eventFee":fee[i],
      //   }
      // })
      // return Axios.postData('DirectInsert_eventFee',fees)
     
    })
    // .then(response =>{
    //    Store.dispatch({
    //     type: ReducerTypes.SHOW_ALERT.toString(),
    //     payload: {
    //       showAlert: true,
    //       message: `User Type Added Successfully!`,
    //       type: AlertTypes.SUCCESS_ALERT_TYPE
    //     }
    //   })
    //   onCancel()
    // })
      })
     
    })
      // })
    })
    
    
  }
  
  const onTimeChange = (e) =>{
    //  const timeSplit = e.target.value.split(':');
    //  let hours = timeSplit[0];
    //  const minutes = timeSplit[1];
    //  let meridian;
    //  if (hours > 12) {
    //   meridian = 'PM';
    //   hours -= 12;
    // } else if (hours < 12) {
    //   meridian = 'AM';
    //   if (hours === 0) {
    //     hours = 12;
    //   }
    // } else {
    //   meridian = 'PM';
    // }
    // setTime(`${hours}:${minutes}${meridian}`);
    setTime(e.target.value);
  }
  const addSlots = (e)=>{
    e.preventDefault();
  
    let slotvalue = {
        "time": time,
       }
        
    let newList = [...slot]
    newList.push(slotvalue);
    setSlot(newList);
    setTime(null);
    console.log("newlist.....",newList);
    console.log("slotvalue....",slotvalue);
  }
 const onDaySelect = (e, name) => {
        console.log(e, name);
        let newdays = [...days];
        if (e) {
            newdays.push(name);
            setDays(newdays);
        } else {
            let ind = newdays.indexOf(name);
            newdays.splice(ind, 1);
            setDays(newdays);
        }
        setTimeout(() => {
            console.log(days)
        }, 500)

    }

    const addSlot = async (e) => {
        console.log("fromhours...",fromH && fromM && days.length > 0);
        if (fromH && fromM && days.length > 0) {
            let slot = fromH +":"+ fromM;
            // let a = {fromH: fromH, fromM: fromM, toH: toH, toM: toM};
            console.log(fromH == "00" && fromM == "00" && toH == "00" && toM == "00", fromH === "00")
            if (fromH == "00" && fromM == "00") {
              Store.dispatch({
                type:ReducerTypes.SHOW_ALERT.toString(),
                payload:{
                  showAlert:true,
                  message:`Schedule Timings added sucessfully!`,
                  type:AlertTypes.SUCCESS_ALERT_TYPE
                }
              })
            } else {
                let nslots = {...slots};
                console.log(slots);
                await Promise.all(
                    await days.map(async i => {
                        return nslots[i].push(slot);
                    })
                )
                setSlots(nslots);
                setSlotsSelected(true)
                setFromH("");
                setFromM("");
                setToH("");
                setToM("");
                setDays([]);
                document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
            }


        } else {
          Store.dispatch({
            type:ReducerTypes.SHOW_ALERT.toString(),
            payload:{
              showAlert:true,
              message:`please select Day`,
              type:AlertTypes.ERROR_ALERT_TYPE
            }
          })
        }
    }

    const deleteSlot = (e, day) => {
        let nslots = {...slots};
        nslots[day].splice(e, 1);
        setSlots(nslots);
    }
  return (
    <>
      <Paper elevation={16}>
        <ContentStyle>
          <MBForm onSubmit={submitForm}>
            <Stack spacing={3}>
            <Grid container spacing={1}>
               <Grid item xs={6}>
                  <MBDatePicker
                    className={'mbtxt-width'}
                    id={'date'}
                    name={'date'}
                    value={fromdate}
                    key={'date'}
                    label={'From Date'}
                    required={false}
                    error
                    helperText={''}
                    validate={valid}
                    onChange={e => {
                      setFromDate(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MBDatePicker
                    className={'mbtxt-width'}
                    id={'date'}
                    name={'date'}
                    value={todate}
                    key={'date'}
                    label={'To Date'}
                    required={false}
                    error
                    helperText={''}
                    validate={valid}
                    onChange={e => {
                      setToDate(e.target.value)
                      
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                className={'mbtxt-width'}
                id={'fee'}
                name={'fee'}
                value={fee}
                key={'fee'}
                label={'Fees'}
                required={false}
                error
                helperText={''}
                validate={valid}
                onChange={e => {
                  setFee(e.target.value)
                }}
              />
                </Grid>
                <Grid item xs={6}>
                <MBTextField fullWidth
                className={'mbtxt-width'}
                id={'allocationSlots'}
                name={'allocationSlots'}
                value={allocationSlots}
                key={'allocationSlots'}
                label={'Allocation Slots'}
                required={false}
                error
                helperText={''}
                validate={valid}
                onChange={e => {
                  setAllocationSlots(e.target.value)
                }}
              />
                </Grid>
                <Grid item xs={6}>
                <MBSelect obj={docobj} data={doctorsData}
                        fullWidth
                        className={''}
                        id={'selectedDoc'}
                        key={'selectedDoc'}
                        value={selectedDoc}
                        name={'selectedDoc'}
                        required={false}
                        label={'Select Doctor'}
                        onChange={(e)=>setSelectedDoc(e.target.value)}
                       />
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                 <InputLabel>Select Timings</InputLabel>
                  <Stack direction='row'>
                   <select required={slotsSelected ? false : true} name="fromH" id="fromH" value={fromH}
                                                              onChange={(e) => {
                                                                  setFromH(e.target.value)
                                                              }}>
                                                    <option value=''>HH</option>
                                                    {hours.map((i, j) => {
                                                        return (
                                                            <option
                                                                value={i}>{i}</option>
                                                        )
                                                    })}
                                                </select>
                  <select  name="fromM" id="fromM" required={slotsSelected ? false : true}
                                                              value={fromM}
                                                              onChange={(e) => {
                                                                  setFromM(e.target.value)

                                                              }}
                                                >
                                                    <option value=''>MM</option>
                                                    {minutes.map((i, j) => {
                                                        return (
                                                            <option
                                                                value={i}>{i}</option>
                                                        )
                                                    })}
                                                </select>
                                             <Button onClick={addSlot}>Add</Button>

                  </Stack> 
                 {/* <MBFormButton style={{marginTop:'49px'}}
                  type='button'
                  fullWidth={false}
                  variant='contained'
                  onClick={addSlots}
                >
                  Add Time
                </MBFormButton> */}
                 </Grid>   
                 <Grid item xs={6}>
                 <InputLabel>Slots</InputLabel>
                 <Stack direction='row' spacing={2}>
                  <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Sunday")
                                            }} required={slotsSelected ? false : true}/><span>Su</span>
                    </label>
                    </div>
                     <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Monday")
                                            }} required={slotsSelected ? false : true}/><span>M</span>
                    </label>
                   </div>
                    <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Tuesday")
                                            }} required={slotsSelected ? false : true}/><span>T</span>
                    </label>
                   </div>
                   <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Wednesday")
                                            }} required={slotsSelected ? false : true}/><span>W</span>
                    </label>
                   </div>
                   <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Thursday")
                                            }} required={slotsSelected ? false : true}/><span>T</span>
                    </label>
                   </div>
                   <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Friday")
                                            }} required={slotsSelected ? false : true}/><span>F</span>
                    </label>
                   </div>
                   <div className='cat action'>
                    <label>
                       <input type="checkbox" id="day" onChange={(e) => {
                                                onDaySelect(e.target.checked, "Saturday")
                                            }} required={slotsSelected ? false : true}/><span>S</span>
                    </label>
                   </div>
                 </Stack>
                  
                  
                 {/* <MBTimePicker
                className={'mbtxt-width'}
                id={'time'}
                name={'time'}
                value={time}
                key={'time'}
                label={'Time'}
                required={false}
                error
                helperText={''}
                validate={valid}
                onChange={onTimeChange}
              />
              <Box sx={{display:'flex'}}>
                  {slot && slot.map((i,j)=>{
                      return(
                          <div className='event-s-ts'>{i.time}</div>
                      )
                  })}
              </Box> */}
                 </Grid>
                     
              </Grid>
                <Form.Group as={Row} className="mb-3">
                                    

                                    {/* <Col sm={2}>
                                        <div className={"row m-0 p-0"}>
                                            <div column sm={6} className={"pr-1"}>
                                                <Form.Control as="select" name="toH" id="toH"
                                                              value={toH} required={slotsSelected ? false : true}
                                                              onChange={(e) => {
                                                                  setToH(e.target.value)
                                                              }}
                                                >
                                                    <option value=''>HH</option>
                                                    {hours.map((i, j) => {
                                                        return (
                                                            <option
                                                                value={i}>{i}</option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </div>
                                            <div column sm={6} className={"pl-1"}>
                                                <Form.Control as="select" name="department" id="department"
                                                              value={toM} required={slotsSelected ? false : true}
                                                              onChange={(e) => {
                                                                  setToM(e.target.value)
                                                              }}
                                                >
                                                    <option value=''>MM</option>
                                                    {minutes.map((i, j) => {
                                                        return (
                                                            <option
                                                                value={i}>{i}</option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </div>
                                        </div>
                                    </Col> */}

                                </Form.Group>
                              <Stack direction='row' spacing={2}>
                                {Object.keys(slots).map((k, l) => {
                                    if (slots[k].length > 0) {
                                        return (
                                         
                                            <div className='timeslot'>
                                              <p>{k}</p>
                                              
                                                {slots[k].map((i, j) => {
                                                    return (
                                                        
                                                                <div className="branchCard">
                                                                  <div>
                                                                   {i} <DeleteOutlineOutlinedIcon onClick={()=>deleteSlot(j, k)}/>
                                                                  </div>
                                                                 </div>
                                                         
                                                    )
                                                })}
                                              </div>
                                          )
                                    }
                                })}
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
                    onCancel()
                    setValid(false)
                  }}
                  type={'button'}
                >
                  Cancel
                </MBFormButton>
                <MBFormButton
                  type='submit'
                  fullWidth={false}
                  variant='contained'
                >
                  Submit
                </MBFormButton>
              </Stack>

            </Stack>
          </MBForm>
        </ContentStyle>
      </Paper>
    </>
  )
}
const mapStateToProps = state => ({
  userid: state.User.userId_users
})
export default connect(mapStateToProps)(EventSessionForm)
