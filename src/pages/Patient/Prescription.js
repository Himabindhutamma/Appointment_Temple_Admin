 import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';


const TABLE_HEAD = [
    {id: 'date', label: 'Date', alignRight: false},
    {id: 'name', label: 'Patient Prescription', alignRight: false},
    {id:'email', label:'Email', alignRight:false},
    {id:'doctorname', label:'Doctor Name', alignRight:false},
];
const prescriptionData = [
    {doctorname:'Richard Wilson',date:'11 Nov 2019',name:'Prescription 1',email:'charlenereed@example.com'},
    {doctorname:'Charlene Reed',date:'12 Nov 2019', name:'Prescription 2',email:'charlenereed@example.com'},
    {doctorname:'Travis Trimble',date:'21 Nov 2019',name:'Prescription 3',email:'charlenereed@example.com' },
    {doctorname:'Carl Kelly',date:'01 Nov 2019', name:'Prescription 4',email:'charlenereed@example.com'},
    {doctorname:'Michelle Fairfax',date:'11 Nov 2019',name:'Prescription 5',email:'charlenereed@example.com'},
]
const actions = [{icon: "", actionName: "View"},{icon: "", actionName: "Print"}];
const Prescription = () =>{
    const onAction=(e)=>{
        console(e);
    }
    return(
        <>
        <Box className="login-block">
                <div className="table-view">
                  <span className="white-text mx-0">PRESCRIPTION</span>
                </div>
                <MBTable data={prescriptionData} head={TABLE_HEAD} actionList={actions} onAction={onAction}/>    
      </Box>
      
        </>
    )
}
export default Prescription;
