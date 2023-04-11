import {Icon} from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import StyleIcon from '@mui/icons-material/Style';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import peopleFill from '@iconify/icons-eva/people-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LanguageIcon from '@mui/icons-material/Language';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import VerifiedIcon from '@mui/icons-material/Verified';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22}/>;

const AdminSidebarConfig = [
    
    {
        title: 'Website',
        path: '/dashboard/yoga',
        icon: <LanguageIcon/>,
        children:[
            
            {
                title: 'Homepage',
                path: '/dashboard/home',
                icon: getIcon(homeFill)
            },
            // {
            //     title: 'Services',
            //     path: '/dashboard/services',
            //     icon: <MiscellaneousServicesIcon/>
            // },
            {
                title: 'Aboutus',
                path: '/dashboard/aboutus',
                icon: getIcon(peopleFill)
            },
            // {
            //     title: 'Departments',
            //     path: '/dashboard/departments',
            //     icon: <StyleIcon/>
            // },
            // {
            //     title: 'Contact Us',
            //     path: '/dashboard',
            //     icon: <ContactPhoneIcon/>
            // },
        ]
    },
  
    {
        title: 'Adminstration',
        path: '/dashboard/role',
        icon: <AdminPanelSettingsIcon/>,
        children:[
            {
                title: 'Role',
                path: '/dashboard/role',
                icon: <PeopleIcon/>
            }, 
            {
                title: 'User Type',
                path: '/dashboard/usertype',
                icon: <PeopleIcon/>
            },
            { 
                title: 'User',
                path: '/dashboard/userlist',
                icon: <AdminPanelSettingsIcon/>
            },
        ]
    },
    {
         title:'Clinic/Hospital',
         path:'/dashboard/clinic',
         icon:getIcon(personOutline)
        //  children:[
            
        //     {
        //         title: 'Users',
        //         path: '/dashboard/adddoctororpatients',
        //         icon: <StyleIcon/>
        //     },
           
        // ]
     },
    //  {
    //     title:'Hospital',
    //     path:'/dashboard/hospital',
    //     icon:<LocalHospitalIcon/>
    //  },
     {
        title: 'Doctors Verification',
        path: '/dashboard/verification',
        icon: <VerifiedIcon/>,
        
    },
      {
        title: 'Patient Booking',
        path: '/dashboard/patientdetails',
        icon: <EventAvailableIcon/>,
        children:[
            {
                title:'Booking',
                path:'/dashboard/patientdetails',
                icon:<EventAvailableIcon/>
            },
            {
                title:'Appt List',
                path:'/dashboard/appointments',
                icon:<EventAvailableIcon/>
            }
        ]
        
    },
    {
        title: 'Schedule',
        path: '/dashboard/eventsession',
        icon: <StyleIcon/>,
        children:[
            {
                title: 'Department',
                path: '/dashboard/department',
                icon: <EventIcon/>
            },
            {
                title: 'Doctor App Scheduling',
                path: '/dashboard/eventsession',
                icon: <EventNoteIcon/>
            },
        ]
    },

   
    
    
   
   
    // {
    //     title: 'animation',
    //     path: '/dashboard/animation',
    //     icon: <StyleIcon/>
    // },
];

export default AdminSidebarConfig;

