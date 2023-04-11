const data = {
    showLoader: false,
    showAlert: false,
    alertMessage: null,
    alertType: '',
    timeOut: null,
    sideNavStatus: false,
    publicRoutes: [],
    company: '',
    warehouse: '',
    companyObj:null,
    warehouseObj:null,
    showSetting: false,
    showCompanyWarehouseDialog: false,
};
const Settings = (state = data, action) => {
    switch (action.type) {
        case 'LOADER':
            state = {...state, showLoader: action.payload};
            break;
        case 'SHOW_ALERT':
            state = {
                ...state,
                showAlert: true,
                alertMessage: action.payload.message,
                alertType: action.payload.type,
                timeOut: action.payload.timeOut || 2000
            };
            break;
        case 'HIDE_ALERT':
            state = { 
                ...state,
                showAlert: false,
                alertMessage: '',
                alertType: '',
                timeOut: null
            };
            break;
        case 'SET_SIDE_NAV':
            state = {
                ...state,
                sideNavStatus: action.payload
            };
            break;
        case 'SET_SELECTED_VALUE':
            console.log(action.payload);
            state = {
                ...state,
                company: action.payload.company || '',
                warehouse: action.payload.warehouse || '',
                companyObj:action.payload.companyObj || null,
                warehouseObj:action.payload.warehouseObj || null,
            };
            localStorage.setItem("default_company_warehouse", JSON.stringify(action.payload))
            break;
        case 'SETTINGS_STATUS':
            state = {
                ...state,
                showSetting: action.payload
            }
            break;

        case 'SHOW_COMPANY_WAREHOUSE_DIALOG':
            state = {
                ...state,
                showCompanyWarehouseDialog: action.payload
            }
            break;
        default:
            break;
    }

    return state;
};

export default Settings;
