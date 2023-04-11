import React, { useState, useEffect } from "react";
import { Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import MBDatePicker from "../../FunctionalComponents/MBDatePicker/MBDatePicker";
import { connect } from "react-redux";
import Axios from "../../Services/API";
import MBSelect from "../../FunctionalComponents/MBSelect/MBSelect";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useFileUpload } from 'use-file-upload'
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
const Verification = () => {
    const [docType,setDocType]=useState('')
    const [valid,setValid]=useState(false)
    const [files, selectFiles] = useFileUpload()
  return (
    <>
      <Paper elevation={16}>
        <ContentStyle>
          <MBForm onSubmit={Verification}>
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
           <input type='file'
            name='file'
            required
            
            
            />
             {/* <CloudUploadOutlinedIcon onClick={() =>
                              selectFiles(
                                { accept: 'text/*' },
                                ({ name, size, source, file }) => {
                                  //   let setdata = {name, size, source, file}
                                  //   setProfile(setdata);
                                }
                              )
                            }/> */}


            {/* <MBTextField
              id="appointmentNumber"
              name="appointmentNumber"
              value={bookingData.appointmentNumber}
              onChange={bookinggDataChange}
              className={"mbtxt-width"}
              label="Appointment Number"
              required
              validate={valid}
            />
            <MBTextField
              id="appointmentName"
              name="appointmentName"
              value={bookingData.appointmentName}
              onChange={bookinggDataChange}
              className={"mbtxt-width"}
              label="Appointment Name"
              required
              validate={valid}
            />
            <MBTextField
              id="description"
              name="description"
              value={bookingData.description}
              onChange={bookinggDataChange}
              className={"mbtxt-width"}
              label="Description"
              required
              validate={valid}
            /> */}
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
                submit
              </MBFormButton>
            </Stack>
          </MBForm>
        </ContentStyle>
      </Paper>
    </>
  );
};
export default Verification;
