import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'userRoleId_userRole', label: 'Role Id', alignRight: false},
    {id: 'userRole_userRole', label: 'Role Name', alignRight: false},
];

const RoleList = ({onEdit,onClick}) => {
  const [roleData,setRoleData] = useState([]);

  useEffect(() =>{
    getRoleList();
  },[])

  const getRoleList = () =>{
    Axios.getData('SelectAll_userRole')
        .then(res=>{
          console.log(res)
          setRoleData(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}

  return (
    <>
    <Box className="login-block">
                <div className="table-view">
                  <span  className="white-text mx-3">ROLE</span>
                </div>
                <MBTable editRow={true} deleteRow={true} data={roleData} head={TABLE_HEAD}/>            
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(RoleList)