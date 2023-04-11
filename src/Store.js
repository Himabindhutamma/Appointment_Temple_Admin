import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// eslint-disable-next-line import/no-unresolved
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import User from './Reducers/Users';
import Settings from './Reducers/Settings';


export default createStore(
  combineReducers({
    User,
    Settings,
  }),
  {},
  applyMiddleware(thunk, promise)
);
