import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

const  AppItemEvents = ({liveEvents}) =>{
  console.log(liveEvents);
  return (
    <RootStyle>
      <IconWrapperStyle>
        {/* <Icon icon={windowsFilled} width={24} height={24} /> */}
        <ShoppingBagIcon />
      </IconWrapperStyle>
      <Typography variant="h3">{liveEvents.filter((i) => i.eventType).length}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Live Events
      </Typography>
    </RootStyle>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
      warehouse: state.Settings.warehouse,
      liveEvents: state.Socket.events || [],
  }
};
export default connect (mapStateToProps)(AppItemEvents)