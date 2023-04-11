import React,{useState,useEffect} from 'react';
import { Box } from '@mui/material';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';
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

const actions = [{icon: "", actionName: "View"},{icon: "", actionName: "Print"}];
const Appointment = ({userId}) =>{
    const [data,setData]=useState([]);
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
        <Box className="login-block m-0">
                <div className="table-view">
                  <span  className="white-text mx-0">APPOINTMENTS</span>
                </div>
                <MBTable data={data} head={TABLE_HEAD} actionList={actions} onAction={onAction}/>    
      </Box>
      
        </>
    )
}
const mapStateToProps = (state)=>{
    return{
        userId:state.User.userId_users
    }
}
export default connect(mapStateToProps)(Appointment);