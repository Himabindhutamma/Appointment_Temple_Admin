import React, { useState, useEffect } from "react";
import { useFileUpload } from 'use-file-upload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBEmailField from "../../FunctionalComponents/MBEmailField/MBEmailField";
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import MBPassword from "../../FunctionalComponents/MBPassword/MBPassword";
import MBNumberField from "../../FunctionalComponents/MBNumberField/MBNumberField";
import MBDatePicker from '../../FunctionalComponents/MBDatePicker/MBDatePicker';
import DoctorProDetails from './DoctorsProDetails';
import DoctorExpDetails from './DoctorExpDetails';
import { Stack,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import Axios from '../../Services/API';
import Store from '../../Store';
import { connect } from 'react-redux';


const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));

const departmentObj={label:'name_departments', value:'departmentId_departments'}
const genderType={label:'label', value:'value'}
const genderData=[{label:'Male', value:'male'},{label:'Female', value:'female'},{label:'Other', value:'other'}]
const DoctorsForm = ({onCancel,userId,editData}) => {
  const [valid, setValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]=useState(3);
  const [genderValue, setGenderValue]=useState('');
  const [mobileno, setMobileNo]= useState('');
  const [date, setDate]= useState(null);
  const [address, setAddress]= useState('');
  const [city, setCity]=useState('');
  const [state, setState]= useState('');
  const [country, setCountry]= useState('');
  const [age,setAge]=useState('');
  const [files, selectFiles] = useFileUpload();
  const [departmentValue, setDepartmentValue]= useState('');
  const [personalDetails,setPersonalDetails] = useState('');
  const [ddata,setDepartmentData] = useState([]);
  const [aboutMe,setAboutMe]=useState('');
  const [professionalDetails,setProfessionalDetails] = useState('');
  const [services, setServices]=useState('')
  const [cardsList, setCardsList] = useState([])
  const [eduDetails, setEduDetails] = useState([{
    degree:'',college:'',yearOfCompletion:''
  }])
  const [expDetails, setExpDetails]=useState([{
    hospitalName:'',from:'',to:'',designation:''
  }])
  console.log(eduDetails,expDetails,cardsList)

  useEffect(()=>{
    getdepartmentData();
    let data1={
      aboutMe:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      education:[{
          "degree":"BDS",
          "college":"American Dental Medical University",
          "yearOfCompletion":"1998-2003"
      }],
      Specialization:["Children Care","Dental Care"]
    }
    console.log(JSON.stringify(data1))
  },[])
  const getdepartmentData = () =>{
    Axios.getData('SelectAll_departments').then(res=>{
      console.log(res)
      setDepartmentData(res)
      
    }).catch((err =>{
      console.log(err)
    }))
   }
   const saveDetails = ()=>{
    setEduDetails([...eduDetails,{degree:'',college:'',yearOfCompletion:''}])
  }
  const saveExpDetails = ()=>{
    setExpDetails([...expDetails,{hospitalName:'',from:'',to:'',designation:''}])
  }
  const handleSubmit = ()=>{
    console.log('added multiple cards....')
    let cf = {
      services: services,
    }
    let newList = [...cardsList]
    newList.push(cf)
    setCardsList(newList)
    setServices('')
    console.log(newList)
    console.log(cf)
 
}
  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
   let proDetails = {
    aboutMe:aboutMe,
    education:eduDetails,
    specialization:cardsList
   }
   let profeDetails={
       experience:expDetails
   }    
   let data = {
    "userInformationId_userInformation":3,
    "departmentId_userInformation":departmentValue,
    // "departmentSubCategoryId_userInformation":1,
    "userId_userInformation":userId,
    "fullName_userInformation":userName,
    "age_userInformation": age,
    "gender_userInformation":genderValue,
    "city_userInformation":city,
    "state_userInformation":state,
    "country_userInformation":country,
    "personalDetails_userInformation":JSON.stringify(proDetails),
    "professionalDetails_userInformation":JSON.stringify(profeDetails),
    "isActive_userInformation":1,
   
}
Axios.putData('Update_userInformation', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Clinic/ Hospital Added Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      onCancel();
    })
  }

  return (<>
  <Paper elevation={16}>
        <ContentStyle>
        <MBForm onSubmit={submitForm}>
              
              <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                      <div className="upload-pic">
                      <img src={files?.source} alt='preview' />
                        <FileUploadIcon
                          className='upload-doc-button'
                          type='button'
                          onClick={() =>
                            selectFiles(
                              { accept: 'image/*' },
                              ({ name, size, source, file }) => {
                                // let setdata = { name, size, source, file }
                                // setProfile(setdata)
                              }
                            )
                          }
                        >
                          Upload
                        </FileUploadIcon>
                      </div> 

                  </Grid> */}
                <Grid item xs={6}>
                  <MBSelect fullWidth className='' id='departmentValue' name='departmentValue' value={departmentValue} required={false}  
                  label='Select DepartMent'
                  onChange={(e) => setDepartmentValue(e.target.value)}
                  obj={departmentObj}
                  data={ddata}
                  />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"userName"}
                  name={"userName"}
                  value={userName}
                  key={"userName"}
                  label={"Full Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"age"}
                  name={"age"}
                  value={age}
                  key={"age"}
                  label={"Age"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"state"}
                  name={"state"}
                  value={state}
                  key={"state"}
                  label={"State"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"city"}
                  name={"city"}
                  value={city}
                  key={"city"}
                  label={"City"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"country"}
                  name={"country"}
                  value={country}
                  key={"country"}
                  label={"Country"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
                </Grid>
               <Grid item xs={6}>
                <MBSelect
                    obj={genderType}
                    value={genderValue}
                    data={genderData}
                    name={'gender'}
                    onChange={e => setGenderValue(e.target.value)}
                    label={'Select Gender'}
                    required
                    validate={valid}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"address"}
                  name={"address"}
                  value={address}
                  key={"address"}
                  label={"Address"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"aboutMe"}
                  name={"aboutMe"}
                  value={aboutMe}
                  key={"aboutMe"}
                  label={"About Me"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setAboutMe(e.target.value);
                  }}
                />
                </Grid>
                
               {/* <Grid item xs={6}>
                <MBNumberField
                  className={"mbtxt-width"}
                  id={"mobileno"}
                  name={"mobileno"}
                  value={mobileno}
                  key={"mobileno"}
                  label={"Mobile No"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
                </Grid> */}
               </Grid>
               <DoctorProDetails saveServices={handleSubmit} services={services} setServices={setServices}
               saveDetails={saveDetails} cardsList={cardsList} setCardsList={setCardsList}
               eduDetails={eduDetails} 
               setEduDetails={setEduDetails} />
               <DoctorExpDetails saveExpDetails={saveExpDetails} expDetails={expDetails} setExpDetails={setExpDetails}/>
               <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                  Submit
                </MBFormButton>
                </Stack>

        </MBForm>
         </ContentStyle>
         </Paper>
   
    </>


  );
};
const mapStateToProps = (state) =>({
  userId:state.User.userId_users
})
export default connect(mapStateToProps)(DoctorsForm);