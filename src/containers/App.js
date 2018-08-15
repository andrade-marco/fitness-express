/*
--- FitnessExpress ---
This app retrieves data for the past seven days from users Google Fit account
and display the data using a simple and accessible UI
*/

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from '../store';
import {SET_CURRENT_USER} from '../store/types';
import {setTokenHeader} from '../services/auth';
import Navigation from './Navigation';
import jwtDecode from 'jwt-decode';

//Setting up Redux store
const store = configureStore();

//Check if user has logged in with the app and if the tokens are still valid
//If tokens are valid, reset the headers for requests and reset current user
//If tokens are not valid, clear storage
if (localStorage.tokenId && localStorage.accessToken) {
  try {
    const {tokenId, accessToken} = localStorage;
    const decoded = jwtDecode(tokenId);
    const isValid = (decoded.exp * 1000) - Date.now() > 0;
    const data = (isValid) ? decoded : {};
    const token = (isValid) ? accessToken : null;

    setTokenHeader(token);
    store.dispatch({type: SET_CURRENT_USER, payload: data});
    if (!isValid) localStorage.clear();

  } catch (err) {
    //Error may occur if token cannot be decoded which could indicate token has been tampered with
    store.dispatch({type: SET_CURRENT_USER, payload: {}});
    setTokenHeader(null);
    localStorage.clear();
  }
};

//App component
class App extends Component {
   render() {
     return (
       <Provider store={store}>
         <BrowserRouter>
           <Navigation/>
         </BrowserRouter>
       </Provider>
     );
   }
 }

//Export
export default App;
