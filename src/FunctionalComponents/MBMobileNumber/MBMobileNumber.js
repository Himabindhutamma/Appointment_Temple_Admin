import React,{ useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Basic } from '../../Assets/Constants';


const MBMobileNumber = ({ id, className, value, name, key, label, required, validate, onChange,inputProps,disabled }) =>{
    const [errorMsg, setErrorMsg] = useState('');
  const [isError, checkError] = useState(false);
  const [cValue, setValue] = useState(value || '');

  useEffect(() =>{
    setValue(value);
  },[value])
  
  useEffect(() => {
    if (validate && required) {
        const reg=/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
      if (reg.test(cValue) && cValue.toString().trim() && cValue.toString().trim().length > 0) {
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('Please Valid Mobile Number');
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
    }

    if (validate && required) {
        const reg=/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
      if (reg.test(cValue) && cValue.toString().trim() && cValue.toString().trim().length > 0) {
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('Please Valid Mobile Number');
      }
    } else {
      checkError(false);
      setErrorMsg('');
    }
  };

  return (
    <>
      <TextField fullWidth type="number"
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
        title={"Enter Mobile Number"}
        inputProps={{pattern: "^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"}}
        onChange={change}
        InputLabelProps={{
           shrink: true,
        }}
        disabled={disabled || false}

      />
    </>
  );
}
export default MBMobileNumber