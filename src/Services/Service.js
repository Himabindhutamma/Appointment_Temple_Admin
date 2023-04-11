import axios from 'axios';
import CryptoJS from 'crypto-js';
import Store from '../Store';
import { ReducerTypes, Basic, AlertTypes } from '../Assets/Constants';

axios.interceptors.request.use(
  (config) => {
    Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: true });
    let encryptedData = typeof config.data === 'object' ? { ...config.data } : config.data;
    console.log(config.data, process.env.REACT_APP_ENVIRONMENT, Basic.PROD);
    if (process.env.REACT_APP_ENVIRONMENT === Basic.PROD) {
      encryptedData = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data;
      const parseBase64Key = CryptoJS.enc.Base64.parse(process.env.REACT_APP_ENCRYPTION_KEY);
      encryptedData = CryptoJS.AES.encrypt(encryptedData, parseBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    }
    return { ...config, data: encryptedData };
  },
  (error) => {
      try {
          console.log("heloooo hiiiii",error.response.data.message);
          console.log(Object.keys(error))
          console.log(Object.keys(error.response))
          Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: false });
          Store.dispatch({
              type: ReducerTypes.SHOW_ALERT.toString(),
              payload: {
                  showAlert: true,
                  message: `${error.response.data.message}`,
                  // message: `Error!`,
                  type: AlertTypes.ERROR_ALERT_TYPE
              }
          });
      }
      catch (e){
          Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: false });
          Store.dispatch({
              type: ReducerTypes.SHOW_ALERT.toString(),
              payload: {
                  showAlert: true,
                  message: `Somthing went wrong!`,
                  // message: `Error!`,
                  type: AlertTypes.ERROR_ALERT_TYPE
              }
          });
      }
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  async (response) => {
    if (process.env.REACT_APP_ENVIRONMENT === Basic.PROD) {
      const parseBase64Key = CryptoJS.enc.Base64.parse(process.env.REACT_APP_DECRYPTION_KEY);
      response.data = CryptoJS.AES.decrypt(response.data, parseBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    }
    Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: false });

    return response.data;
  },
  (error) => {
      try {
          console.log("heloooo hiiiii",error.response.data.message);
          console.log(Object.keys(error))
          console.log(Object.keys(error.response))
          Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: false });
          Store.dispatch({
              type: ReducerTypes.SHOW_ALERT.toString(),
              payload: {
                  showAlert: true,
                  message: `${error.response.data.message}`,
                  // message: `Error!`,
                  type: AlertTypes.ERROR_ALERT_TYPE
              }
          });
      }
      catch (e){
          Store.dispatch({ type: ReducerTypes.LOADER.toString(), payload: false });
          Store.dispatch({
              type: ReducerTypes.SHOW_ALERT.toString(),
              payload: {
                  showAlert: true,
                  message: `Somthing went wrong!`,
                  // message: `Error!`,
                  type: AlertTypes.ERROR_ALERT_TYPE
              }
          });
      }

    return Promise.reject(error);
  }
);

export const Service = async () => {};
