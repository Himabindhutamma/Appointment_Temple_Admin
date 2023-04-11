import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Stack,Typography } from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';


const TABLE_HEAD = [
    {id: 'eventBookingId_eventBookings', label: 'Booking Id', alignRight: false},
    {id: 'userTypec_userType', label: 'User Type', alignRight: false},
    {id: 'name_eventParticipants', label: 'Name', alignRight: false},
    {id:'fees_eventParticipants', label:'Fee', alignRight:false},
    {id:'isAttened_eventParticipants', label:'Attendence', alignRight:false}
    

];
const actions = [{icon: "", actionName: "Present"},{icon: "", actionName: "Abscent"}];
const ParticipantList = ({onEdit,onClick,onAction,bookingid}) => {
  const [userdata,setUserData] = useState([]);
   const [valid, setValid] = useState();
  const [date, setDate]= useState(null)
  console.log("date",date)

  useEffect(() =>{
    eventList();
  },[])

  const eventList = () =>{
    let data ={
      "eventBookingId_eventParticipants":bookingid
    }
    Axios.postData('SelectConditionWithParent_eventParticipants',data)
        .then(res=>{
          console.log(res);
          if(Array.isArray(res.Message)){
                setUserData(res.Message.map(i => {
                    return {...i,isAttened_eventParticipants:i.isAttened_eventParticipants == 1 ? 'Present' : i.isAttened_eventParticipants == 0 ? 'Abscent' : '--'}
                }));
          }else{
              setUserData(res.Message)
          }
            
          }) 
        .catch(err =>{
          console.log(err);
        })
}
const updateParticipant = (e) =>{
    let data ={
        "isAttened_eventParticipants":e.action === 'Present',
        "eventParticipantId_eventParticipants":e.item.eventParticipantId_eventParticipants

    }
    Axios.putData('Update_eventParticipants',data)
        .then(res=>{
          eventList();
          }) 
        .catch(err =>{
          console.log(err);
        })
}
return (
    <>
      <MBTable data={userdata} head={TABLE_HEAD} actionList={actions} onAction={(e) =>{
            updateParticipant(e);
      }} />
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(ParticipantList)