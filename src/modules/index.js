import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userDetail from './userDetail';

export default combineReducers({
  router: routerReducer,
  userDetail
});
