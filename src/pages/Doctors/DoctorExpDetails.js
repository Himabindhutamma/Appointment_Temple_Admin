import React,{ useState, useEffect,useRef} from 'react';
import { Stack,Grid } from '@mui/material';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';


const DoctorExpDetails = ({handleChange,saveExpDetails,expDetails,setExpDetails}) =>{
  const wrapperRef = useRef(null);
  const [aboutMe, setAboutMe]=useState('')
  const [valid, setValid]=useState(false)
  const [cardsList, setCardsList] = useState([])
  const [services, setServices]=useState('')
  console.log(cardsList);
    // const [eduDetails, setEduDetails] = useState([{
    //   degree:'',college:'',yearOfCompletion:''
    // }])
    console.log(expDetails)
    const saveproDetails = ()=>{
        saveExpDetails()
      // setEduDetails([...eduDetails,{degree:'',college:'',yearOfCompletion:''}])
    }
    const  onChange = (e,i) =>{
       let newValues = [...expDetails];
       newValues[i][e.target.name]=e.target.value;
       setExpDetails(newValues);
    }
    const removeDetails = (i) =>{
      let newValues=[...expDetails];
      newValues.splice(i,1);
      setExpDetails(newValues);
    }

    return(
        <>
        <fieldset>
          <legend>Experience</legend>
             {expDetails.map((element,index)=>(
                <Grid container spacing={2} sx={{mb:1}}>
                  <Grid item xs={12} md={4} lg={4}>
                  <MBTextField  className={""} id={"hospitalName"}  name={"hospitalName"} value={element.hospitalName}
                  key={"hospitalName"}
                  label={"Hospital Name"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                  <MBTextField  className={""} id={"from"}  name={"from"} value={element.from}
                  key={"from"}
                  label={"from"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                  <MBTextField  className={""} id={"to"}  name={"to"} value={element.to}
                  key={"to"}
                  label={"to"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                  <MBTextField  className={""} id={"designation"}  name={"designation"} value={element.designation}
                  key={"designation"}
                  label={"designation"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  </Grid>
                  {index ? 
                <MBFormButton type="button" fullWidth={false} variant='contained' onClick={()=>removeDetails(index)}>
                   Remove
                </MBFormButton> : null}
                </Grid>
                ))}
               
                  <MBFormButton type="button" fullWidth={false} variant='contained' onClick={saveproDetails}>
                  Add
                </MBFormButton>
               
        </fieldset>
        </>
    )
}
export default DoctorExpDetails
