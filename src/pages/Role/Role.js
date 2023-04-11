import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import RoleList from './RoleList';
import RoleForm from './RoleForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const Role = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');

  useEffect(() => {
    console.log(pageState)
  }, [pageState])

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

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                
              </Stack>
              <RoleForm onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="right" justifyContent="right" mb={5}>
                
                <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  New Roles
                </Button>
              </Stack>
              <RoleList onClick={() => { onClick() }} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.role }
};


export default connect(mapStateToProps)(Role);