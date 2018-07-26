import { combineReducers } from 'redux';

import landingReducer from './landingReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  landing: landingReducer,
  auth: authReducer,
  errors: errorReducer
});
