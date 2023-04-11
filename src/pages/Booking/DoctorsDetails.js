import React from 'react';
import {Box,Stack} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import patient from '../../FunctionalComponents/Table/patient.jpg';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import MBTab from '../../FunctionalComponents/MBTab/MBTab';
import OverView from './DoctorsDetails/Overview';
const doctorsSearch = [{
    docImg:patient, docName:'Dr. Ruby Perrin', speciality:'MDS - Periodontology and Oral Implantology, BDS',departments:'Dentist',
    location:'Florida, USA',services1:'Dental Filling',services2:'Whitneing',likes:'98%', feedback:'17 feedback',cost:'$300 - $300'
}]
const tabs=[{
    id:1,
    label:'OverView',
    component:<OverView/>
},
{
    id:2,
    label:'Locations',
    component:<>Locations</>
},{
    id:3,
    label:'Reviews',
    component:<>Reviews</>
},{
    id:4,
    label:'Business Hours',
    component:<>BusinessHours</>
}]
const DoctorsDetails = () =>{
    return(
        <>
         {
            doctorsSearch && doctorsSearch.length > 0 && doctorsSearch.map((i,j)=>
        <Card sx={{ minWidth: 275 }} className='doc-card doc-details-card'>
      <CardContent>
       <Stack direction='row' justifyContent='space-between' alignItems='' spacing={2}>
       <Box className='doctors-search-left'>
         <div>
           <img className='doctors-img' src={i.docImg} alt='doctors-img'/>
         </div>
         <div>
          <h4>{i.docName}</h4>
          <p className='doc-speciality'>{i.speciality}</p>
          <h5>{i.departments}</h5>
          <div className='about-hospital'>
           <PinDropIcon/>
          <p>{i.location}</p>
          </div>
          <div className='hospital-services'>
             <span>{i.services1}</span>
             <span> {i.services2}</span>
          </div>
         </div>
       </Box>
       <Box>
       <div className='hospital-info'>
         <ul>
         <li>
         <span><ThumbUpOffAltOutlinedIcon/></span> {i.likes}</li>
         <li><span><ChatBubbleOutlineOutlinedIcon/></span>{i.feedback}</li>
         <li><span><LocalAtmOutlinedIcon/></span>{i.cost}</li>
         </ul>
       </div>
       <CardActions className='doctors-action'>
        <MBFormButton type="button" variant='contained' className='doctors-action-btn'>Book Appointment</MBFormButton>
      </CardActions>
       </Box>
       </Stack>
       <MBTab className='doctors-tab' tabs={tabs}/>
      </CardContent>
      
        
    </Card>
            )
        }
        </>
    )
}
export default DoctorsDetails