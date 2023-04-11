import React,{ useState } from 'react';
import Paper from '@mui/material/Paper';
import { Stack,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBTextField from "../../FunctionalComponents/MBTextField/MBTextField";
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton';

const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 580,
    padding:'25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: theme.spacing(12, 0),
   
  }));


const SocialLinks = ({onCancel}) =>{
    const [valid, setValid]=useState(false)
    const [allLinks, setAllLinks] =useState({
        facebookURL:'',twitterURL:'',instagramURL:'',pintrestURL:'',linkedinURL:'',youtubeURL:''
    })
    console.log(allLinks.facebookURL);
    const linkChange = (e) =>{
        setAllLinks({...allLinks, [e.target.name]:e.target.value})
    }
    const saveLinks = (e) =>{
        e.preventDefault();
        console.log("saved")
    }
    return(
        <>
        <Paper elevation={16}>
        <ContentStyle>
            <MBForm onSubmit={saveLinks}>
                <MBTextField
                  className={"mbtxt-width"}
                  id={"facebookURL"}
                  name={"facebookURL"}
                  value={allLinks.facebookURL}
                  key={"facebookURL"}
                  label={"Facebook URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
                />
                 <MBTextField
                  className={"mbtxt-width"}
                  id={"twitterURL"}
                  name={"twitterURL"}
                  value={allLinks.twitterURL}
                  key={"twitterURL"}
                  label={"Twitter URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"instagramURL"}
                  name={"instagramURL"}
                  value={allLinks.instagramURL}
                  key={"instagramURL"}
                  label={"Instagram URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"pintrestURL"}
                  name={"pintrestURL"}
                  value={allLinks.pintrestURL}
                  key={"pintrestURL"}
                  label={"Pintrest URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"linkedinURL"}
                  name={"linkedinURL"}
                  value={allLinks.linkedinURL}
                  key={"linkedinURL"}
                  label={"Linkedin URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
                />
                <MBTextField
                  className={"mbtxt-width"}
                  id={"youtubeURL"}
                  name={"youtubeURL"}
                  value={allLinks.youtubeURL}
                  key={"youtubeURL"}
                  label={"Youtube URL"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={linkChange}
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
export default SocialLinks