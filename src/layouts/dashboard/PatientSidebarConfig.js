import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import homeFill from "@iconify/icons-eva/home-fill";
import StyleIcon from "@mui/icons-material/Style";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import peopleFill from "@iconify/icons-eva/people-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import personOutline from "@iconify/icons-eva/person-outline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventIcon from "@mui/icons-material/Event";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ShareIcon from "@mui/icons-material/Share";
import LockIcon from "@mui/icons-material/Lock";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const PatientSidebarConfig = [
  {
    title: "Appointments",
    path: "/dashboard/appointments",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Prescription",
    path: "/dashboard/prescription",
    icon: <LocalHospitalIcon />,
  },
  {
    title: "Medical Records",
    path: "/dashboard/medicalrecords",
    icon: <BookIcon />,
  },
  {
    title: "Billing",
    path: "/dashboard/patientbilling",
    icon: <ReceiptLongIcon />,
  },
  {
    title: "Invoices",
    path: "/dashboard/patientinvoices",
    icon: <ReceiptIcon />,
  },
  {
    title: "Profile Settings",
    path: "/dashboard/patientprofilesettings",
    icon: <ManageAccountsIcon />,
  },
  {
    title: "Change Password",
    path: "/dashboard/changepassword",
    icon: <LockIcon />,
  },
  {
    title: "Logout",
    path: "/loginpage",
    icon: <LogoutIcon />,
  },
];

export default PatientSidebarConfig;
