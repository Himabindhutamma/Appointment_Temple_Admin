import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import DoctorsList from './DoctorsList';
import DoctorsForm from './DoctorsForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Axios from '../../Services/API'; 
const Doctors = ({ role,userId }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [editData, setEditData] = useState();
  const [adminData,setAdminData] = useState([]);

  useEffect(()=>{
    getAdminList();
  },[userId])
  useEffect(() => {
    console.log(pageState)
  }, [pageState])

  const getAdminList = () =>{
    let data ={
      "userId_userInformation":userId
    }
    Axios.postData('SelectConditionWithParent_userInformation',data)
        .then(res=>{
          console.log(res);
            setAdminData(res.Message);
          }) 
        .catch(err =>{
          console.log(err);
        })
}
  const onSubmit = () => {
    setPageState('VIEW');
  }

  const onCancel = () => {
    setPageState('VIEW');
  }

  const onEdit = () => {
    setPageState('UPDATE');
  }
  const onClick = () => {
    setPageState('ADD');
  }
  const onAction = (e) =>{
    console.log(e);
    setEditData(e.item)
    setPageState('UPDATE');

  }

  return (
    <>
      <Page title="Doctors">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Doctors
                </Typography>
              </Stack>
              <DoctorsForm editData={editData} onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                 
                </Typography>
                {!adminData.length > 0 && <Button className='adding-btn-1'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add Details
                </Button> }
                
              </Stack>
              <DoctorsList adminData={adminData} onAction={onAction} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { 
    role: state.User.roleId_users,
    userId:state.User.userId_users
  }
};


export default connect(mapStateToProps)(Doctors); 