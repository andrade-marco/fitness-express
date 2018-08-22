//Root reducer
import { combineReducers } from 'redux';
import auth from './auth';
import home from './home';
import error from './error';

const rootReducer = combineReducers({
  auth,
  home,
  error
});

export default rootReducer;
