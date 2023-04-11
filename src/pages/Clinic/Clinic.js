import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import ClinicList from './ClinicList';
import ClinicForm from './ClinicForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const Clinic = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [rowData, setRowData] = useState({});

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
  const onAction = (e)=>{
    console.log(e)
    if(e.action === 'Edit' ){
      setPageState('UPDATE');
      setRowData(e.item)

    }
  }

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <ClinicForm editData={rowData} onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
               <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add Clinic / Hospital
                </Button>
              </Stack>
              <ClinicList onAction={onAction} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.roleId_users }
};


export default connect(mapStateToProps)(Clinic); 