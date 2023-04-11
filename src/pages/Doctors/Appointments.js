import React,{ useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';
import Dialogs from '../../FunctionalComponents/Dailogs/Dailogs';
import AvailableTimings from './AvailableTimings';
import Axios from '../../Services/API';
import {connect} from "react-redux"



const TABLE_HEAD = [
    {id: 'appointmentId_appointments', label: 'Appointment Id', alignRight: false},
    {id: 'createdTime_appointments', label: 'Appointment Date', alignRight: false},
    {id:'appointmentName_appointments', label:'Appointment Name', alignRight:false},
    {id:'descreption_appointments', label:'Description', alignRight:false},
    // {id:'followup', label:'Follow Up', alignRight:false},
    // {id:'status', label:'Status', alignRight:false}
];

const spanstyles={
    allstyle:{
    float: 'right',
    color: 'white',
    fontWeight: 700,
    fontSize: '19px'
    },
    avail:{
    float: "left",
    color: "white",
    fontWeight: 700,
    cursor: "pointer"
    }
    
}
const actions = [{icon: "", actionName: "View"},{icon: "", actionName: "Print"}];
const Appointments = ({userId}) =>{
    const [open,setOpen]=useState(false);
   
     const [data,setData]=useState([]);
      const  handleClose = () => { setOpen(false) };
    const handleOpen = () => { setOpen(true)};
    const onAction= (e)=>{
        console.log(e);
    }
    useEffect(()=>{
        getAppList()
    },[]) 
    const getAppList =()=>{
        let data={
            "userId_appointments": userId
        }
      Axios.getData('SelectAll_appointments').then((res =>{
          console.log(res)
        setData(res)
      })).catch(err=>{

      })
    }
    return(
        <>
        <Box className="">
                <div className="table-view">
                   <span style={spanstyles.avail} onClick={handleOpen}>AvailableTimings <i class="fa-solid fa-arrow-right"/></span>
                  <span  className="white-text mx-3">Appointments</span>
                  <span style={spanstyles.allstyle}>View All <i class="fa-solid fa-arrow-right"/></span>
                  </div>
                   
                <MBTable data={data} head={TABLE_HEAD} onAction={onAction}/>   
                   <Dialogs open={open} handleClose={handleClose}>
                       <h4>Schedule Timings</h4>
                      <AvailableTimings/>
                   </Dialogs>
      </Box>
        </>
    )
}
const mapStateToProps = (state)=>{
    return{
        userId:state.User.userId_users
    }
}
export default connect(mapStateToProps)(Appointments);
