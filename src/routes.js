import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { connect } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import Animation from './Animation';
import Yoga from './pages/Yoga/Yoga';
import Departments from './pages/Departments/Departments';
import Meditation from './pages/Meditation/Meditation';
import Events from './pages/Events/Events';
import Home from './pages/Home/Home';
import Aboutus from './pages/Aboutus/Aboutus';
import Role from './pages/Role/Role';
import UserType from './pages/UserType/UserType';
import Admin from './pages/Admin/Admin';
import Department from './pages/DepartMent/Department';
import EventSession from './pages/EventSession/EventSession';
import Booking from './pages/Booking/Booking';
import AddParticipants from './pages/Booking/AddParticipants';
import Slickslider from './pages/Slickslider';
import LoginPage from './pages/LoginPage';
import Registeration from './pages/Registeration';
import ForgotPassword from './components/authentication/ForgotPassword/ForgotPassword';
import Doctor from './pages/Doctors/Doctors';
import Patient from './pages/Doctors/Patients';
import Appointments from './pages/Doctors/Appointments';
import DoctorsDashboard from './pages/Doctors/DoctorsDashboard';
import SocialLinks from './pages/Doctors/SocialLinks';
import ChangePassword from './pages/Doctors/ChangePassword';
import ProfileSettings from './pages/Doctors/ProfileSettings';
import Invoices from './pages/Doctors/Invoices';
import PatientList from './pages/Doctors/PatientList';
import AvailableTimings from './pages/Doctors/AvailableTimings';
import ScheduleTimings from './pages/Doctors/ScheduleTimings';
import Appointment from './pages/Patient/Appointment';
import Prescription from './pages/Patient/Prescription';
import PatientProfileSettings from './pages/Patient/PatientProfileSettings';
import PatientInvoices from './pages/Patient/PatientInvoices';
import PatientBilling from './pages/Patient/PatientBilling';
import MedicalRecords from './pages/Patient/MedicalRecords';
import Hospital from './pages/Hospital/Hospital';
import Clinic from './pages/Clinic/Clinic';
import AppointmentBooking from './pages/Booking/AppointmentBooking';
import AddPrescription from './pages/Doctors/AddPrescription';

import SearchDoctor from './pages/Booking/SearchDoctor';
import DoctorsDetails from './pages/Booking/DoctorsDetails';
import Verification from './pages/Verification/Verification';
import VerificationForm from './pages/Verification/VerificationForm';
import PatientDetails from './pages/Booking/PatientDetails';


const publicRoutes = [
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: 'loginpage', element: <LoginPage /> },
      { path:'register', element:<Registeration/>},
      {path:'forgotpassword',element:<ForgotPassword/>},
      { path: 'animation', element: <Animation /> },
      { path: '/', element: <Navigate to='/loginpage'/> },
      { path: '*', element: <Navigate to='/loginpage'/> },
    ]
  },
   { path: '*', element: <Navigate to="/loginpage" replace /> },
 ];


const privateRoutes = [
  { path: '/', element: <Navigate to="/dashboard" /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // { path: 'app', element: <DashboardApp /> },
      { path: 'home', element: <Home /> },
    
      // { path: 'departments', element: <Departments />},
 
      { path:'role', element:<Role/>},
      { path:'usertype', element:<UserType/>},
      { path:'eventsession', element:<ScheduleTimings/>},
      { path:'userlist', element:<Admin/>},

      { path:'booking', element:<Booking/>},
      {path:'addparticipant', element:<AddParticipants/>},
      {path:'slickslider', element:<Slickslider/>},
      {path:'department', element:<Department/>},
      { path:'appointments', element:<Appointment/>},
      {path:'prescription', element:<Prescription/>},
      {path:'patientprofilesettings', element:<PatientProfileSettings/>},
      {path:'patientinvoices', element:<PatientInvoices/>},
      {path:'patientbilling', element:<PatientBilling/>},
      {path:'medicalrecords', element:<MedicalRecords/>},
      { path:'hospital', element:<Hospital/>},
      {path:'clinic', element:<Clinic/>},
      {path:'aboutus',element:<Aboutus/>},
      {path:'patientdetails', element:<PatientDetails/>},
      { path:'appointmentbooking', element:<AppointmentBooking/>},
      {path:'verification',element:<Verification/>},


      { path:'doctorssearch', element:<SearchDoctor/>},

      { path:'doctorsprofile', element:<DoctorsDetails/>},

      // { path: 'section', element: <Section />},
      { path: '*', element: <Navigate to="/dashboard/home" /> },
      { path: '404', element: <Navigate to="/dashboard/home" /> }
    ]
  },
  {
    path: '/settings',
    element: <DashboardLayout />, 
    children: [
      { path: '*', element: <Navigate to="/settings" /> },
      { path: '404', element: <Navigate to="/settings" /> }
    ]
  },
  { path: '*', element: <Navigate to="/dashboard/home" /> }
];
const doctorsRoutes = [
  {path: '/', element:<Navigate to="/dashboard"/>},
  {
    path:'/dashboard',
    element:<DashboardLayout/>,
    children:[
      { path:'doctorsdashboard', element:<DoctorsDashboard/>},
      {path:'verification',element:<VerificationForm/>},
      {path:'doctor', element:<Doctor/>},
      { path:'patient', element:<Patient/>},
      { path:'appointment', element:<Appointments/>},
      { path:'sociallinks', element:<SocialLinks/>},
      { path:'changepassword', element:<ChangePassword/>},
      { path:'profilesettings', element:<ProfileSettings/>},
      { path:'invoices', element:<Invoices/>},
      { path:'mypatients', element:<PatientList/>},
      { path:'availabletimings', element:<AvailableTimings/>},
      { path:'scheduletimings', element:<ScheduleTimings/>},
      { path:'clinic', element:<Clinic/>},
      {path:'aboutus',element:<Aboutus/>},
      {path:'department', element:<Department/>},
      { path:'userlist', element:<Admin/>},
      {path:'addprescription', element:<AddPrescription/>},
      { path:'*', element:<Navigate to="/dashboard/doctorsdashboard"/>},
      { path:'404', element:<Navigate to="/dashboard/doctorsdashboard"/>}
      ]
  },
  {path:'*', element:<Navigate to="/dashboard/doctorsdashboard"/>}
]


const Router = ({ isLogin, userType }) => {
  console.log(isLogin,userType)
  return useRoutes(
    isLogin
      ? userType === 4
        ? doctorsRoutes
        : privateRoutes
      : publicRoutes
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.User.isLogin,
  userType:state.User.userTypeId_users
});

export default connect(mapStateToProps)(Router);