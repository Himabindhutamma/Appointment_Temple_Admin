import React, { useState } from 'react';
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material'
import { TextField, Grid, Typography } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles'
import MBForm from 'src/FunctionalComponents/MBForm/MBForm';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding: '25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
    // padding: theme.spacing(12, 0),
}))
const Section = () => {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const [open, setOpen] = useState(false)
    const [inputFields, setInputFields] = useState([
        {  firstName: '', lastName: '' },
      ]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
      };
    
      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
         
            i[event.target.name] = event.target.value
          
          return i;
        })
        
        setInputFields(newInputFields);
      }
    
      const handleAddFields = () => {
        setInputFields([...inputFields, {  firstName: '', lastName: '' }])
      }
    

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    

    return (
        <Paper elevation={16}>
            <ContentStyle>
                <MBForm  onSubmit={handleSubmit}>
      
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <Box
                                component="form"
                                sx={{
                                    margin: 'auto',
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}

                                autoComplete="off"
                            >
                                <Grid container>
                                    <DesktopDatePicker
                                        label="From Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DesktopDatePicker
                                        label="To Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                                { inputFields.map(inputField => (
          <div key={inputField.id}>
                                <Grid container>
                                <TimePicker
                                    label="From Time"
                                    value={value}
                                    onChange={handleChangeInput}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="To Time"
                                    value={value}
                                    onChange={handleChangeInput}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <Box mt={2} className='bottom-login'>
                              
                                    <MBFormButton  onClick={handleAddFields}>                                              
                                           <AddIcon />   
                                            </MBFormButton>    
                                            
                               </Box>
                               </Grid>
                                </div>
                    )) }                                 

                            </Box>
                        </Stack>
                    </LocalizationProvider>
                   

                </MBForm>
            </ContentStyle>
        </Paper>
    );
}
export default Section;