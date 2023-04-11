import React, { useState, useEffect } from "react";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
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



const RoleForm = ({onCancel}) => {
  const [valid, setValid] = useState(false);
  const [roleName, setRoleName] = useState('');

  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
   let data = {
    "userRoleId_userRole":null,
    "userRole_userRole":roleName,
    "isActive_userRole":true,
    "createdTime_userRole":"",
    "updatedTime_userRole":""
    }
    Axios.postData('DirectInsert_userRole',data).then(res =>{
      console.log(res);
      Store.dispatch({
        type:ReducerTypes.SHOW_ALERT.toString(),
        payload:{
          showAlert:true,
          message:`User Roled Added Sucessfully!`,
          type:AlertTypes.SUCCESS_ALERT_TYPE
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
                <MBTextField
                  className={"mbtxt-width"}
                  id={"roleName"}
                  name={"roleName"}
                  value={roleName}
                  key={"roleName"}
                  label={"Role Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setRoleName(e.target.value);
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
export default RoleForm;