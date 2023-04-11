import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import { ReducerTypes,Basic } from '../../Assets/Constants';
import Store from '../../Store';
import { connect } from 'react-redux';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '#'
  },

];

// ----------------------------------------------------------------------

function AccountPopover({ role , username , email }) {
  console.log(username,email,role );
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {role}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        {
          role === Basic.SUPER_SUPER_ADMIN_ROLE ?
            <MenuItem
              key={"Settings"}
              to={'/settings/units'}
              component={RouterLink}
              onClick={handleClose}

              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={settings2Fill}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24
                }}
              />

              Settings
            </MenuItem>
            :
            <>
              {
                MENU_OPTIONS.map((option) => {
                  return (
                    <MenuItem
                      key={option.label}
                      to={option.linkTo}
                      component={RouterLink}
                      onClick={handleClose}

                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      <Box
                        component={Icon}
                        icon={option.icon}
                        sx={{
                          mr: 2,
                          width: 24,
                          height: 24
                        }}
                      />

                      {option.label}
                    </MenuItem>
                  )
                })
              }
            </>
        }
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              Store.dispatch({ type: ReducerTypes.LOGOUT });
            }}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
const mapStateToProps = (state) => ({
  role: state.User.roleId_users,
  username: state.User.name_users,
  email:state.User.email_users
});
export default connect(mapStateToProps)(AccountPopover)

