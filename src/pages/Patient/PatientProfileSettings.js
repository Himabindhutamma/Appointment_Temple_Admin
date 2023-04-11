import React,{  useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Stack,Grid,Box } from '@mui/material';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBEmailField from '../../FunctionalComponents/MBEmailField/MBEmailField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import MBNumberField from '../../FunctionalComponents/MBNumberField/MBNumberField';
import MBMobileNumberField from '../../FunctionalComponents/MBMobileNumber/MBMobileNumber';
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';
import { connect } from 'react-redux';
import  Axios  from '../../Services/API';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));
const genderObj = { label: 'label', value: 'value' }
const genderData = [{label:'Male', value:'Male'},
{label:'FeMale', value:'FeMale'},
{label:'Others', value:'Others'}]
const countryObj = { label: 'label', value: 'value' }
const countryData = [{label:'INDIA', value:'INDIA'},
{label:'USA', value:'USA'},
{label:'AUSTRALIA', value:'AUSTRALIA'}]
const PatientProfileSettings = ({onCancel,userId}) =>{
  const navigate=useNavigate()
 
  const location=useLocation().state
  console.log(location)

  console.log(userId);
    const [valid, setValid] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        userName:'',email:'',fullName:'',phoneNumber:'',dob:'',gender:'',clinicName:'',addressLineone:'',
        addressLineTwo:'',city:'',state:'',country:'',postalCode:''
    })
    const [educationInfo, setEducationInfo]=useState({
      degree:'',college:'',yrOfComp:''
    })
    const [experience, setExperience] = useState({
      hospitalName:'',fromDate:'', toDate:'',designation:''
    })
    useEffect(()=>{
     
      if(location){
        console.log(location)
        setBasicInfo({fullName:location.fullName_userInformation,email:location.email_users,phoneNumber:location.mobileNumber_users,gender:location.gender_userInformation,city:location.city_userInformation,state:location.state_userInformation,country:location.country_userInformation})
      }
    },[location])
  
  const basicInfoOnchange = e =>{
      setBasicInfo({...basicInfo, [e.target.name]:e.target.value})
  }
  const educationInfoOnchange = (e) =>{
    setEducationInfo({...educationInfo, [e.target.name]:e.targer.value})
  }
  const experienceOnchange = (e) =>{
    setExperience({...experience, [e.target.name]:e.targer.value})
  }
  const saveProfile = (e) =>{
      e.preventDefault();

  let data={
    "departmentId_userInformation":1,
    "userId_userInformation":userId,
    "fullName_userInformation":basicInfo.fullName,
    "age_userInformation": basicInfo.age,
    "gender_userInformation": basicInfo.gender,
    "city_userInformation":basicInfo.city,
    "state_userInformation": basicInfo.state,
    "country_userInformation": basicInfo.country,
    "isActive_userInformation": 1
  }
  Axios.postData('DirectInsert_userInformation',data).then((res)=>{
    console.log(res);
  })

}
    return(
        <>
        <Paper elevation={16}>
         <ContentStyle>
            <MBForm onSubmit={saveProfile}>
            <h3 style={{textAlign:'center'}}>PROFILE SETTINGS</h3>
            <Grid container spacing={2}>
             <Grid item xs={12} sm={12} md={12}>
                <MBTextField
                fullWidth
                  className={"mbtxt-width"}
                  id={"fullName"}
                  name={"fullName"}
                  value={basicInfo.fullName}
                  key={"fullName"}
                  label={"Full Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                </Grid>
                 <Grid item xs={12} sm={6} md={6}>
                <MBMobileNumberField
                  className={"mbtxt-width"}
                  id={"phoneNumber"}
                  name={"phoneNumber"}
                  value={basicInfo.phoneNumber}
                  key={"phoneNumber"}
                  label={"Phone Number"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                <MBDatePicker
                  className={"mbtxt-width"}
                  id={"dob"}
                  name={"dob"}
                  value={basicInfo.dob}
                  key={"dob"}
                  label={"Date of Birth"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                
             </Grid>
             <Grid item xs={12} sm={6} md={6}>
              <MBEmailField
                  className={"mbtxt-width"}
                  id={"email"}
                  name={"email"}
                  value={basicInfo.email}
                  key={"email"}
                  label={"Email"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                              
                <MBSelect 
                 obj={genderObj}
                value={basicInfo.gender}
                data={genderData}
                name={'gender'}
                onChange={basicInfoOnchange}
                label={'Select Gender'}
                required={true} validate={valid}/>
             </Grid>
             </Grid>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
              <MBTextField 
                className={"mbtxt-width"}
                label={"Address"}
                />
                </Grid>
             </Grid>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <MBTextField
                    className={"mbtxt-width"}
                    id={"city"}
                    name={"city"}
                    value={basicInfo.city}
                    key={"city"}
                    label={"City"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                   <MBNumberField
                    className={"mbtxt-width"}
                    id={"postalCode"}
                    name={"postalCode"}
                    value={basicInfo.postalCode}
                    key={"postalCode"}
                    label={"Zip Code"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"state"}
                    name={"state"}
                    value={basicInfo.state}
                    key={"state"}
                    label={"State"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                   <MBTextField
                    className={"mbtxt-width"}
                    id={"country"}
                    name={"country"}
                    value={basicInfo.country}
                    key={"country"}
                    label={"Country"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  </Grid>
             </Grid>
             <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {
                navigate('/dashboard/profile')  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                  {location?"Update":"Save"}
                </MBFormButton>
                </Stack>
            </MBForm>
         </ContentStyle>
        </Paper>
        </>
    )
}
const mapStateToProps=(state)=>{
  return{
    userId:state.User.userId_users,
  }
  }
export default connect(mapStateToProps)(PatientProfileSettings);