import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button,Box } from '@mui/material';
import DepartmentList from './DepartmentList';
import DepartmentForm from './DepartmentForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const Department = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [editRecord, setEditRecord] = useState(null);

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
  const onClick = (e) => {
    if(e.action === 'Edit'){
      setEditRecord(e.item)
      setPageState('UPDATE');
    }
    else{
      setEditRecord(null)
      setPageState('ADD');
    }
    
  }

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                
              </Stack>
              <DepartmentForm  editRecord={editRecord} onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
                
                <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  New Department
                </Button>
              </Stack>
              <DepartmentList onAction={onClick} />
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.role }
};


export default connect(mapStateToProps)(Department);