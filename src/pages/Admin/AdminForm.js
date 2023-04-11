import React, { useState, useEffect } from "react";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBEmailField from "../../FunctionalComponents/MBEmailField/MBEmailField";
import MBPassword from "../../FunctionalComponents/MBPassword/MBPassword";
import MBNumberField from "../../FunctionalComponents/MBNumberField/MBNumberField";
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import Axios from '../../Services/API';
import Store from '../../Store';


const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));


const usertTypeObj={label:'userType_userTypes', value:'userTypeId_userTypes'}
const clinicObj={label:'organizationName_organization', value:'organizationId_organization'}

const roleobj={label:'userRole_userRole',value:'userRoleId_userRole'}

const AdminForm = ({onCancel,editRecord}) => {
  const [userData,setUserData]=useState([]);
  const [userRole,setUserRole]=useState('');
  const [valid, setValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]=useState(3);
  const [mobileno, setMobileNo]= useState('');
  const [userTypeValue, setUserTypeValue]=useState('');
  const [userTypedata,setUserTypeData] = useState([]);
  const [clinicData, setClinicData]= useState([]);
  const [clinicValue, setClinicValue] = useState('');
  console.log(userTypeValue);
 useEffect(()=>{
   if(editRecord){
    setUserName(editRecord.name_users);
    setEmail(editRecord.email_users);
    setMobileNo(editRecord.mobileNumber_users);
   }
 },[])
  useEffect(()=>{
    getUserTypeList();
    getClinicList();

    getAllUser_Role();

  },[])
 const getUserTypeList = () =>{
    Axios.getData('SelectAll_userTypes') 
        .then(res=>{
            setUserTypeData(res);
          }) 
        .catch(err =>{
          console.log(err);
        })
}
const getClinicList = () =>{
  Axios.getData('SelectAll_organization').then(
    res =>{
      setClinicData(res);
    }
  ).catch(err =>{

  })
}

const getAllUser_Role=()=>{
  Axios.getData('SelectAll_userRole').then(res=>{
    console.log(res)
    setUserData(res);
  })
}

  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
   let data = {
   "userTypeId_users":userTypeValue,
   "name_users":userName,
   "email_users":email,
   "mobileNumber_users":mobileno,
   "password_users":password,
   "isActive_users":1,
   "createdTime_users":"",
   "updatedTime_users":""
   }

    Axios.postData('Registration', data).then(res => {
      console.log(res);
      let userdata = {
        "organizationId_organizationUsers":clinicValue,
        "userId_organizationUsers":res.Message.insertId,

        "userRoleId_organizationUsers":userTypeValue === 3 ? 8 : 5,

        "isActive_organizationUsers": 1
      }
      return Axios.postData('DirectInsert_organizationUsers',userdata)
      
    }).then(response =>{
      console.log(response)
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Added Successfully!`,
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
              
              <Stack spacing={3}>
                <MBSelect
                  id={'userTypeValue'}
                  key={'userTypeValue'}
                  value={userTypeValue}
                  name={'userTypeValue'}
                  required={false}
                  label={'Select User Type'}
                  onChange={(e) => setUserTypeValue(e.target.value)}
                  obj={usertTypeObj}
                  data={userTypedata}
                  validate={valid}

                />

                {userTypeValue === 3 && 
                <>
                 <MBSelect

                  id={'clinicValue'}
                  key={'clinicValue'}
                  value={clinicValue}
                  name={'clinicValue'}
                  required={false}
                  label={'Select Clinic'}
                  onChange={(e) => setClinicValue(e.target.value)}
                  obj={clinicObj}
                  data={clinicData}
                  validate={valid}

                />

                 {/* <MBSelect
                
                  id={'userRole'}
                  key={'userRole'}
                  value={userRole}
                  name={'userRole'}
                  required={false}
                  label={'Select Role'}
                  onChange={(e) => setUserRole(e.target.value)}
                  obj={roleobj}
                  data={userData}
                  validate={valid}

                /> */}
                </>
                 
                
                }
                

                <MBTextField
                  className={"mbtxt-width"}
                  id={"userName"}
                  name={"userName"}
                  value={userName}
                  key={"userName"}
                  label={"User Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <MBEmailField
                  className={"mbtxt-width"}
                  id={"email"}
                  name={"email"}
                  value={email}
                  key={"email"}
                  label={"Email"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <MBPassword
                  className={"mbtxt-width"}
                  id={"password"}
                  name={"password"}
                  value={password}
                  key={"password"}
                  label={"Password"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
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
                
             
              <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                  Submit
                </MBFormButton>
                </Stack>
            </Stack>
            

        </MBForm>
         </ContentStyle>
         </Paper>
   
    </>


  );
};
export default AdminForm;