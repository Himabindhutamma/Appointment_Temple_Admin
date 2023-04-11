import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Stack,Paper,Grid,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel,FormGroup,Checkbox, CardContent, Typography,Card,InputLabel, CardHeader, CardActionArea,CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import Axios from '../../Services/API';


const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));
  const docobj={label:'name_users', value:'userId_users'}
const PatientDetails = () =>{
    const navigate=useNavigate();
    const [valid, setValid]=useState(false);
    const [selectedDoc, setSelectedDoc]=useState('')
    const [doctorsData, setDoctorsData]=useState([]);
    const [filterData,setFilterData]=useState([]);
    const [patientDetails, setPatientDetails]=useState({
        fullName:'',email:'',mobileNo:'',dob:''
    })
    const patientOnchange = (e) =>{
        setPatientDetails({...patientDetails,[e.target.name]:e.target.value})
    }
   useEffect(()=>{
      getDoctors();
    },[])
  const selectedDoctor =(e)=>{
    console.log(e.target.value)
    let filterdArray = doctorsData.filter((f) => f.userId_users === e.target.value
     )
      console.log("filterrray@@@@@@",filterdArray)
    setFilterData(filterdArray)
  }
 function getDoctors() {
    let data={
       "userTypeId_users":4
    }
    Axios.postData('SelectConditionWithChildAndParent_users/',data).then((res)=>{
       console.log(res)
       let ids=res.Message.map(o=>o.userId_users);
       let filtereddata=res.Message.filter(({userId_users},index) => !ids.includes(userId_users,index+1))
       setDoctorsData(filtereddata);

       
    }).catch(err =>{

    })
  }
    const submitForm = e =>{
        e.preventDefault();
        setValid(true)
        navigate('/dashboard/appointmentbooking',{state:patientDetails,selectedDoc})
    }
    
    return(
        <>
        <Paper elevation={16}>
        <ContentStyle>

        <MBForm onSubmit={submitForm}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={2} sx={{m:3}}>
                    <MBTextField className='' fullWidth key='fullName' name='fullName' id='fullName' value={patientDetails.fullName} onChange={patientOnchange} label={'Full Name'} validate={valid} required/>
                 </Stack>
                  <Stack direction='row' spacing={2} sx={{m:3}}>
                    <MBTextField className='' fullWidth key='email' name='email' id='email' value={patientDetails.email} onChange={patientOnchange} label={'Email'} validate={valid}/>
                    <MBTextField className='' fullWidth key='mobileNo' name='mobileNo' id='mobileNo' value={patientDetails.mobileNo} onChange={patientOnchange} label={'Mobile No'} validate={valid}/>
                  </Stack>
                  <Stack direction='row' sx={{m:3}}>
                            <MBDatePicker className='' fullWidth key='dob' id='dob' name='dob' value={patientDetails.dob} validate={valid} label='Date Of Birth' onChange={patientOnchange}/>
                    </Stack>
                    <Stack direction='row' sx={{m:3}}>
                       <MBSelect obj={docobj} data={doctorsData}
                        fullWidth
                        className={''}
                        id={'selectedDoc'}
                        key={'selectedDoc'}
                        value={selectedDoc}
                        name={'selectedDoc'}
                        required={false}
                        label={'Select Doctor'}
                        onChange={selectedDoctor}
                       />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel sx={{m:1.5}}>Sceduled To:</InputLabel>
                  {filterData.length>0 ? filterData.map((i,j)=>
                    <>
                    <Stack  direction='row' spacing={2} sx={{m:3}}>
                   <MBTextField className='' fullWidth disabled={true} value={i.name_users || ''}/>
                    <MBTextField className='' fullWidth disabled={true} value={"Dentist" || ''}/>
                </Stack>
                <Stack sx={{m:3}}>
                   <MBTextField className='' fullWidth disabled={true} value={i.email_users}/>
                </Stack>
                <InputLabel sx={{m:1.9}}>Cost</InputLabel>

                <Stack  direction='row' spacing={2} sx={{m:3}}>
                    
                    <div>{i.fee_userSlots}</div>

                    {/* <MBTextField className='' fullWidth disabled={true} value={i.fee_userSlots}/> */}
                </Stack>
                    </>
                    
                  ) : <>
              <Stack  direction='row' spacing={2} sx={{m:3}}>
                   <MBTextField className='' fullWidth disabled={true} value={''}/>
                    <MBTextField className='' fullWidth disabled={true} value={''}/>
                </Stack>
                <Stack sx={{m:3}}>
                   <MBTextField className='' fullWidth disabled={true} value={''}/>
                </Stack>
                <InputLabel sx={{m:1.9}}>Cost</InputLabel>

                <Stack  direction='row' spacing={2} sx={{m:3}}>
                    <MBTextField className='' fullWidth disabled={true} value={''}/>
                </Stack>

                  </>}
                
            </Grid>
           </Grid>
           <Stack direction="row" justifyContent="right" alignItems="right">
             
             <MBFormButton fullWidth={false} variant="contained" type="submit">Make an Appointment</MBFormButton>
           </Stack>
         
         </MBForm>
        </ContentStyle>
        </Paper>
         
        </>
    )

}
export default PatientDetails