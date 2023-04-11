import { Icon } from '@iconify/react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import peopleFill from '@iconify/icons-eva/people-fill';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

const AppFarmers = ({data}) => {
  return (
    <RootStyle>
    <IconWrapperStyle>
      {/* <Icon icon={androidFilled} width={24} height={24} /> */}
      <Icon icon={peopleFill} width={24} height={24} />
    </IconWrapperStyle>
    <Typography variant="h3">{data.farmersCount}</Typography>
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Farmers
    </Typography>
  </RootStyle>
  );
}
export default AppFarmers
