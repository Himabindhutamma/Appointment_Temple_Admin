import React, { useState, useEffect } from "react";
import { Stack, Paper,Grid,styled } from "@mui/material";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBDatePicker from "../../FunctionalComponents/MBDatePicker/MBDatePicker";
import { connect } from "react-redux";
import Axios from "../../Services/API";
import MBSelect from "../../FunctionalComponents/MBSelect/MBSelect";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useFileUpload } from 'use-file-upload';
import { AlertTypes, ReducerTypes } from '../../Assets/Constants';
import Store from '../../Store';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));
  const docobj=
    {label:'label',value:'value'}
  const docArray=[
    {label:'PDF',value:'PDF'},
    {label:'TEXT',value:'TEXT'},
    {label:'JPEC',value:'JPEC'}
  ]
const VerificationForm = ({userId,onCancel}) => {
    const [docType,setDocType]=useState('')
    const [valid,setValid]=useState(false)
    const [file, setFile]=useState('')
    const [documentNo,setDocNo]=useState('')
    const [specialisation,setSpecialisation] = useState('')
    console.log("files",file)
     const handleInputChange = e =>{
       setFile(e.target.files[0])
     }
    const verifyDocuments = (e) =>{
      e.preventDefault();
      
      if(file){
        console.log(file)
      let uploadFiles= JSON.stringify({'documentPath_userVerificationDocuments':file.name})
      var formdata=new FormData()
      formdata.append('documentType_userVerificationDocuments',docType);
      formdata.append('userId_userVerificationDocuments',userId);
      formdata.append('isVerified_userVerificationDocuments',0);
      formdata.append('isActive_userVerificationDocuments',1);
      formdata.append('documentPath_userVerificationDocuments',file);
      formdata.append('uploadedFiels',uploadFiles);
      console.log(Object.fromEntries(formdata.entries()))
     
     const config ={
        headers:{
          'Content-Type':'multipart/form-data',
        }
      }
      Axios.postData('Upload_userVerificationDocuments/',formdata,config).then((res)=>{
          console.log(res)
          Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Uploaded Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      onCancel();
      }).catch(err =>{
        console.log(err)
      })
      
    }
    }
  return (
    <>
      <Paper elevation={16}>
        <ContentStyle>
          <MBForm onSubmit={verifyDocuments}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                    <div className='ver-con'>
                      <h2>Doctor Verification</h2>
                      <h6>Please provide the details below and attach copies for your:</h6>
                      </div>
                      <div className='ver-con'>
                      <ul class="verify-list">
                        <li class="verify-item">Certificate of Registration with the Maltese
                                                    Medical Council OR Registration from the appropriate Professional
                                                    Council</li>
                        <li class="verify-item">Certificate of Good Standing (from the Maltese
                                                    Medical Council - valid for 3 months from the date of issue).
                                                    Doctors applying from overseas are to provide a Certificate of Good
                                                    Standing issued from the most recent country of residence / practise
                                                    (valid for 3 months from the date of issue) (only applicable for
                                                    Medical Doctors)</li>
                        <li class="verify-item">Curriculum Vitae</li>
                        <li class="verify-item">Specialist Registration Certificate</li>
                         <li class="verify-item">Digital signature: copy of the signature and
                                                    registration number</li>
                                            </ul>
                      </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                  <MBSelect
                id="docType"
                value={docType}
                name="docType"
                className=""
                required
                label="Document Type"
                key="docType"
                onChange={(e)=>setDocType(e.target.value)}
                obj={docobj}
                data={docArray}
                />
               <MBTextField id='documentNo' className={"mbtxt-width"} name='documentNo' value={documentNo} onChange={(e) => setDocNo(e.target.value)} 
               key="documentNo"  required={false}
               label="Document Number"/>
                <MBTextField id='specialisation' className={"mbtxt-width"} name='specialisation' value={specialisation} onChange={(e) => setSpecialisation(e.target.value)} 
               key="specialisation"  required={false}
               label="Area of Specialisation"/>

            <div className='uploadcontainer'>
            <div class="button-wrap">
              <label class="new-button" for="upload">Upload File</label>
              <input id="upload" type="file" type="file" name="file" accept='.pdf' onChange={handleInputChange}/>
             </div>
            <span>{file ? file.name : 'No file choosen'}</span>
            </div>
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="right" alignItems="right">
              <MBFormButton
                color="error"
                fullWidth={false}
                variant="contained"
                type="button"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  //   onCancel();
                  setValid(false);
                }}
              >
                Cancel
              </MBFormButton>
              <MBFormButton fullWidth={false} variant="contained" type="submit">
                Save
              </MBFormButton>
            </Stack>
          </MBForm>
        </ContentStyle>
      </Paper>
    </>
  );
};
const mapStateToProps = (state)=>{
  return {
    userId:state.User.userId_users
  }
}
export default connect(mapStateToProps)(VerificationForm);
