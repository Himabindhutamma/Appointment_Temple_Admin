import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { Stack,Typography,Box } from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';


const TABLE_HEAD = [
    {id: 'userSlotId_userSlots', label: 'User Slot Id', alignRight: false},
    {id: 'date_userSlots', label: 'Date', alignRight: false},
    {id:'time_userSlots', label:'Time', alignRight:false},
    {id:'fee_userSlots', label:'fee', alignRight:false},
    {id:'availableAllocation_userSlots', label:'Available Slots', alignRight:false},
    {id:'maxAllocation_userSlots', label:'Max Slots', alignRight:false}
    
];
const actions = [{icon: "", actionName: "View"}];
const EventSessionList = ({onEdit,onClick,onAction}) => {
  const [userdata,setUserData] = useState([]);
   const [valid, setValid] = useState();
  const [date, setDate]=useState(null)
  console.log("date",date)

  useEffect(() =>{
    eventList();
  },[])

  const eventList = (eventdate) =>{
    // let data ={
    //   "date_eventSessions": eventdate
    // }
    Axios.getData('SelectAll_userSlots')
        .then(res=>{
          console.log(res);
            setUserData(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}
return (
    <>
      <Stack direction="row" alignItems="right" justifyContent="space-between" mb={5}>
      <Typography/>
      
                  
      </Stack>
      <Box className="login-block">
                <div className="table-view">
                  <space className="white-text mx-3">DOCTOR APPOINTMENT SCHEDULING</space>
                </div>
                <MBTable data={userdata} head={TABLE_HEAD} actionList={actions} onAction={(e) =>{
            onAction(e);
      }} />      
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(EventSessionList)