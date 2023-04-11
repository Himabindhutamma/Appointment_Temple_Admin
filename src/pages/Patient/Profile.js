import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router";
import { Paper , Grid,Divider} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Axios from '../../Services/API';
import {connect} from "react-redux"

const Profile = ({userId}) => {
    console.log(userId)
   const [profileData,setProfileData]=useState([])
   const[editData,setEditData]=useState({})
   useEffect(()=>{
    getProfileData();
   },[userId])
    const navigate=useNavigate()
    const getProfileData=()=>{
        let data={
            "userId_userInformation":userId
        }
        Axios.postData('SelectConditionWithParent_userInformation',data).then((res)=>{
            console.log(res);
            setProfileData(res.Message)
            setEditData(res.Message[0])
        })
    }
  return (
    
    <>
      <Paper elevation={8}>
        <h1 style={{ textAlign: "center" }}> PROFILE</h1>
        <Card sx={{ maxWidth: "100%" }}>
          <CardMedia className="profile-img"
            component="img"
            alt="img"

           
            image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          />
<CardContent>
          {profileData.map((i, j) => {
            return (
              <>
                 <Grid container spacing={2}>
                  
                    <Grid item xs={12} md={5} lg={5}>
                  <h1 style={{textAlign:"center"}}>{i.fullName_userInformation}</h1>
                  <Stack direction="row" spacing={3} style={{justifyContent:"center"}} >  <h4>{i.email_users}</h4> </Stack>
                  <Stack direction="row" spacing ={3} style={{justifyContent:"center"}} > <h3>Appointments</h3></Stack>
                  <Stack direction="row" spacing={10} style={{justifyContent:"center",marginTop:"30px"}}  >
                 
                   <Stack direction="column" spacing={2}><h3 style={{textAlign:"center"}}>5</h3><h3> Past</h3> </Stack>
                   <hr/> 
                   <Stack direction="column" spacing={2}><h3 style={{textAlign:"center"}}>5</h3><h3> Upcoming</h3> </Stack> 
                  </Stack>
                  </Grid>
                 <Grid item xs={12} md={7} lg={7}> 
                 <Stack direction="row" spacing={20}>
                 <Stack direction="column" spacing={2}> <h3>Gender </h3> <h3>{i.gender_userInformation}</h3> </Stack>
                 <Stack direction="column" spacing={2}> <h3>DOB </h3> <h3>09-05-1998</h3> </Stack>
                 </Stack>
                 <Stack direction="row" spacing={20} sx={{mt:5}}>
                 <Stack direction="column" spacing={2} > <h3>Mobile </h3> <h3>{i.mobileNumber_users}</h3> </Stack>
                 <Stack direction="column" spacing={2}> <h3>Address </h3> <h3>Nellore</h3> </Stack>
                 </Stack>
                 <Stack direction="row" spacing={20} sx={{mt:5}}>
                 <Stack direction="column" spacing={2} > <h3>City </h3> <h3>{i.city_userInformation}</h3> </Stack>
                 <Stack direction="column" spacing={2}> <h3>ZIP Code </h3> <h3>524405</h3> </Stack>
                 </Stack>
                  </Grid>
                 {/* <Grid item xs={12} md={4} lg={4}><Stack direction="row" spacing={3}> <h3>Mobile: </h3> <h3>{i.mobileNumber_users}</h3> </Stack></Grid>
                 <Grid item xs={12} md={8} lg={8}>  <Stack direction="row" spacing={3}> <h3>Email: </h3> <h3>{i.email_users}</h3> </Stack></Grid>
                 <Grid item xs={12} md={4} lg={4}> <Stack direction="row" spacing={3}> <h3>Gender: </h3> <h3>{i.gender_userInformation}</h3> </Stack></Grid>
                 <Grid item xs={12} md={8} lg={8}> <Stack direction="row" spacing={3}> <h3>Age: </h3> <h3>{i.age_userInformation}</h3> </Stack></Grid>
                 <Grid item xs={12} md={4} lg={4}>  <Stack direction="row" spacing={3}> <h3>City: </h3> <h3>{i.city_userInformation}</h3> </Stack></Grid>
                 <Grid item xs={12} md={8} lg={8}> <Stack direction="row" spacing={3}> <h3>State: </h3> <h3>{i.state_userInformation}</h3> </Stack></Grid>
                 <Grid item xs={12} md={4} lg={4}> <Stack direction="row" spacing={3}> <h3>Country: </h3> <h3>{i.country_userInformation}</h3> </Stack></Grid>
                 */}
                 </Grid>
              </>
            );
          })}
           </CardContent>

          <Button onClick={()=>{navigate('/dashboard/patientprofilesettings',{state:editData})}}
            variant="contained"
            size="medium"
            style={{ float: "right", margin: "10px" }}
          >
            Edit Profile
          </Button>
        </Card>
      </Paper>
    </>
  );
};
const mapStateToProps=(state)=>{
    console.log(state)
    return{
        userId:state.User.userId_users
    }
}
export default connect(mapStateToProps)(Profile)
