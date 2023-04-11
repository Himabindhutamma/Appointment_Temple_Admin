import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../../Services/API';
import MBTextField from '../../../FunctionalComponents/MBTextField/MBTextField';
// material
import {
    Stack,Paper,Grid,
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

 const ForgotPassword=({ })=> {
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
        <Box className='login-page1'>
            <Box className='loginp'>
              <Box className='temp-of-login'>
                <Grid container spacing={1} className='temp-of-grid'>
                    <Grid xs={11} sm={9} md={5} lg={4} xl={3}>
                       <Paper className='temp-of-paper'>
                            <Box className='temp-of-box'>
                                <Typography variant={'h4'}>
                                    ForgotPassword
                                </Typography>
                                <Grid container spacing={3} className='temp-container'>

                                </Grid>
                            </Box>
                            <Box className='temp-of-form'>
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



                </Stack>
             <MBFormButton fullWidth={true} variant="contained" sx={{mt:2}}
                    onClick={() => {
                        console.log('submit clicked');
                        setTimeout(()=>{
                            setValid(true);
                        },100)
                        
                    }}
                    type="submit" size="large"
                >
                    Continue
                </MBFormButton>
                <Box style={{marginTop:'17px'}}>
                    <Typography component="span">
                            Back to <Link to='/loginpage'>Login</Link>
                    </Typography>
                </Box>
            </MBForm>
                            </Box>
                        </Paper> 
                    </Grid>
                </Grid>     
             </Box>  
            </Box>
          </Box>
          
        </>
    );
}
export default ForgotPassword;