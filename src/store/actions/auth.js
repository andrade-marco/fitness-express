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

//Sign in failed - dispatch error if sign in with Google fails
export const signinFailed = response => dispatch => {
  console.log(response);
}
