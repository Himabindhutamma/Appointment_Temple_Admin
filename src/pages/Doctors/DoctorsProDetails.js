import React,{ useState, useEffect,useRef} from 'react';
import { Stack } from '@mui/material';
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';


const DoctorProDetails = ({handleChange,saveDetails,eduDetails,setEduDetails,saveServices,cardsList,setCardsList,services,setServices}) =>{
  const wrapperRef = useRef(null);
  const [aboutMe, setAboutMe]=useState('')
  const [valid, setValid]=useState(false)
 
  console.log(cardsList);
    // const [eduDetails, setEduDetails] = useState([{
    //   degree:'',college:'',yearOfCompletion:''
    // }])
    console.log(eduDetails)
    // useEffect(() => {
    //   document.addEventListener('click', handleClickOutside, false);
    //   return () => {
    //     document.removeEventListener('click', handleClickOutside, false);
    //   };
    // }, []);
    const handleSubmit = (e)=>{
      if(e.keyCode === 13) {
        e.preventDefault();  
        saveServices()
      }
      
 }
//  const handleClickOutside = (event) => {
//   console.log(event.target.value);
//   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//     let cf = {
//       services: services,
//     }
//     let newList = [...cardsList]
//     newList.push(cf)
//     setCardsList(newList)
//     setServices('')
//     console.log(newList)
//     console.log(cf)
//   }
// };

    const saveEduDetails = ()=>{
      saveDetails()
      // setEduDetails([...eduDetails,{degree:'',college:'',yearOfCompletion:''}])
    }
    const  onChange = (e,i) =>{
       let newValues = [...eduDetails];
       newValues[i][e.target.name]=e.target.value;
       setEduDetails(newValues);
    }
    const removeDetails = (i) =>{
      let newValues=[...eduDetails];
      newValues.splice(i,1);
      setEduDetails(newValues);
    }
    const removeService = (i) =>{
      let newValues=[...cardsList];
      newValues.splice(i,1);
      setCardsList(newValues);
    }
    return(
        <>
        <fieldset>
          <legend>Education Details</legend>
             {eduDetails.map((element,index)=>(
                <Stack spacing={2} direction="row" sx={{mb:1}}>

                 <MBTextField  className={"edu-text"} id={"degree"}  name={"degree"} value={element.degree}
                  key={"degree"}
                  label={"degree"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  <MBTextField  className={"edu-text"} id={"college"}  name={"college"} value={element.college}
                  key={"college"}
                  label={"college"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                    <MBTextField  className={"edu-text"} id={"yearOfCompletion"}  name={"yearOfCompletion"} value={element.yearOfCompletion}
                  key={"yearOfCompletion"}
                  label={"yearOfCompletion"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    onChange(e,index);
                  }}
                  />
                  {index ? 
                <MBFormButton type="button" fullWidth={false} variant='contained' onClick={()=>removeDetails(index)}>
                   Remove
                </MBFormButton> : null}
                </Stack>
                ))}
                  <MBFormButton type="button" fullWidth={false} variant='contained' onClick={saveEduDetails}>
                  Add
                </MBFormButton>
               
        </fieldset>
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
           
         
        </>
    )
}
export default DoctorProDetails
