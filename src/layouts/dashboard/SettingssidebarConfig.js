import { Icon } from '@iconify/react';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BiotechIcon from '@mui/icons-material/Biotech';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SettingssidebarConfig = [


  
  {
    title:'units',
    path:'/settings/units',
    icon: <AdUnitsIcon />
  },
  {
    title:'commodity',
    path:'/settings/commodity',
    icon: <AutoAwesomeMotionIcon />
  },
  {
    title:'technology',
    path:'/settings/technology',
    icon: <BiotechIcon />
  },
  {
    title:'TagType', 
    path:'/settings/tagtype',
    icon: <BiotechIcon />
  },

  
  {
    title:'roles',
    path:'/settings/roles',
    icon: <GroupWorkIcon />
  },

 
 
];

export default SettingssidebarConfig;
