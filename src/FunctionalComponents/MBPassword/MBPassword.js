import React, { useEffect, useState } from 'react';
import { TextField,Button } from '@mui/material';
import { Basic } from '../../Assets/Constants';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

const MBPassword = ({ className, id, value, name,key, onChange, label, required, validate }) => {
  const [pwd, setPwd] = useState(value || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, checkError] = useState(false);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    setPwd(value);
  }, [value])


  useEffect(
    (e) => {
      console.log(pwd, validate, required);
      if (validate && required) {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (reg.test(pwd) === false) {
          checkError(true);
          setErrorMsg('Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters');
        }
        else {
          checkError(false);
          setErrorMsg('');
        }
      }
      else {
        checkError(false);
        setErrorMsg('');
      }
    },
    [value, validate]
  );

  const change = (e) => {
    e.preventDefault();
    setPwd(e.target.value);
    if (onChange) {
      onChange(e);
      console.log(e.target.value);
    }
    if (validate && required) {
      const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (reg.test(pwd) === false) {
        checkError(true);
        setErrorMsg('Minimum eight characters, at least one letter, one number and one special character');
      }
      else {
        checkError(false);
        setErrorMsg('');
      }

    }
    else {
      checkError(false);
      setErrorMsg('');
    }

  };
  return (
    <>
      <TextField
      type={visible ? 'text' : 'password'}
      className={className || ''}
      value={pwd}
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
      inputProps={{minLength:8, pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button onClick={()=>{setVisible(!visible)}}>
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>
          </InputAdornment>
        )
      }}

      />
    </>
  );
};
export default MBPassword;
