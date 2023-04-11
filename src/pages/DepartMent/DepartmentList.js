import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { Box } from "@mui/material";
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'departmentId_departments', label: 'DepartMent Id', alignRight: false},
    {id: 'name_departments', label: 'Department Name', alignRight: false},
];
const actions = [{icon: "", actionName: "Edit"}];
const DepartmentList = ({onAction}) => { 
  const [departmentList,setDepartmentList] = useState([]);

  useEffect(() =>{
    DepartmentList();
  },[])

  const DepartmentList = () =>{
    Axios.getData('SelectAll_departments')
        .then(res=>{
          setDepartmentList(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}

  return (
    <>
        <Box className="login-block">
                <div className="table-view">
                  <space className="white-text mx-3">DEPARTMENTS</space>
                </div>
                <MBTable data={departmentList} actionList={actions} head={TABLE_HEAD} onAction={(e) =>{
            onAction(e);
      }} />            
      </Box>
     
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(DepartmentList)