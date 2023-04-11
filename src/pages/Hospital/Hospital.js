import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import HospitalList from './HospitalList';
import HospitalForm from './HospitalForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const Hospital = ({ role }) => {

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
              <HospitalForm editData={rowData} onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
               <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add Clinic
                </Button>
              </Stack>
              <HospitalList onAction={onAction} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.roleId_users }
};


export default connect(mapStateToProps)(Hospital); 