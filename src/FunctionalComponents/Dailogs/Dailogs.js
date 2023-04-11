
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MBFormButton from '../MBFormButton/MBFormButton';

const Dialogs = ({ handleClose, children, open,content,title,classname,handleSubmit }) => {

    console.log(children);
    // const save = (e) =>{
    //     handleSubmit();
    // }

    return (
        <div>
         <Dialog open={open} fullWidth maxWidth={'md'} onClose={handleClose}>
                <DialogTitle className={classname}>{title}</DialogTitle>
                <DialogContent sx={{marginTop:'10px'}}>
                    {content}
                    
                </DialogContent>
                {/* <DialogActions>
                  <MBFormButton onClick={handleClose} color={'error'} variant={"contained"} type="button">Cancel</MBFormButton>
                  <MBFormButton onClick={save} variant={"contained"} type="button">Save</MBFormButton>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
export default Dialogs

