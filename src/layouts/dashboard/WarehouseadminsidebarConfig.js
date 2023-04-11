import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WifiIcon from '@mui/icons-material/Wifi';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HikingIcon from '@mui/icons-material/Hiking';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import StyleIcon from '@mui/icons-material/Style';
import EngineeringIcon from '@mui/icons-material/Engineering';
import StorageIcon from '@mui/icons-material/Storage';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';



// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const WarehouseAdminsidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
},

{
    title: 'company',
    path: '/dashboard/company',
    icon: <LocationCityIcon/>
},
{
    title: 'company admin',
    path: '/dashboard/cadmin',
    icon: <SupervisorAccountIcon/>
},
{
    title: 'warehouse',
    path: '/dashboard/warehouse',
    icon: <WarehouseIcon/>
},

{
    title: 'khana',
    path: '/dashboard/khana',
    icon: <WarehouseIcon/>
},
{
    title: 'tags',
    path: '/dashboard/tags',
    icon: <StyleIcon/>
},
{
    title: 'worker',
    path: '/dashboard/worker',
    icon: <EngineeringIcon/>
},
{
    title: 'farmer',
    path: '/dashboard/farmer',
    icon: <GroupsRoundedIcon/>
},

{
    title: 'inventry',
    path: '/dashboard/inventry',
    icon: <LibraryBooksIcon/>
},

{
    title: 'Transactions',
    path: '/dashboard/commoditytransactions',
    icon: <SwapHorizIcon/>
},
{
    title: 'Events',
    path: '/dashboard/event',
    icon: <StyleIcon/>
},
{
    title: 'Staff',
    path: '/dashboard/staff',
    icon: <StyleIcon/>
},

 
 
];

export default WarehouseAdminsidebarConfig;
