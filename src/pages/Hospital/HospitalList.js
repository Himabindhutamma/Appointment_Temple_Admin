import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'organizationUniqueId_organization', label: 'Clinic Id', alignRight: false},
    {id: 'organizationName_organization', label: 'Clinic Name', alignRight: false},
    {id:'address_organization', label:'Address', alignRight:false},
    {id:'state_organization', label:'State', alignRight:false},
    {id:'city_organization',label:'City',alignRight:false},
    {id:'country_organization',label:'Country',alignRight:false},
];
const actions=[{icon:'',actionName:'Edit'}]
const HospitalList = ({onEdit,onClick,onAction}) => {
  const [adminData,setAdminData] = useState([]);

  useEffect(() =>{
    getAdminList();
  },[])

  const getAdminList = () =>{
    Axios.getData('SelectAll_organization')
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
                  <span className="white-text mx-3">CLINIC LIST</span>
                </div>
                <MBTable data={adminData} head={TABLE_HEAD} actionList={actions} onAction={(e) =>{
                  onAction(e);
                }}/>    
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(HospitalList)