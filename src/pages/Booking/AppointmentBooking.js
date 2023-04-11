import React,{ useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack,Paper,Button,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import {connect} from 'react-redux';
import  Calendar  from 'react-calendar';
import Axios from '../../Services/API';
import Store from '../../Store';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));
const AppointmentBooking = ({userid}) =>{
    const profiledata = useLocation().state;
    const [valid,setValid] = useState(false)
    const [date,setDate]=useState(new Date().toISOString().substring(0,10))
    const [calDate, setCalDate]=useState(new Date())
    const [slotId, setSlotId] = useState('')
    const [active, setActive] = useState('');
    const [timeData, setTimeData]=useState([])
    
    const [bookingData, setBookingData]=useState({
        appointmentNumber:'',appointmentName:'',description:''
    })
    
    console.log(slotId,calDate.toISOString().substring(0,10),profiledata)
 
  useEffect(()=>{
   getSlotsbyDate();
  },[calDate])
  
  
    const getSlotsbyDate = () =>{
      let data={
        "date_userSlots":calDate.toISOString().substring(0,10)
      }
      console.log(data)
      Axios.postData('SelectConditionWithParent_userSlots',data).then((res) =>{
        console.log(res)
        setTimeData(res.Message)

      }).catch(err =>{

      })
    }
    const appointmentBooking =(e) =>{
        setValid(true)
        e.preventDefault();
        let data=
          {
          "userSloatId_appointments":slotId,
          "userId_appointments":userid,
          "appointmentNumber_appointments":bookingData.appointmentNumber,
          "appointmentName_appointments":profiledata.fullName,
          "descreption_appointments":bookingData.description,
          "isActive_appointments":1
        }
        
        Axios.postData('DirectInsert_appointments',data).then((res)=>{
          Store.dispatch({type:ReducerTypes.SHOW_ALERT.toString(),
          payload:{
            showAlert: true,
            alertMessage:`Appointment Booked Successfully!`,
            alertType:AlertTypes.SUCCESS_ALERT_TYPE
          }})
      
        }).catch(err=>{

        })
    }
    const bookinggDataChange = e =>{
       setBookingData({...bookingData,[e.target.name]:e.target.value})
    }
    
    return(
        <>
        <Paper elevation={16}>
        <ContentStyle>
       

        <MBForm onSubmit={appointmentBooking}>
           <Grid container>
           <MBTextField id="appointmentNumber" name="appointmentNumber" value={bookingData.appointmentNumber} onChange={bookinggDataChange} className={"mbtxt-width"} label="Appointment Number" required validate={valid}/>
          
          {/* <MBTextField id="appointmentName" name="appointmentName" value={bookingData.appointmentName} onChange={bookinggDataChange} className={"mbtxt-width"} label="Appointment Name" required validate={valid}/> */}
           <Grid item xs={5}>
           <div>Select a date</div>
             <Calendar onChange={(e)=>setCalDate(e)} value={calDate} 
             
            //  tileDisabled={({ activeStartDate, date, view })=> date < new Date()} 
             />
           </Grid>
           <Grid item xs={7}>
           <div>Slots</div>
             <Stack direction="row"spacing={2}>
             {timeData && timeData.map((td,t)=>{
                return (
                <div>
                <Button type="button" variant="outlined"
                    key={td.userSlotId_userSlots} 
                    id={td.userSlotId_userSlots} 
                    className={active == td.userSlotId_userSlots ? 'slot-btn active' : 'slot-btn'} 
                    name={td.userSlotId_userSlots} value={td.userSlotId_userSlots || ''} 
                    onClick={(e) => {
                        setSlotId(e.target.value)
                        setActive(e.target.id);
                    }
                }>{td.time_userSlots}</Button>
                </div>
                )
            })}
             </Stack>

           </Grid>
           </Grid>
           <MBTextField id="description" name="description" value={bookingData.description} onChange={bookinggDataChange} className={"mbtxt-width"} label="Disease" required validate={valid}/>
            <Stack direction="row" justifyContent="right" alignItems="right" sx={{mt:0.5}}>
             <MBFormButton color="error" fullWidth={false} variant="contained" type="button" 
              style = {{marginRight: '5px'}} onClick={() => {  
                //   onCancel();
                  setValid(false);
                }}
             >Cancel</MBFormButton>
             <MBFormButton fullWidth={false} variant="contained" type="submit">Get Appointment</MBFormButton>

           </Stack>
        </MBForm>
        
      
    </ContentStyle>
    </Paper>
        </>
    )
}
const mapStateToProps = (state) =>{
  return {
    userid:state.User.userId_users
  }
}
export default connect(mapStateToProps)(AppointmentBooking)
