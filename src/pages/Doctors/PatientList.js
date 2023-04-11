import React from 'react';
import PatientCard from '../../FunctionalComponents/PatientCard/PatientCard';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';
import { Box } from '@mui/material';


const TABLE_HEAD = [
    {id:'id',label: 'Id', alignRight: false},
    {id: 'name', label: 'Patient Name', alignRight: false},
    {id: 'location', label: 'Location', alignRight: false},
    {id:'bloodgroup', label:'Blood Group', alignRight:false},
    {id:'age', label:'Age', alignRight:false},
    {id:'phone', label:'Contact', alignRight:false}
];
const appointmentData = [
    {name:'Richard Wilson',id:'poo12',location:'Alabama, USA',phone:'+1 952 001 8563',age:'38 Years, Male',bloodgroup:'AB+'},
    {name:'Charlene Reed',id:'P0001',location:'North Carolina, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'A+'},
    {name:'Trimble',id:'poo12',location:'Maine, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'B+'},
    {name:'Richard',id:'poo12',location:'Alabama, USA',phone:'+1 952 001 8563',age:'38 Years, Male',bloodgroup:'AB+'},
    {name:'Reed',id:'P0001',location:'North Carolina, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'A+'},
    {name:'Travis',id:'poo12',location:'Maine, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'B+'},
    {name:'RichWilson',id:'poo12',location:'Alabama, USA',phone:'+1 952 001 8563',age:'38 Years, Male',bloodgroup:'AB+'},
    {name:'CharReed',id:'P0001',location:'North Carolina, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'A+'},
    {name:'Travismble',id:'poo12',location:'Maine, USA',phone:'+1 952 001 85623',age:'38 Years, Male',bloodgroup:'B+'}
]


const PatientList = ()=>{
    
    return(
        <>
        <Box className="">
                <div className="table-view">
                  <span  className="white-text mx-3">Patients</span>
                  </div>
                 <MBTable data={appointmentData} head={TABLE_HEAD}/>
        </Box>
        </>
    )
}
export default PatientList