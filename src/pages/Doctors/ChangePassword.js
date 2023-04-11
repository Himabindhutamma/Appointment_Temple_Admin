import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import { Stack,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBPassword from "../../FunctionalComponents/MBPassword/MBPassword";
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';
import { connect } from 'react-redux';
import  Axios  from '../../Services/API';
import Store from '../../Store';
import { ReducerTypes, AlertTypes} from '../../Assets/Constants';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));

const ChangePassword = ({onCancel,userId})=>{
  console.log(userId);
 const [valid, setValid]=useState(false)
    const [allFields, setAllFields] =useState({
        oldPwd:'',newPwd:'',confPwd:''
    })
    const fieldChange = (e) =>{
        setAllFields({...allFields, [e.target.name]:e.target.value})
    }
    const savePassword = (e) =>{
        e.preventDefault();
        console.log("saved")
        let data={

          "userId_users":userId&&userId,
          "password_users":allFields.newPwd
        }
        Axios.postData('UpdatePassword/',data).then((res)=>{
          console.log(res);
          Store.dispatch({
            type: ReducerTypes.SHOW_ALERT.toString(),
            payload: {
                showAlert: true,
                message: `Password Changed Successfully!`,
                type: AlertTypes.SUCCESS_ALERT_TYPE
            }
        });
        setAllFields({newPwd:"",oldPwd:"",confPwd:""})
        })
    }
    return(
        <>
        <Paper elevation={16}>
        <ContentStyle>
            <MBForm onSubmit={savePassword}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"oldPwd"}
                  name={"oldPwd"}
                  value={allFields.oldPwd}
                  key={"oldPwd"}
                  label={"Old Password"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={fieldChange}
                />
                <MBPassword
                  className={"mbtxt-width"}
                  id={"newPwd"}
                  name={"newPwd"}
                  value={allFields.newPwd}
                  key={"newPwd"}
                  label={"New Password"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={fieldChange}
                />
                 <MBPassword
                  className={"mbtxt-width"}
                  id={"confPwd"}
                  name={"confPwd"}
                  value={allFields.confPwd}
                  key={"confPwd"}
                  label={"Confirm Password"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={fieldChange}
                />
                
             <Stack direction="row" alignItems="right" justifyContent="right" sx={{ my: 2 }}>
              <MBFormButton fullWidth={false} color="error" variant='contained' style = {{marginRight: '5px'}} onClick={() => {  
                  onCancel();
                  setValid(false);
                }} type={"button"}>Cancel</MBFormButton>
                <MBFormButton type="submit" fullWidth={false} variant='contained'>
                  Save
                </MBFormButton>
                </Stack>
            </MBForm>
        </ContentStyle>
        </Paper>
        </>
    )
}
const mapStateToProps=(state)=>{
  console.log(state)
  return{
    userId:state.User.userId_users
  }
}
export default connect(mapStateToProps)(ChangePassword)






