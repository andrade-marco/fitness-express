//Auth actions
import {setTokenHeader} from '../../services/auth';
import {SET_CURRENT_USER} from '../types';

//Sign in user - after authentication with Google, save accessToken and
//set request header for future API requests
export const signinUser = (response, callback) => dispatch => {
  const {accessToken, tokenId, profileObj} = response;
  localStorage.setItem('tokenId', tokenId);
  localStorage.setItem('accessToken', accessToken);
  setTokenHeader(accessToken);
  dispatch({type: SET_CURRENT_USER, payload: profileObj});
  callback();
}

//Sign out user - remove tokens from local storage
//Note: this does not sign out user from their Google Account
//This was done intentionally - user only signs out from FitnessExpress
export const signoutUser = (callback) => dispatch => {
  localStorage.clear();
  setTokenHeader(null);
  dispatch({type: null});
  callback();
}
