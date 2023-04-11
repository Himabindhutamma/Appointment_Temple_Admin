import React from 'react';
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MBFormButton from "../MBFormButton/MBFormButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {Stack} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import NewMBMultiSelect from "./NewMBMultiSelect";
import './style.css';

export default (({options, defaultSelections, title, onChange, required, validate, keys}) => {

    const [popup, setPopup] = React.useState(false);
    const [valid, setValid] = React.useState(false);
    const [value, setValue] = React.useState(defaultSelections || []);
    const [dialogValue, setDialogValue] = React.useState([]);

    const handleChange = (e) => {
        console.log(e);
        setDialogValue(e);
    }

    React.useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value])

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
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <FormControl>
                    <Typography variant="body1">
                        {title}
                    </Typography>
                </FormControl>
                <MBFormButton type="button"
                              variant="outlined"
                              onClick={() => {
                                  setDialogValue(value);
                                  setPopup(true);
                              }}
                              fullWidth={false}>
                    {value.length > 0 ?
                        <ModeEditOutlineOutlinedIcon/>
                        :
                        <AddOutlinedIcon/>
                    }
                    {title}</MBFormButton>
            </Stack>
            <Grid container spacing={2} className={'cardList'}>
                {value.map((i, j) => {
                    return (
                        <Grid item>
                            <div className={'card'}>
                                {showValue(i,keys.label)}
                                {/*{keys.label.indexOf(',') > -1 ?*/}

                                {/*    i[keys.label.split(',')[0]] - i[keys.label.split(',')[1]]*/}
                                {/*    :*/}
                                {/*    i[keys.label]*/}
                                {/*}*/}
                            </div>
                        </Grid>
                    )
                })}

                {validate && required && value.length <= 0 && <Grid item xs={12} sx={{color:'red'}}> `Please select fields`</Grid>}
            </Grid>
            <Dialog open={popup} onClose={() => {
                setPopup(false)
            }} fullWidth>
                <div>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <NewMBMultiSelect keys={keys} value={dialogValue} list={options} onChange={handleChange}
                                          required={true} validate={valid}/>
                    </DialogContent>
                    <DialogActions>
                        <MBFormButton color="error" type={'cancel'} variant="contained" onClick={() => {
                            setPopup(false);
                            setValid(false);
                        }}>
                            Cancel
                        </MBFormButton>
                        <MBFormButton variant="contained" onClick={() => {
                            setValid(true);
                            if (dialogValue.length > 0) {
                                setValue(dialogValue);
                                setPopup(false);
                                setValid(false);
                            }
                        }}>Submit</MBFormButton>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
})
