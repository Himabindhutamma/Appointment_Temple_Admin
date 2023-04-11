import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Basic } from '../../Assets/Constants';

const MBTextArea = ({ id, className, value, name, key, label, required, validate, onChange, rows,inputprops,disabled }) => {
  const [errorMsg, setErrorMsg] = useState('');
  // const [valid,setValid] =
  console.log(validate);
  const [isError, checkError] = useState(false);
  const [cValue, setValue] = useState(value || '');


  useEffect(() =>{
    setValue(value);
  },[value])
  
  useEffect(() => {
    console.log('hello');
    // if (validate && required) {
    //   const reg = /^[a-zA-Z0-9_]*$/
    //   if (reg.test(cValue) === false) {
    //     checkError(true);
    //     setErrorMsg('Enter a valid input value');
    //   }
    //   else if (cValue.toString().trim() && cValue.toString().trim().length > 0) {
    //     checkError(false);
    //     setErrorMsg('');
    //   }else{
    //     checkError(true);
    //     setErrorMsg('enter a value');
    //   }
    // }
    if (validate && required) {
      if (cValue.toString().trim() && cValue.toString().trim().length > 0) {
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('enter a value');
      }
    } else {
      checkError(false);
      setErrorMsg('');
    }
  }, [cValue, validate]);

  const change = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
      console.log(e.target.value);
    }

    if (validate && required) {
      if (cValue.toString().trim() && cValue.toString().trim().length > 0) {
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('enter a value');
      }
    } else {
      checkError(false);
      setErrorMsg('');
    }
    // if (validate && required) {
    //   const reg = /^[a-zA-Z0-9_]*$/
    //   if (reg.test(cValue) === false) {
    //     checkError(true);
    //     setErrorMsg('');
    //   }
    //   else {
    //     checkError(false);
    //     setErrorMsg('');
    //   }
    // }
    // else {
    //   checkError(false);
    //   setErrorMsg('');
    // }
  };

  return ( 
    <>
      <TextField fullWidth
        className={className || ''}
        value={cValue}
        name={name || ''}
        key={key || ''}
        id={id || ''}
        label={label}
        variant={Basic.TEXT_FIELD_DESIGN_VARIANT}
        required={required || false}
        error={isError}
        helperText={errorMsg}
        onChange={change}
        multiline
        rows={rows || 4}
        inputProps={{pattern:"^[a-zA-Z0-9_-]*$"}}
        InputLabelProps={{
          shrink: true,
       }}
       disabled={disabled || false}
      /> 
    </>
  );
};
export default MBTextArea;
