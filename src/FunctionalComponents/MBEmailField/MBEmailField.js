import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Basic } from '../../Assets/Constants';

const MBEmailField = ({ id, className, value, name, key, label, required, validate, onChange }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState(value || '');
  const [isError, checkError] = useState(false);

  useEffect(() =>{
    setEmail(value);
  },[value])
  
  
  useEffect(() => {
    console.log(email);
    if (validate && required) {
      if (validate) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (
          emailRegex.test(email) &&
          email.toString().trim() &&
          email.toString().trim().length > 0
        ) {
          checkError(false);
          setErrorMsg('');
        } else {
          checkError(true);
          setErrorMsg('Please enter a valid email!');
        }
      }
    } else {
      checkError(false);
      setErrorMsg('');
    }
  }, [email, validate]);

  const change = (e) => {
    setEmail(e.target.value);
    if (onChange) {
      onChange(e);
      console.log(e.target.value);
    }

    if (validate && required) {
      if (validate) {
        const emailRegex = /\S+@\S+\.\S+/; 
        if (
          emailRegex.test(e.target.value) &&
          e.target.value.toString().trim() &&
          e.target.value.toString().trim().length > 0
        ) {
          checkError(false);
          setErrorMsg('');
        } else {
          checkError(true);
          setErrorMsg('Please enter a valid email!');
        }
      }
    } else {
      checkError(false);
      setErrorMsg('');
    }
  };

  return (
    <>
      <TextField
        type="email"
        className={className || ''}
        value={email}
        name={name || ''} 
        key={key || ''}
        id={id || ''}
        label={label}
        variant={Basic.TEXT_FIELD_DESIGN_VARIANT}
        required={required || false}
        error={isError}
        helperText={errorMsg}
        onChange={change}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};
export default MBEmailField;
