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
import { connect } from 'react-redux'

const usertype = { label: 'label', value: 'value' }
const userTypedata = [
  { label: 'Senior Citizens', value: 'seniorcitizens' },
  { label: 'Adults', value: 'Adults' },
  { label: 'Childrens', value: 'Childrens' },
  { label: 'Youth', value: 'Youth' },
]
const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));



const DeapartmentForm = ({onCancel,userid,editRecord}) => {
    console.log("user id...", userid)
  const [valid, setValid] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  useEffect(()=>{
    if(editRecord){
      setDepartmentName(editRecord.name_departments)
    }
  },[])
  const updateEvent = ()=>{
    let data = {"departmentId_departments":editRecord.departmentId_departments,"name_departments":departmentName,"isActive_departments":1}
    Axios.putData('Update_departments',data).then(res =>{
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Department Updated Successfully!`,
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
        updateEvent()
      }else{
    let data = {"departmentId_departments":null,"name_departments":departmentName,"isActive_departments":1,"createdTime_departments":"","updatedTime_departments":""}

    Axios.postData('DirectInsert_departments', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Department Added Successfully!`,
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
                  id={"departmentName"}
                  name={"departmentName"}
                  value={departmentName}
                  key={"departmentName"}
                  label={"Department Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setDepartmentName(e.target.value);
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
const mapStateToProps =(state)=>({
        userid:state.User.userId
});
export default connect (mapStateToProps)(DeapartmentForm);