import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line import/no-unresolved
import { connect } from 'react-redux';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Store from '../../Store';

const CustomAlert = ({ timeOut, alertType, alertMessage, showAlert }) => {
  let timeOutAction;
  if (timeOut && showAlert) {
    timeOutAction = setTimeout(() => {
      Store.dispatch({ type: 'HIDE_ALERT' });
    }, timeOut);
  } else if (timeOutAction) {
    clearTimeout(timeOutAction);
  }
  return (
    <>
      {showAlert ? (
        <Stack sx={{ width: '100%', position: 'fixed', zIndex: '9999' }} spacing={2}>
          {/* severity has 4 types 1.error 2.warning 3.info 4.success */}
          <Alert
            variant="filled"
            severity={alertType}
            onClose={() => {
              Store.dispatch({ type: 'HIDE_ALERT' });
            }}
          >
            {alertMessage}
          </Alert>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state.Settings
});
export default connect(mapStateToProps)(CustomAlert);
