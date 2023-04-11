import React from 'react';
import { Box,Grid,Paper,Typography } from '@mui/material';
import RegisterForm from '../components/authentication/register/RegisterForm';


const Registeration = () =>{
    return(
        <>
        <Box className='login-page1'>
            <Box className='loginp'>
              <Box className='temp-of-login'>
                <Grid container spacing={1} className='temp-of-grid'>
                    <Grid xs={11} sm={9} md={5} lg={4} xl={3}>
                       <Paper className='temp-of-paper'>
                            <Box className='temp-of-box'>
                                <Typography variant={'h4'}>
                                    Sign Up
                                </Typography>
                                <Grid container spacing={3} className='temp-container'>

                                </Grid>
                            </Box>
                            <Box className='temp-of-form'>
                              <RegisterForm/>
                            </Box>
                        </Paper> 
                    </Grid>
                </Grid>     
             </Box>  
            </Box>
          </Box>
        </>
    )
}
export default Registeration