import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";


const TABLE_HEAD = [
    {id: 'userInformationId_userInformation', label: 'Doctor Id', alignRight: false},
    {id: 'fullName_userInformation', label: 'Name', alignRight: false},
    {id:'age_userInformation', label:'Age', alignRight:false},
    {id:'gender_userInformation', label:'Gender', alignRight:false},
    {id:'city_userInformation', label:'City', alignRight:false},
    {id:'state_userInformation', label:'State', alignRight:false},
    {id:'country_userInformation', label:'Country', alignRight:false},
];
const actionList=[{icon:"", actionName:"Edit"}]
const DoctorsList = ({onEdit,onClick,onAction,adminData}) => {



  return (
    <>
    <Box className="login-block"style={{marginTop:'-60px'}}>
                <div className="table-view">
                  <span  className="white-text mx-3">Doctors</span>
                </div>
                <MBTable data={adminData} head={TABLE_HEAD} actionList={actionList} onAction={(e) => onAction(e)}/>    
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(DoctorsList)