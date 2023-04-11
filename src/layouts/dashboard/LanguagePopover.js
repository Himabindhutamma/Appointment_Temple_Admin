import {useContext, useEffect, useRef, useState} from 'react';
// material
import {alpha} from '@mui/material/styles';
import {Box, MenuItem, ListItemIcon, ListItemText, IconButton} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
// import Dailogs from 'src/FunctionalComponents/Dailogs/Dailogs';
import MBForm from 'src/FunctionalComponents/MBForm/MBForm';
import MBSelect from 'src/FunctionalComponents/MBSelect/MBSelect';
import MBFormButton from 'src/FunctionalComponents/MBFormButton/MBFormButton';
import Store from '../../Store';
import {Basic, ReducerTypes} from "../../Assets/Constants";
import {connect} from 'react-redux';
import axios from "axios";


// ----------------------------------------------------------------------

const LANGS = [
    {
        value: 'en',
        label: 'English',
        icon: '/static/icons/ic_flag_en.svg'
    },
    {
        value: 'de',
        label: 'German',
        icon: '/static/icons/ic_flag_de.svg'
    },
    {
        value: 'fr',
        label: 'French',
        icon: '/static/icons/ic_flag_fr.svg'
    }
];

// ----------------------------------------------------------------------

function LanguagePopover({showDialog, warehouse, role, company, selectedCompany, selectedWarehouse}) {

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(false);
    const [companyvalue, setCompanyValue] = useState('');
    const [warehousevalue, setWarehouseValue] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [companyName, setCompanyname] = useState('Company');
    const [warehouseName, setWarehousename] = useState('Warehouse');
    const [selCompany, setSelectedCompany] = useState({});
    const [selWarehouse, setSelectedWarehouse] = useState({});


    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                <Button variant="outlined" onClick={() => {
                    // console.log('clicked open dialog');
                    if(role && role !== Basic.WAREHOUSE_ADMIN_ROLE)
                    setOpen(true);
                }}>
                    {/* <TextField label="Company-Warehouse" variant="standard" /> */}
                    <InputLabel>
                        {role && role !== Basic.SUPER_SUPER_ADMIN_ROLE && selectedCompany ? selectedCompany.companyName : companyName}
                        -
                        {role && role === Basic.WAREHOUSE_ADMIN_ROLE && selectedWarehouse ? selectedWarehouse.warehouseName : warehouseName}</InputLabel>
                    <WarehouseIcon/>
                </Button>
            </Box>



        </>
    );
}

const mapStateToProps = (state) => ({
    showDialog: state.Settings.showCompanyWarehouseDialog,
    company: state.Settings.company,
    warehouse: state.Settings.warehouse,
    role: state.User.role,
    selectedCompany: state.Settings.companyObj,
    selectedWarehouse: state.Settings.warehouseObj
});
export default connect(mapStateToProps)(LanguagePopover);

