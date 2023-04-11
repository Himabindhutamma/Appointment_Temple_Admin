import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'userId_users', label: 'User Id', alignRight: false},
    {id: 'name_users', label: 'User Name', alignRight: false},
    {id:'email_users', label:'Email', alignRight:false},
    {id:'mobileNumber_users', label:'Phone Number', alignRight:false}
];
const actions=[{icon:"",actionName:"Edit"}]
const AdminList = ({onEdit,onClick,onAction}) => {
  const [adminData,setAdminData] = useState([]);

  useEffect(() =>{
    getAdminList();
  },[])

  const getAdminList = () =>{
    Axios.getData('SelectAll_users')
        .then(res=>{
            setAdminData(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}

  return (
    <>
    <Box className="login-block">
                <div className="table-view">
                  <span className="white-text mx-3">USERS LIST</span>
                </div>
                <MBTable data={adminData} head={TABLE_HEAD} actionList={actions} onAction={(e)=>onAction(e)}/>    
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(AdminList)