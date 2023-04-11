import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import React, {useState, useEffect} from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

const AppWorkers = ({staffstatus,data}) => { 
  let navigate = useNavigate();
    console.log(staffstatus);
  return (
    <RootStyle onClick={() => {
      navigate('/dashboard/staff')
  }}>
      <IconWrapperStyle>
         {/* <Icon icon={appleFilled} width={24} height={24} />  */}
         <EngineeringIcon />
      </IconWrapperStyle>
      <Typography variant="h3">{data.employeesCount + data.warehouseAdminCount}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          (IN : {staffstatus.filter((i) => i.status === 'IN').length}) Worker (OUT : {staffstatus.filter((i) => i.status === 'OUT').length})
      </Typography>
      </RootStyle>
  );
}
const mapStateToProps = (state) => {
  return {
      staffstatus: state.Socket.staffStatus || []
  }
};
export default connect(mapStateToProps)(AppWorkers)
