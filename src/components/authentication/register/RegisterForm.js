import { useState } from 'react'

import {Link,useNavigate } from 'react-router-dom'
// material
import { Stack,Box,Typography,TextField, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import MBForm from '../../../FunctionalComponents/MBForm/MBForm'
import MBPassword from '../../../FunctionalComponents/MBPassword/MBPassword'
import MBEmailField from '../../../FunctionalComponents/MBEmailField/MBEmailField'
import MBFormButton from '../../../FunctionalComponents/MBFormButton/MBFormButton'
import MBTextField from '../../../FunctionalComponents/MBTextField/MBTextField'
import axios from 'axios'
import Axios from '../../../Services/API'
import Store from '../../../Store';
import { ReducerTypes, AlertTypes} from '../../../Assets/Constants';


// ----------------------------------------------------------------------

const RegisterForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [valid, setValid] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobileNo, setUserMobileNo] = useState('')
  const [userPassword, setUserPassword] = useState('')
  

  const onSignUp = (e) => {
    e.preventDefault();
    setValid(true);
   let data={"userTypeId_users":3,"name_users":userName,"email_users":userEmail,"mobileNumber_users":userMobileNo,"password_users":userPassword,"isActive_users":1}
    Axios.postData('Registration/', data)
    .then((res) =>{
      console.log(res);
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
            showAlert: true,
            message: `Registred Successfully!`,
            type: AlertTypes.SUCCESS_ALERT_TYPE
        }
    });
    navigate('/login');
    }).catch(err =>{
      console.log(err);
    })
  }

  return (
    <MBForm
      autoComplete='off'
      noValidate
      onSubmit={onSignUp}
    >
      <Stack spacing={3}>
        <MBTextField
          fautoComplete='off'
          name='username'
          error
          fullWidth
          id='username'
          label='User Name'
          value={userName}
          required
          autoFocus
          validate={valid}
          helperText=''
          onChange={e => {
            setUserName(e.target.value)
          }}
        />
        <MBEmailField
          autoComplete='off'
          name='email'
          error
          fullWidth
          id='email'
          label='Email id'
          value={userEmail}
          required
          autoFocus
          validate={valid}
          helperText=''
          onChange={e => {
            setUserEmail(e.target.value)
          }}
        />
        <MBTextField
          fautoComplete='off'
          name='mobilenumber'
          error
          fullWidth
          id='mobilenumber'
          label='Mobile Number'
          value={userMobileNo}
          required
          autoFocus
          validate={valid}
          helperText=''
          onChange={e => {
            setUserMobileNo(e.target.value)
          }}
        />

        <MBTextField
          name='password'
          error
          fullWidth
          id='password'
          label='Password'
          value={userPassword}
          required={false}
          autoFocus
          validate={valid}
          onChange={e => {
            setUserPassword(e.target.value)
          }}
        />
        <MBFormButton
          fullWidth={true}
          size={'large'}
          variant='contained'
          onClick={() => {
            console.log('submit clicked')
            setValid(true)
          }}
          type='submit'
        >
          Register
        </MBFormButton>
        <Box>
          <Typography component="span">
               Already have an account? <Link to='/loginpage'>Sign In</Link>
          </Typography>
                </Box>
      </Stack>
    </MBForm>
  )
}
export default RegisterForm
