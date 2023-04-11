import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import AdminsidebarConfig from './AdminSidebarConfig';
import DoctorsAdminSidebarConfig from './DoctorsAdminSidebarConfig';
import account from '../../_mocks_/account';
import { connect } from 'react-redux';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Basic } from '../../Assets/Constants';
import { ReducerTypes } from '../../Assets/Constants';
import Store from '../../Store';
import PatientSidebarCongfig from './PatientSidebarConfig';




// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function DashboardSidebar({ isOpenSidebar, onCloseSidebar,role,showSetting , username,userType }) {
  console.log(showSetting,userType);
  const { pathname } = useLocation();
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        overflow:'auto',
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          {/* <Logo /> */}
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        { showSetting ? 
        <Link underline="none" component={RouterLink} to="/dashboard/app">
        <AccountStyle>
          <ArrowBackOutlinedIcon onClick={() =>{
            Store.dispatch({type:ReducerTypes.SETTINGS_STATUS,payload:false})
          }}/>
          <Box sx={{ ml: 2 }}>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Dashboard
            </Typography>
          </Box>
        </AccountStyle>
      </Link>
      :
      <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                { username }
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
        }
        
      </Box>

     {userType === 1 ? <NavSection navConfig={AdminsidebarConfig}/> :
       userType === 4 && <NavSection navConfig={DoctorsAdminSidebarConfig}/>
      }
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
const mapStateToProps = (state) => ({
  userType: state.User.userTypeId_users,
  showSetting:state.Settings.showSetting,
  username: state.User.name_users,

});
export default connect(mapStateToProps)(DashboardSidebar)