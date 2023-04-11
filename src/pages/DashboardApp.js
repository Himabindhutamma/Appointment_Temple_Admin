import React, { useState,useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// import {
//   AppItemOrders,
//   AppWeeklySales,
// } from '../components/_dashboard/app';
import AppItemEvents from '../components/_dashboard/app/AppItemEvents';
import AppFarmers from '../components/_dashboard/app/AppFarmers';
import AppWorkers from '../components/_dashboard/app/AppWorkers';
import AppTotalBags from '../components/_dashboard/app/AppTotalBags';
import { connect } from 'react-redux';
import axios from 'axios';

// ----------------------------------------------------------------------
 
const DashboardApp = ({warehouse}) => {
  console.log("common Details.....", warehouse);
  const [data, setData] = useState({});

 return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <AppFarmers data={data}/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppWorkers  data={data}/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppTotalBags data={data}/>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppItemEvents data={data}/>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={5}> 
            <EmployeeStatus />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={6}>
            <DashboardEventList />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={6}>
            <DashboardReadrHistoryList />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
const mapStateToProps =(state)=>{
  return { warehouse:state.Settings.warehouse}
}
export default connect (mapStateToProps)(DashboardApp)
