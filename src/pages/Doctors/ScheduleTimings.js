import React,{ useState } from "react";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MBForm from '../../FunctionalComponents/MBForm/MBForm';
import MBTimePicker from '../../FunctionalComponents/MBTimePicker/MBTimePicker';
import EventSession from "../EventSession/EventSession";
 
const ScheduleTimings = ()=>{
    // const [timeValues, setTimeValues] = useState([{
    //     startTime:'',endTime:''
    // }])
    // console.log(timeValues);
    // const saveTimings = (e) =>{
    //     e.preventDefault();
    //     alert(JSON.stringify(timeValues));
    // }
    // const addTimings = () =>{
    //     setTimeValues([...timeValues,{startTime:'',endTime:''}])
    // }
    // const handleChange = (e,i) =>{
    //     // var inputElm = document.getElementById(e.target.id);
    //     var timeSplit = e.target.value.split(':'),hours,minutes,meridian;
    //     hours = timeSplit[0];
    //     minutes = timeSplit[1];
    //     if(hours > 12){
    //         meridian ='PM';
    //         hours -= 12;

    //     }else if(hours < 12){
    //             meridian = 'AM';
    //         if(hours == 0){
    //             hours =12;
    //          }
    //       }else{
    //              meridian = 'PM';
    //          }
    //     console.log(hours + ':' + minutes + ' ' + meridian);
    //     console.log(`${hours}:${minutes}${meridian}`);

    //   let newValues = [...timeValues];
    // newValues[i][e.target.name] = `${hours}:${minutes}${meridian}`;
    //   setTimeValues(newValues);
    // }
    // const removeFormFields = (i) =>{
    //         console.log(i);
    //         let newValues = [...timeValues];
    //         console.log(newValues);
    //         newValues.splice(i,1);
    //         setTimeValues(newValues);
    // }
    return(
        <>
        <EventSession/>
          {/* <MBForm onSubmit={saveTimings}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addTimings}>
                Add
            </Button>
            
            {timeValues.map((element,index)=>
              (
                <div className="form-inline" key={index}>
                <label>Start Time</label>
                <MBTimePicker
                className={'mbtxt-width'}
                id={'startTime'}
                name={'startTime'}
                value={element.startTime || ''}
                key={'startTime'}
                label={'startTime'}
                required={false}
                error
                helperText={''}
                onChange={(e) => handleChange(e,index)}
              />
                <label>End Time</label>
                <MBTimePicker
                className={'mbtxt-width'}
                id={'endTime'}
                name={'endTime'}
                value={element.endTime || ''}
                key={'endTime'}
                label={'endTime'}
                required={false}
                error
                helperText={''}
                onChange={(e) => handleChange(e,index)}
              />
                {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
                </div>

              )
            )}
            <button className="button submit" type="submit">Submit</button>

        </MBForm> */}

        </>
    )
}
// const ScheduleTimings=()=>{
//   return(
//     <>
//     <EventSession/>
//     </>
//   );
// }
export default ScheduleTimings





