// routes
import {useLocation} from 'react-router';
import {useEffect, useState} from 'react';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import {BaseOptionChartStyle} from './components/charts/BaseOptionChart';
import ProgressBar from './FunctionalComponents/ProgressBar';
// import {Service} from './Services/Service';
import CustomAlert from './FunctionalComponents/Alerts/CustomAlert';
import {ReducerTypes} from './Assets/Constants';
import Store from './Store';
import {LocalGasStationRounded} from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function App() {
    const {pathname} = useLocation();
    const [currentPage, setCurrentPage] = useState(null);
    const [drawerOpened, isDrawerOpened] = useState(false);
    console.log(process.env.REACT_APP_API_URL)
    
    useEffect(()=>{
       console.log("null value")     
    },undefined)
    useEffect(() => {
        console.log(currentPage,pathname)
        if (!currentPage) {
            Setdefaultvalues();
            setCurrentPage(pathname)
        } else {
            if(currentPage.indexOf("/settings") === -1 && pathname.indexOf("/dashboard") === -1){
                setCurrentPage(pathname)
            }
            if (currentPage.indexOf("/settings") > -1 && pathname.indexOf("/settings") === -1) {
                setCurrentPage(pathname)
            }
            if (currentPage.indexOf("/dashboard") > -1 && pathname.indexOf("/dashboard") === -1) {
                setCurrentPage(pathname)
            }
        }

    }, [pathname]);


    useEffect(() => {
        if (currentPage && currentPage.indexOf("/settings") > -1) {
            Store.dispatch({type: ReducerTypes.SETTINGS_STATUS, payload: true})
        } else { 
            Store.dispatch({type: ReducerTypes.SETTINGS_STATUS, payload: false})
        }

    }, [currentPage])



    const Setdefaultvalues = () => {
        let login = localStorage.getItem("login");
        console.log(login);
        if (login) {
            Store.dispatch({type: ReducerTypes.LOGIN, payload: JSON.parse(login)})
        }
        else{
            Store.dispatch({type:ReducerTypes.LOGOUT});
        }
    }
    return (
        <ThemeConfig>
            <ProgressBar/>
            <CustomAlert/>
            <ScrollToTop/>
            <GlobalStyles/>
            <BaseOptionChartStyle/>
            <Router/>
        </ThemeConfig>
    );
}
