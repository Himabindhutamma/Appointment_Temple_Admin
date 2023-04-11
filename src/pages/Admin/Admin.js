import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import AdminList from './AdminList';
import AdminForm from './AdminForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const Admin = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [editRecord, setEditRecord] = useState('')

  useEffect(() => {
    console.log(pageState)
  }, [pageState])

  const onSubmit = () => {
    setPageState('VIEW');
  }

  const onCancel = () => {
    setPageState('VIEW');
  }

  const onAction = (e) => {
    console.log(e)
    if(e.action === 'Edit'){
      setPageState('UPDATE');
      setEditRecord(e.item);
    }else if(e.action === "ADD"){
      setPageState('ADD');
    }else{
      setPageState('VIEW');
    }
   
  }
  const onClick = () => {
    setPageState('ADD');
  }

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <AdminForm onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
               <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add User
                </Button>
              </Stack>
              <AdminList editRecord={editRecord} onAction={onAction} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.roleId_users }
};


export default connect(mapStateToProps)(Admin); 