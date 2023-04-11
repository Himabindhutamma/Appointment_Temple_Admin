import React from 'react';
import { connect } from 'react-redux';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

function Index({ show }) {
  if (show) {
    return (
      <Stack sx={{ width: '100%', position: 'fixed', zIndex: '9999' }} spacing={2}>
        <LinearProgress style={{color:'rgba(9,9,121,1)'}} />
      </Stack>
    );
  }

  return <></>; 
}
const mapStateToProps = (state) => ({
  show: state.Settings.showLoader
});
export default connect(mapStateToProps)(Index);
