// Navigation
//This component is responsible for routing - navigation between pages of the app
import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import LandingPage from './Landing';
import HomePage from './Home';

//Redirecting in case user returns to app while still logged in
//Or attempts to reach /home without being authenticated
const routing = (page, isReversed) => {
  const hasTokens = localStorage.tokenId && localStorage.accessToken;
  const endPoint = (hasTokens && isReversed) ? <Redirect to='/home'/> :
                   (!hasTokens && !isReversed) ? <Redirect to='/'/> : page;

  return endPoint;
}

//Component
const Navigation = props => {
  return (
    <Switch>
      <Route exact path='/' render={props => routing(<LandingPage {...props}/>, true)}/>
      <Route exact path='/home' render={props => routing(<HomePage {...props}/>)}/>
      <Route render={() => <Redirect to='/'/>}/>
    </Switch>
  );
}

//Export
export default withRouter(Navigation);
