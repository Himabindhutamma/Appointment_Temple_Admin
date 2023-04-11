import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../../Services/API';
import MBTextField from '../../../FunctionalComponents/MBTextField/MBTextField';
// material
import {
    Stack,
    Checkbox,Box,Typography,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Store from '../../../Store';
import { AlertTypes, ReducerTypes } from '../../../Assets/Constants';
import MBForm from '../../../FunctionalComponents/MBForm/MBForm';
import MBPassword from '../../../FunctionalComponents/MBPassword/MBPassword';
import MBEmailField from '../../../FunctionalComponents/MBEmailField/MBEmailField';
import MBFormButton from '../../../FunctionalComponents/MBFormButton/MBFormButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
// ----------------------------------------------------------------------

 const LoginForm=({ })=> {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [valid, setValid] = useState(false); 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const submitForm = (e) => {
        e.preventDefault();
        setValid(true);
        let data = { "email_users": userName, "password_users": password}
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        console.log(data);
        Axios.postData('Login', data, {
            headers:headers
          })
            .then(res => {
                console.log(res.Message);

                    Store.dispatch({ type: 'LOGIN', payload:res.Message })

                Store.dispatch({
                    type: ReducerTypes.SHOW_ALERT.toString(),
                    payload: {
                        showAlert: true,
                        message: `Logged in Successfully!`,
                        type: AlertTypes.SUCCESS_ALERT_TYPE
                    }
                });
                setPassword("")
               })
    } 

    return (
        <>
            <MBForm
                autoComplete="off"
                onSubmit={submitForm}
            >
                <Stack spacing={3}>
                    <MBEmailField
                        autoComplete="off"
                        name="email"
                        fullWidth
                        id="email"
                        label="Email id"
                        value={userName}
                        required={true}
                        autoFocus
                        validate={valid}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />


                    {/* <input type={"password"} value={password} name='password' pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$' label="password" required onChange={(e) => setPassword(e.target.value)} /> */}

                    <MBPassword error autoComplete="off"
                        name="password"
                        id="password"
                        label="Password"
            
                      
                        value={password}
                        autoFocus
                        required={false}
                        validate={valid}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                    <Link variant="subtitle2" to="/forgotpassword">
                        Forgot password?
                    </Link>
                </Stack>

                <MBFormButton fullWidth={true} variant="contained"
                    onClick={() => {
                        console.log('submit clicked');
                        setTimeout(()=>{
                            setValid(true);
                        },100)
                        
                    }}
                    type="submit" size="large"
                >
                    Login
                </MBFormButton>
                <Stack direction='row' style={{marginTop:'20px'}}>
                <MBFormButton style={{marginRight:'15px'}}
                startIcon={<FacebookIcon/>}
                  variant={'outlined'}
                  type='submit'
                  onClick={() => {
                    console.log('Button Clicked');
                  navigate('https://www.facebook.com/')
                  }}
                  fullWidth={true}
                >
                  Facebook
                </MBFormButton>
                <MBFormButton
                  variant={'outlined'}
                  startIcon={<EmailIcon />}
                  type='submit'
                  onClick={() => {
                    console.log('Button Clicked');
                    navigate('http://www.gmail.com')
                  }}
                  fullWidth={true}
                >
                  Gmail
                </MBFormButton>
                </Stack>
                <Box style={{marginTop:'17px'}}>
                    <Typography component="span">
                            Don't have an account? <Link to='/register'>Sign Up</Link>
                    </Typography>
                </Box>
            </MBForm>
        </>
    );
}
export default LoginForm;