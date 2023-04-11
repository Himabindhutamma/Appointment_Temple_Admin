
import React, { useState, useEffect } from "react";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBEmailField from "../../FunctionalComponents/MBEmailField/MBEmailField";
import MBPassword from "../../FunctionalComponents/MBPassword/MBPassword";
import MBNumberField from "../../FunctionalComponents/MBNumberField/MBNumberField";
import MBSelect from '../../FunctionalComponents/MBSelect/MBSelect';
import Dialogs from '../../FunctionalComponents/Dailogs/Dailogs';
import { Stack,Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import Axios from '../../Services/API';
import Store from '../../Store';
import MBTextArea from "../../FunctionalComponents/MBTextArea/MBTextArea";


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
const orgObj ={label:'organizationType_organizationType',value:'organizationTypeId_organizationType'}
const ClinicForm = ({onCancel,editData}) => {
  console.log(editData)
  const [valid, setValid] = useState(false);
  const [orgType,setOrgType] = useState('');
  const [orgData,setOrgData] = useState([]);
  const [cardsList, setCardsList] = useState([])
  const [services, setServices]=useState('')
  const [clinicData, setClinicData]= useState({
     clinicID:'',clinicName:'',clinicAddress:'',clinicState:'',clinicCity:'',clinicCountry:'',mobileNo:'',email:'',about:''
  })
  const [workingHours, setWorkingHours]=useState({
    mon:'',tue:'',wed:'',thu:'',fri:'',sat:'',sun:''
  })
  console.log(workingHours)
  useEffect(()=>{
    if(editData){
      setClinicData({clinicID:editData.organizationUniqueId_organization,clinicName:editData.organizationName_organization,
        clinicAddress:editData.address_organization,clinicState:editData.state_organization,clinicCity:editData.city_organization,clinicCountry:editData.country_organization
      })
    }
  },[editData])
  useEffect(()=>{
    Axios.getData('SelectAll_organizationType/').then(res =>{
      console.log(res);
      setOrgData(res)

    }).catch(err =>{
      console.log(err)
    })
  },[])
 const handleSubmit = (e) =>{
  console.log(e);
  if(e.keyCode === 13) {
    e.preventDefault();
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
 }
 const clinicOnchange = e =>{
   setClinicData({...clinicData,[e.target.name]:e.target.value})
 }
 const hoursChange = (e)=>{
  setWorkingHours({...workingHours,[e.target.name]:e.target.value})
 }
 const removeService = (i) =>{
  let newValues=[...cardsList];
  newValues.splice(i,1);
  setCardsList(newValues);
}
  const submitForm = (e) => {
      e.preventDefault();
      setValid(true);
      let services={
        Service:cardsList
       }

   let data = {
    "organizationTypeId_organization":orgType,
    "organizationUniqueId_organization":clinicData.clinicID,
    "organizationName_organization": clinicData.clinicName,
    "address_organization":clinicData.clinicAddress,
    "state_organization":clinicData.clinicState,
    "city_organization": clinicData.clinicCity,
    "country_organization":clinicData.clinicCountry,
    "about_organization":clinicData.about, 
    "mobileNumber_organization":clinicData.mobileNo,
    "email_organization": clinicData.email,
    "service_organization":JSON.stringify(services),
    "workingHours_organization":JSON.stringify(workingHours),
    "isActive_organization":true,
    
    
   }

    Axios.postData('DirectInsert_organization', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Clinic or Hospital Added Successfully!`,
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
                <MBSelect fullWidth id="orgType" name="orgType" key="orgType" value={orgType} 
                onChange={(e) => setOrgType(e.target.value)}
                label="Select Organization Type"
                obj={orgObj} data={orgData}
                />
                <Stack direction={"row"} spacing={2}>
                <MBTextField  className={""} id={"clinicID"} name={"clinicID"} value={clinicData.clinicID} key={"clinicID"}
                  label={"Clinic ID"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField
                  className={""}
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
                </Stack>
                <Stack direction="row" spacing={2}>
               <MBTextField  className={""} id={"email"} name={"email"} value={clinicData.email} key={"email"}
                  label={"Email"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField  className={""} id={"mobileNo"} name={"mobileNo"} value={clinicData.mobileNo} key={"email"}
                  label={"Phone Number"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
               </Stack>
               <Stack direction={"row"} spacing={2}>
                <MBTextArea
                  className={""}
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
                <MBTextArea  className={""} id={"about"} name={"about"} value={clinicData.about} key={"about"} label={"About Cliic / Hospital"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                </Stack>
               <Stack direction="row" spacing={2}>
               <MBTextField className={""} id={"clinicState"} name={"clinicState"} value={clinicData.clinicState} key={"clinic State"} label={"Clinic State"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField className={""} id={"clinicCity"} name={"clinicCity"} value={clinicData.clinicCity} key={"clinic City"}
                  label={"Clinic City"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
                <MBTextField  className={""} id={"clinicCountry"} name={"clinicCountry"} value={clinicData.clinicCountry} key={"clinic Country"}
                  label={"Clinic Country"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={clinicOnchange}
                />
               </Stack>
               <fieldset>
          <legend>Services</legend>
            <div className='services-section'>
              {cardsList && cardsList.map((element,index)=>(
                <>
                <span className='element'>{element.services}
                 <span className='remove' onClick={()=>removeService(index)}>x</span>
                </span>
                
                </>
              ))}
              
              <input type="text"  className='service-text' value={services} onKeyDown={handleSubmit} onChange={(e)=>setServices(e.target.value)}/>
              
            </div>
          </fieldset>
          <fieldset>
          <legend>Working Hours</legend>
          <Stack direction="row" spacing={2}>
          <input type="text" className='' value={workingHours.mon} name="mon" id="mon" key="mon" placeholder="Mon" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.tue} name="tue" id="tue" key="tue" placeholder="Tue" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.wed} name="wed" id="wed" key="wed" placeholder="Wed" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.thu} name="thu" id="thu" key="thu" placeholder="Thu" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.fri} name="fri" id="fri" key="fri" placeholder="Fri" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.sat} name="sat" id="sat" key="sat" placeholder="Sat" onChange={hoursChange}/>
             <input type="text" className='' value={workingHours.sun} name="sun" id="sun" key="sun" placeholder="Sun" onChange={hoursChange}/>
          </Stack>
          </fieldset>
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
export default ClinicForm;