import React,{useState} from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';
import MBListToolbar from '../../FunctionalComponents/MBTable/MBListToolbar';


const TABLE_HEAD = [
    {id: 'name', label: 'Patient Name', alignRight: false},
    {id: 'date', label: 'Appointment Date', alignRight: false},
    {id:'address', label:'Address', alignRight:false},
    {id:'mail', label:'E-mail', alignRight:false},
    {id:'mobileno', label:'Contact', alignRight:false}
];
const appointmentData = [
    {name:'Richard Wilson', date:'14 Nov 2019, 10.00 AM',address:' Newyork, United States', mail:'richard@example.com', mobileno:'+1 923 782 4575'},
    {name:'Charlene Reed', date:'12 Nov 2019, 5.00 PM',address:'North Carolina, United States', mail:'charlenereed@example.com', mobileno:'+1 828 632 9170'},
    {name:'Travis Trimble', date:'12 Nov 2019, 5.00 PM',address:'North Carolina, United States', mail:'charlenereed@example.com', mobileno:'+1 828 632 9170'},
    {name:'Carl Kelly', date:'12 Nov 2019, 5.00 PM',address:'North Carolina, United States', mail:'charlenereed@example.com', mobileno:'+1 828 632 9170'},
    {name:'Michelle Fairfax', date:'12 Nov 2019, 5.00 PM',address:'North Carolina, United States', mail:'charlenereed@example.com', mobileno:'+1 828 632 9170'},
]

const Patient = ({}) =>{
   
    return(
        <>
        <Box className="login-block">
            
           
                <div className="table-view">
                  <Link to="" className="white-text mx-3">Patients</Link>
                </div>
                <MBTable data={appointmentData} head={TABLE_HEAD}/>    
      </Box>
        </>
    )
}
export default Patient