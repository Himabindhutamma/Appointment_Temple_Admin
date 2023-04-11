import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { connect } from 'react-redux';
import Store from '../../Store';
import TextField from "@mui/material/TextField";


const MBSelect = ({data,obj,name,validate,onChange,id,className,value,label,key,required,nonetext}) => {
  
  console.log(validate,required);
  const [selectedValue, setSelectedValue] = useState(value ?? '');
  const [isError, checkError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');



  useEffect(() =>{
    setSelectedValue(value);
  },[value])

  useEffect(() => {
    if (validate && required) {
      if (selectedValue && selectedValue.toString().trim() && selectedValue.toString().trim().length > 0) {
        console.log(selectedValue.toString().trim() && selectedValue.toString().trim().length > 0);
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('Please Select a value');
      }
    }
  }, [selectedValue, validate]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    // Store.dispatch({ type: 'SET_SELECTED_VALUE' ,value});
    if (onChange) {
      
      let findObj = data.find(i => i[obj.value] === e.target.value)
      onChange(e, findObj);
      console.log(e.target.value);
    }
  };

  const showValue =  (i,label) =>{
    if(label.indexOf(',') >-1){
      let value = '';
      return label.split(',').map((l,m)=>{
        if(m !==0){
          value = value +' - '+i[l];
        }
        else{
          value = i[l];
        }
        if(m+1 === label.split(',').length){
          return value;
        }
      })
    }
    else{
      return i[label];
    }
  }

  return (
    <>
      <FormControl className={className || ''} sx={{ m: 0, minWidth: '100%',marginTop:'10px' }} error={isError}>
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          fullWidth
          className={className || ''}
          id={id || ''}
          key={key || ''}
          value={selectedValue}
          name={name || ''}
          required={required || false}
          label={label || ''}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        >
          <MenuItem value="">
            <em>{nonetext}</em>
          </MenuItem>
          {data?.map((item,j) =>{
            return(
              <MenuItem key={item[obj.value] + j} value={item[obj.value]}>{showValue (item, obj.label)}</MenuItem>
            )
          })}

        </Select>
        <FormHelperText>{errorMsg}</FormHelperText>
      </FormControl>
    </>
  );
};
const mapStateToProps = (state) => ({
  ...state.Settings
});
export default connect(mapStateToProps)(MBSelect);
