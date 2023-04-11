import React,{ useState, useEffect} from "react";
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {Button, Container,Stack,Box,Typography,FormControl,
  InputLabel,
  Select,
  MenuItem,} from '@mui/material';
import Page from '../../components/Page';
import { height } from "@mui/system";
import { Grid } from "@mui/material";
import Axios from '../../Services/API';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';


const Booking = ({userId}) => {
  let navigate = useNavigate();
  const [timeData, setTimeData] = useState([])
  const [valid, setValid] = useState(false);
  const [date, setDate]= useState(null);
  const [eventSession, setEventSession] = useState('')
  const [ticketCount, setTicketCount]= useState('')
  const [ticketFee, setTicketFee] = useState([])
  const [eventtypeId, setEventTypeId] = useState('')
  const [eventTypeData, seetEventTypeData] = useState([])
  const [active, setActive] = useState('');
  const [eventFeeValue,setEventfeeValue] = useState('')
  const [availableTickets, setAvaialableTickets]=useState('')
  console.log(date);
  console.log(eventSession,userId)

  useEffect(()=>{
    getEventType();
    eventFee();
  },[])

  const eventFee = () =>{
    let data ={
      "eventSessionId_eventFee": eventSession
    }
    Axios.postData('SelectConditionWithParent_eventFee',data).then(res=>{
      console.log(res.Message)
      setTicketFee(res.Message)
    }).catch(err =>{

    })
  }
  const getTimeData = () =>{
    if(date){
      let data ={
        "date_eventSessions":date
      }
      Axios.postData('SelectCondition_eventSessions',data).then(res =>{
          setTimeData(res.Message);
      }).catch(err =>{
  
      })
    }
    
  }
  const getEventType = () =>{
    Axios.getData('SelectAll_eventType').then(res=>{
      console.log(res);
      seetEventTypeData(res)
   
    })
  }
  const bookingEvent = (e) =>{
    e.preventDefault()
    
    let bookingdata ={
    "userId_eventBookings": userId,
    "eventTypeId_eventBookings":eventtypeId,
    "eventSessionId_eventBookings": eventSession,
    "ticketCount_eventBookings":ticketCount,
    "availableTickets":availableTickets
    // "ticketFee_eventBookings": eventFeeValue || 0,
    // "totalPaidFee_eventBookings":eventFeeValue || 0,
    // "status_eventBookings": "BOOKED",
    // "transactionId_eventBookings": 1
    }
    navigate('/dashboard/addparticipant',{state:{bookingdata}});
    
  }
  return (
         <Page title="Booking | SKT">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    Booking
                  </Typography>
                 
                </Stack>
    <Box className="">
          <form onSubmit={bookingEvent}>
       <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel>Select Event</InputLabel>
                      <Select
                        name='eventtype'
                        value={eventtypeId}
                        label='Select User Type'
                        onChange={(e) => setEventTypeId(e.target.value)}
                      >
                        {eventTypeData &&
                          eventTypeData.map((i, j) => {
                            return (
                              <MenuItem value={i.eventTypeId_eventType}>
                                {i.eventType_eventType}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    </FormControl>
             <MBDatePicker
                    className={'date-picker'}
                    id={'date'}
                    name={'date'}
                    value={date}
                    key={'date'}
                    label={'Date'}
                    required={false}
                    error
                    helperText={''}
                    validate={valid}
                    onChange={e => {
                      setDate(e.target.value)
                      getTimeData();
                    }}
                  />
      <div class="timingslots">
      {timeData && timeData.map((td,t)=>{
       return <div>{ active && active == td.eventSessionId_eventSessions ? `Available Tickets:${td.availableTickets_eventSessions}` : ''}
       </div>
      })}
      <Stack direction="row" spacing={2}>
            {timeData && timeData.map((td,t)=>{
                return (
                <div>
                <Button type="button" variant="outlined" 
                key={td.eventSessionId_eventSessions} 
                id={td.eventSessionId_eventSessions} 
                className={active == td.eventSessionId_eventSessions ? 'active' : ''} 
                name={td.eventSessionId_eventSessions} value={td.eventSessionId_eventSessions || ''} 
                onClick={(e) => {
                    setEventSession(e.target.value)
                    setAvaialableTickets(td.availableTickets_eventSessions)
                    setActive(e.target.id);
                }
                }>{td.time_eventSessions}</Button>
                </div>
                )
            })}
            </Stack>

        </div>
    
    <div>
    <FormControl fullWidth>
                      <InputLabel> No.of persons</InputLabel>
                      <Select
                        name='ticketCount'
                        value={ticketCount}
                        label='Select No.of persons'
                        onChange={(e) => setTicketCount(e.target.value)}
                      >
                         
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="13">13</MenuItem>
                        <MenuItem value="14">14</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="16">16</MenuItem>
                        <MenuItem value="17">17</MenuItem>
                        <MenuItem value="18">18</MenuItem>
                        <MenuItem value="19">19</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="21">21</MenuItem>
                        <MenuItem value="22">22</MenuItem>
                        <MenuItem value="23">23</MenuItem>
                        <MenuItem value="24">24</MenuItem>
                        <MenuItem value="25">25</MenuItem>
                      </Select>
                    </FormControl>
    
    </div>
    <Button type="submit"  variant="contained"style={{height:"47px", borderRadius:"7px",marginTop:"20px",float:'right'}}>Next</Button>
        </Grid>
        </Grid>
       </form>
        </Box>
      </Page>

  );
};
const mapStateToProps = (state) =>{
  return {
    userId:state.User.userId
  }
}
export default connect (mapStateToProps) (Booking);

