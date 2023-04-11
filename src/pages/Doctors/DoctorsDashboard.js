import React,{ useState } from 'react';
import { Grid,Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Appointments from './Appointments';
import ReusableTable from '../../FunctionalComponents/Table/ReusableTable';

 
const header=[{ name: "First name",prop: ["firstName","answers"]},{ name: "Last name",prop:["lastName","answers"]}]
const dasboardStatus=[{name:'Total Patient All time',number:'1500'},{name:'Total Appointements',number:'4587'},{name:'Total Income',number:'4587'}]
const DoctorsDashboard = () =>{
  const [editIdx, setEditIdx] = useState(-1);

 const startEditing = i => {
    console.log(i);
    setEditIdx(i);
  };

    return(
        <>
         <Grid container spacing={2}>
         {dasboardStatus.map((i,j)=>
         <Grid item xs={12} sm={4} md={4}>
            <Card className='doc-dash-card'>
                <CardContent className='doc-dash-graph'>
                    <i className="fa-solid fa-hospital-user fa-2x do-fa"/>
                    <div className='doc-dash-text'>
                    <h3>{i.name}</h3>
                    <p>{i.number}</p>
                    </div>
                   </CardContent>
                
            </Card>
            </Grid>
         
         )}
          <Grid item xs={12} sm={12} md={12}>
                <Appointments/>
               
             </Grid>
           </Grid>
        </>
    )
}
export default DoctorsDashboard