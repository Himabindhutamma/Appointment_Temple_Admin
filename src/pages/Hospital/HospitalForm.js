
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

const HospitalForm = ({onCancel,editData}) => {
  console.log(editData)
  const [valid, setValid] = useState(false);
  const [clinicData, setClinicData]= useState({
     clinicID:'',clinicName:'',clinicAddress:'',clinicState:'',clinicCity:'',clinicCountry:''
  })
  useEffect(()=>{
    if(editData){
      setClinicData({clinicID:editData.organizationUniqueId_organization,clinicName:editData.organizationName_organization,
        clinicAddress:editData.address_organization,clinicState:editData.state_organization,clinicCity:editData.city_organization,clinicCountry:editData.country_organization
      })
    }
  },[editData])

 
 const clinicOnchange = e =>{
   setClinicData({...clinicData,[e.target.name]:e.target.value})
 }
  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
   let data = {
    "organizationUniqueId_organization":clinicData.clinicID,
    "organizationName_organization": clinicData.clinicName,
    "address_organization":clinicData.clinicAddress,
    "state_organization":clinicData.clinicState,
    "city_organization": clinicData.clinicCity,
    "country_organization":clinicData.clinicCountry,
    "isActive_organization":true,
    
   }

    Axios.postData('DirectInsert_organization', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Clinic Added Successfully!`,
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
                
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicID"}
                  name={"clinicID"}
                  value={clinicData.clinicID}
                  key={"clinicID"}
                  label={"Clinic ID"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicName"}
                  name={"clinicName"}
                  value={clinicData.clinicName}
                  key={"clinicName"}
                  label={"Clinic Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicAddress"}
                  name={"clinicAddress"}
                  value={clinicData.clinicAddress}
                  key={"clinic Address"}
                  label={"Clinic Address"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicState"}
                  name={"clinicState"}
                  value={clinicData.clinicState}
                  key={"clinic State"}
                  label={"Clinic State"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicCity"}
                  name={"clinicCity"}
                  value={clinicData.clinicCity}
                  key={"clinic City"}
                  label={"Clinic City"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"clinicCountry"}
                  name={"clinicCountry"}
                  value={clinicData.clinicCountry}
                  key={"clinic Country"}
                  label={"Clinic Country"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
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
export default HospitalForm;