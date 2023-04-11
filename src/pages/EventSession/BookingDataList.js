import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Stack,Typography } from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';


const TABLE_HEAD = [
    {id: 'eventBookingId_eventBookings', label: 'Booking Id', alignRight: false},
    {id: 'name_users', label: 'Name', alignRight: false},
    {id:'email_users', label:'Email', alignRight:false},
    {id:'ticketCount_eventBookings', label:'Tickets', alignRight:false},
    {id:'totalPaidFee_eventBookings', label:'Fee', alignRight:false}
    

];
const actions = [{icon: "", actionName: "Paricipant View"}];
const BookingDataList = ({onEdit,onClick,onAction,item}) => {
    console.log(item);
  const [userdata,setUserData] = useState([]);
   const [valid, setValid] = useState();
  const [date, setDate]= useState(null)
  console.log("date",date)

  useEffect(() =>{
    eventList();
  },[])

  const eventList = () =>{
    let data ={
      "eventSessionId_eventBookings":item
    }
    Axios.postData('SelectConditionWithParent_eventBookings',data)
        .then(res=>{
          console.log(res);
            setUserData(res.Message);
          }) 
        .catch(err =>{
          console.log(err);
        })
}
return (
    <>
      
      <MBTable data={userdata} head={TABLE_HEAD} actionList={actions} onAction={onAction} />
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(BookingDataList)