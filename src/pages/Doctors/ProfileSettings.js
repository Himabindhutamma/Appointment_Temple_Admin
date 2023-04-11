import React,{  useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Stack,Grid,Box } from '@mui/material';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBEmailField from '../../FunctionalComponents/MBEmailField/MBEmailField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import TextareaAutosize from '@mui/material/TextareaAutosize';


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
const ProfileSettings = ({onCancel}) =>{
    const [valid, setValid] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        userName:'',email:'',firstName:'',lastName:'',phoneNumber:'',dob:'',gender:'',clinicName:'',clinicAddress:'',addressLineone:'',
        addressLineTwo:'',city:'',state:'',country:'',postalCode:''
    })
    const [educationInfo, setEducationInfo]=useState({
      degree:'',college:'',yrOfComp:''
    })
    const [experience, setExperience] = useState({
      hospitalName:'',fromDate:'', toDate:'',designation:''
    })
  
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
  }
    return(
        <>
        <Paper elevation={16}>
         <ContentStyle>
            <MBForm onSubmit={saveProfile}>
            <h3>Basic Information</h3>
            <Grid container spacing={2}>
             <Grid item xs={12} sm={6} md={6}>
              <MBTextField
                  className={"mbtxt-width"}
                  id={"userName"}
                  name={"userName"}
                  value={basicInfo.userName}
                  key={"userName"}
                  label={"User Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"firstName"}
                  name={"firstName"}
                  value={basicInfo.firstName}
                  key={"firstName"}
                  label={"First Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={basicInfoOnchange}
                />
                <MBTextField
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
                <MBTextField
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
                 <MBTextField
                  className={"mbtxt-width"}
                  id={"lastName"}
                  name={"lastName"}
                  value={basicInfo.lastName}
                  key={"lastName"}
                  label={"Last Name"}
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
              <h3>About Me</h3>
              <TextareaAutosize 
                aria-label="minimum height"
                minRows={8}
                placeholder="Biography"
                style={{ width: "100%" }}
                />
                </Grid>
             </Grid>
             <h3>Clinic Info</h3>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <MBTextField
                    className={"mbtxt-width"}
                    id={"clinicName"}
                    name={"clinicName"}
                    value={basicInfo.clinicName}
                    key={"clinicName"}
                    label={"Clinic Name"}
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
                    id={"clinicAddress"}
                    name={"clinicAddress"}
                    value={basicInfo.clinicAddress}
                    key={"clinicAddress"}
                    label={"Clinic Address"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  </Grid>
             </Grid>
             <h3>Contact Deatils</h3>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <MBTextField
                    className={"mbtxt-width"}
                    id={"addressLineone"}
                    name={"addressLineone"}
                    value={basicInfo.addressLineone}
                    key={"addressLineone"}
                    label={"Address Line 1"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
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
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"country"}
                    name={"country"}
                    value={basicInfo.country}
                    key={"city"}
                    label={"Country"}
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
                    id={"addressLineTwo"}
                    name={"addressLineTwo"}
                    value={basicInfo.addressLineTwo}
                    key={"addressLineTwo"}
                    label={"Address Line 2"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"state"}
                    name={"state"}
                    value={basicInfo.state}
                    key={"addressLineTwo"}
                    label={"State / Province"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"postalCode"}
                    name={"state"}
                    value={basicInfo.postalCode}
                    key={"postalCode"}
                    label={"Postal Code"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={basicInfoOnchange}
                  />
                  </Grid>
             </Grid>
             <h3>Education</h3>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <MBTextField
                    className={"mbtxt-width"}
                    id={"degree"}
                    name={"degree"}
                    value={educationInfo.degree}
                    key={"degree"}
                    label={"Degree"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={educationInfoOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"college"}
                    name={"college"}
                    value={educationInfo.college}
                    key={"college"}
                    label={"College/Institute"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={educationInfoOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"yrOfComp"}
                    name={"yrOfComp"}
                    value={educationInfo.yrOfComp}
                    key={"yrOfComp"}
                    label={"Year of Completion"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={educationInfoOnchange}
                  />
                  </Grid>
             </Grid>
             <h3>Experience</h3>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <MBTextField
                    className={"mbtxt-width"}
                    id={"hospitalName"}
                    name={"hospitalName"}
                    value={experience.hospitalName}
                    key={"hospitalName"}
                    label={"Hospital Name"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={experienceOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"fromDate"}
                    name={"fromDate"}
                    value={experience.fromDate}
                    key={"fromDate"}
                    label={"From"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={experienceOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"toDate"}
                    name={"toDate"}
                    value={experience.toDate}
                    key={"toDate"}
                    label={"To"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={experienceOnchange}
                  />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                  <MBTextField
                    className={"mbtxt-width"}
                    id={"designation"}
                    name={"designation"}
                    value={experience.designation}
                    key={"designation"}
                    label={"Designation"}
                    required={false}
                    error
                    helperText={""}
                    validate={valid}
                    onChange={experienceOnchange}
                  />
                  </Grid>
             </Grid>
             <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                  Save
                </MBFormButton>
                </Stack>
            </MBForm>
         </ContentStyle>
        </Paper>
        </>
    )
}
export default ProfileSettings