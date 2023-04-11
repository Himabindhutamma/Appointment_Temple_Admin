import {Icon} from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import StyleIcon from '@mui/icons-material/Style';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import peopleFill from '@iconify/icons-eva/people-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LanguageIcon from '@mui/icons-material/Language';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import MedicationIcon from '@mui/icons-material/Medication';
 
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22}/>;

const SuperAdminSidebarConfig = [
    
    {
        title: 'Dashboard',
        path: '/dashboard/doctorsdashboard',
        icon: <LanguageIcon/>
     
    },
    {
                title: 'Doctors',
                path: '/dashboard/doctor',
                icon: <LocalHospitalIcon/>
     },
    
    //  {
    //      title:'Clinic',
    //      path:'/dashboard/clinic',
    //      icon:getIcon(personOutline),
    //      children:[
            
    //         {
    //             title: 'Users',
    //             path: '/dashboard/userlist',
    //             icon: <StyleIcon/>
    //         },
           
    //     ]
    //  },
     {
         title:'Schedule Timings',
         path:'/dashboard/scheduletimings',
         icon:<HourglassTopIcon/>
     },
     {
                title: 'Appointments',
                path: '/dashboard/appointment',
                icon: getIcon(personOutline)
     },
     {
        title:'Verification',
        path:'/dashboard/verification',
        icon:<VerifiedIcon/>
     },
     {
         title:'My Patients',
         path:'/dashboard/mypatients',
         icon:<PeopleIcon/>
     },
     {
        title:'Add Prescription',
        path:'/dashboard/addprescription',
        icon:<MedicationIcon/>
     },
    //  {
    //      title:'Available Timings',
    //      path:'/dashboard/availabletimings',
    //      icon:<AccessTimeIcon/>
    //  },
     {
         title:'Invoices',
         path:'/dashboard/invoices',
         icon:<ReceiptIcon/>
     },
     {
         title:'Social Media',
         path:'/dashboard/sociallinks',
         icon:<ShareIcon/>
     },
    //  {
    //      title:'Profile Settings',
    //      path:'/dashboard/profilesettings',
    //      icon:<SettingsSuggestIcon/>
    //  },
     {
         title:'Change Password',
         path:'/dashboard/changepassword',
         icon:<LockIcon/>
     },
    //  {
    //      title:'Search Doctors',
    //      path:'/dashboard/doctorssearch',
    //      icon:<LockIcon/>
    //  }

];

export default SuperAdminSidebarConfig;

