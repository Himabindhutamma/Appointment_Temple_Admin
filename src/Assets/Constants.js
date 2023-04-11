export const AlertTypes = {
  ERROR_ALERT_TYPE: 'error',
  SUCCESS_ALERT_TYPE: 'success',
  WARNING_ALERT_TYPE: 'warning',
  INFO_ALERT_TYPE: 'info'
};

export const ReducerTypes = {
  LOADER: 'LOADER',
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_SIDE_NAV: 'SET_SIDE_NAV',
  SET_SELECTED_VALUE:'SET_SELECTED_VALUE',
  SETTINGS_STATUS:'SETTINGS_STATUS',
  Action:'Action',
  SHOW_COMPANY_WAREHOUSE_DIALOG:'SHOW_COMPANY_WAREHOUSE_DIALOG',
  ACTION:'ACTION',
  LIVE_READER:'LIVE_READER',
  LIVE_EVENTS:'LIVE_EVENTS',
  START_EVENT:'START_EVENT',
  UPDATE_EVENT:'UPDATE_EVENT',
  STOP_EVENT:'STOP_EVENT',
  SOCKET:'SOCKET',
  LIVE_STAFF_STATUS:'LIVE_STAFF_STATUS'
};

export const Basic = {
  PROD: 'production',
  TEXT_FIELD_DESIGN_VARIANT: 'outlined',
  SUPER_SUPER_ADMIN_ROLE:'SUPER_ADMIN',
  WAREHOUSE_ADMIN_ROLE:'WAREHOUSE_ADMIN',
  COMPANY_ADMIN_ROLE:"COMPANY_ADMIN",
  DEPOSIT_ACTION:'DEPOSIT',
  DETAILS:'DETAILS',
  WITHDRAWAL_ACTION:'WITHDRAW',
  SAMPLE_OUT_ACTION:'SAMPLE_OUT',
  SAMPLE_IN_ACTION:'SAMPLE_IN',
  BLOCK_ACTION:'BLOCK',
  UN_BLOCK_ACTION:'UNBLOCK',
  TRANSFER_ACTION:'TRANSFER',
  RECEIVED_ACTION:'RECEIVED',//while transfer form one person to another- need to change the status old inventory and create new inventory and create inventory transaction with this receive action
  SELL_ACTION:'SELL',
  EDIT_ACTION:'EDIT',
  VIEW_ACTION:'VIEW',
  SOLD_OUT_ACTION:'SOLD_OUT'
  };

export const FormValidate = {};

export const SuperAdminPrivateRoutes = [
  '/dashboard',
  '/company',
  '/customerfarmersorvisitors',
  '/employestothewarehouseandworkersgroup',
  '/goodsorlottothecustomer',
  '/lottype',
  '/rfidtagstothelot',
  '/rfidtagstotheworkersandemployes',
  '/rfidwarehouse',
  '/storageareas',
  '/systemroles',
  '/storageareas',
  '/warehousespecificcompany',
  '/warehouseroles',
  '/workersgroups',
  '/cardpage',
  '/toprightnavibar'
  // "/carddesign"
];
