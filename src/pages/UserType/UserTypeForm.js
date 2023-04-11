import React, { useState, useEffect } from "react";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import Axios from '../../Services/API';
import Store from '../../Store'


const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0), 
   
  }));



const UserTypeForm = ({onCancel,editRecord}) => {
  const [valid, setValid] = useState(false);
  const [userType, setUserType] = useState('');
  console.log(editRecord);
  useEffect(()=>{
    if(editRecord){
      setUserType(editRecord.userTypec_userType)
    }
  },[])
 const updateForm = ()=>{
  let data = {
    "userTypeId_userType":editRecord.userTypeId_userType,
    "userTypec_userType":userType,
    "createdDate_userType":"",
    "updatedDate_userType":""
    }
    console.log(data);
    Axios.putData('Update_userType',data).then(res =>{
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `User Type Updated Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      onCancel();
    })
 }
  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
      if(editRecord){
        updateForm();
      }
      else{
        let data = {
          "userTypeId_userTypes":null,
          "userType_userTypes":userType,
          "isActive_userTypes":1,
          "createdTime_userTypes":"",
          "updatedTime_userTypes":""
          }
          Axios.postData('DirectInsert_userTypes', data).then(res => {
            Store.dispatch({
              type: ReducerTypes.SHOW_ALERT.toString(),
              payload: {
                showAlert: true, 
                message: `User Type Added Successfully!`,
                type: AlertTypes.SUCCESS_ALERT_TYPE
              }
            })
            onCancel();
          })
      }
   
  }

  return (<>
  <Paper elevation={16}>
        <ContentStyle>
        
        <MBForm onSubmit={submitForm}>
              
              <Stack spacing={3}>
             <MBTextField
             className={"mbtxt-width"}
                  id={"userType"}
                  name={"userType"}
                  value={userType}
                  key={"userType"}
                  label={"User Type"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
             />
             
              <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                   {editRecord ? 'Update' : 'Submit'}
                </MBFormButton>
                </Stack>
            </Stack>
            

        </MBForm>
         </ContentStyle>
         </Paper>
   
    </>


  );
};
export default UserTypeForm;