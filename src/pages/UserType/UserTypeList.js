import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'userTypeId_userTypes', label: 'UserType Id', alignRight: false},
    {id: 'userType_userTypes', label: 'User Type', alignRight: false},
];
const actions = [{icon: "", actionName: "Edit"}];
const UserTypeList = ({onAction}) => {
  const [userTypedata,setUserTypeData] = useState([]);

  useEffect(() =>{
    getUserTypeList();
  },[])

  const getUserTypeList = () =>{
    Axios.getData('SelectAll_userTypes') 
        .then(res=>{
            setUserTypeData(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}

  return (
    <>
    <Box className="login-block">
                <div className="table-view">
                  <span  className="white-text mx-3">USER TYPE</span>
                </div>
                <MBTable data={userTypedata} head={TABLE_HEAD} actionList={actions} onAction={(e) =>{
            onAction(e);
      }}  />    
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(UserTypeList)