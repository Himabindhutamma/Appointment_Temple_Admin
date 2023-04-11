import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import UserTypeList from './UserTypeList';
import UserTypeForm from './UserTypeForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
const UserType = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [userTypedata, setUserTypeData] = useState(null);

  useEffect(() => {
    console.log(pageState)
  }, [pageState])

  const onSubmit = () => {
    setPageState('VIEW');
  }

  const onCancel = () => {
    setPageState('VIEW');
  }

  const onClick = (e) => {
    console.log(e.item)
    if(e.action === 'Edit'){
      setUserTypeData(e.item);
      setPageState('UPDATE');
    }else{
      setUserTypeData(null);
      setPageState('ADD');
    }
   }

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              
              <UserTypeForm editRecord={userTypedata} onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="right" mb={5}>
                <Button className='adding-btn'

                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  New UserType
                </Button>
              </Stack>
              <UserTypeList onAction={onClick}/>
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.role }
};


export default connect(mapStateToProps)(UserType);