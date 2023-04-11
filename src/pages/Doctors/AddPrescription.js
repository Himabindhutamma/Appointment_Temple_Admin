import React,{ useState, useEffect} from 'react';
import { Paper,styled,Stack } from '@mui/material';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBNumberField from '../../FunctionalComponents/MBNumberField/MBNumberField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
    
  }));
const AddPrescription = () =>{
    const [valid, setValid]=useState(false)
    const [check,setCheck]=useState(false);
    const [preDetails,setPreDetails] = useState({
       patientName:'',drugName:'',dosage:'',weight:'',bp:'',temp:'',quantity:''
    })
    const [dayCheck, setDayCheck]=useState([])
    console.log(dayCheck);
    console.log(preDetails,check)
    const handleChange = e =>{
        setPreDetails({...preDetails,[e.target.name]:e.target.value})
    }
    const checkboxChange = e =>{
      const value = e.target.value;
      const checked = e.target.checked;
      if(checked){
        setDayCheck([...dayCheck,value]);
      }else{
        setDayCheck(dayCheck.filter((e) => (e !== value)));
      }
    }
    const savePrescription = () =>{

    }
    return(
        <>
        <Paper elevation={16}> 
          <ContentStyle>
            <MBForm onSubmit={savePrescription}>
            <MBTextField className={"mbtxt-width"} id="patientName" name="patientName" value={preDetails.patientName} onChange={handleChange} required validate={valid}
              key="patientName" label={"Patient Name"}
              />
              <Stack direction={'row'} spacing={2} sx={{mt:1,mb:1}}>
                    <MBTextField className={""} id="weight" name="weight" value={preDetails.weight} onChange={handleChange} required validate={valid}
                    key="weight" label={"Weight"}
                    />
                    <MBTextField className={""} id="bp" name="bp" value={preDetails.bp} onChange={handleChange} required validate={valid}
                    key="bp" label={"Blood Pressure"}
                    />
                    <MBTextField className={""} id="temp" name="temp" value={preDetails.temp} onChange={handleChange} required validate={valid}
                    key="temp" label={"Temprature"}
                    />
              </Stack>
            <MBTextField className={"mbtxt-width"} id="drugName" name="drugName" value={preDetails.drugName} onChange={handleChange} required validate={valid}
              key="drugName" label={"Drug Name"}
              />
              <Stack direction={'row'} spacing={2} sx={{mt:1,mb:1}}>
              <MBTextField className={""} id="dosage" name="dosage" value={preDetails.dosage} onChange={handleChange} required validate={valid}
              key="dosage" label={"Dosage"}
              />
               <MBNumberField className={""} id="quantity" name="quantity" value={preDetails.quantity} onChange={handleChange} required validate={valid}
              key="quantity" label={"Quantity"}
              />
              </Stack>
              <fieldset>
                <legend>Timings</legend>
                <Stack direction={'row'} spacing={2}>
                   <div style={{display:'grid'}}>
                        <WbTwilightIcon style={{fontSize:'3rem'}}/>
                        <input style={{height:'1.2rem'}} type={"checkbox"} id="morning" name="morning" key="morning" value={"morning"} onChange={checkboxChange}/>
                   </div>
                   <div style={{display:'grid'}}>
                   <WbSunnyIcon style={{fontSize:'3rem'}}/>
                     <input style={{height:'1.2rem'}} type={"checkbox"} id="afternoon" name="afternoon" key="afternoon" value={"afternoon"} onChange={checkboxChange}/>
                   </div>
                   <div style={{display:'grid'}}>
                   <Brightness4Icon style={{fontSize:'3rem'}} />
                   <input style={{height:'1.2rem'}} type={"checkbox"} id="night" name="night" key="night" value={"night"} onChange={checkboxChange}/>
                   </div>
                </Stack>
                 </fieldset>
                 <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                 
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
    )
}
export default AddPrescription