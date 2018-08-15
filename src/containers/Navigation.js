// Navigation
import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import LandingPage from './Landing';
import HomePage from './Home';

const routing = (page, isReversed) => {
  const hasTokens = localStorage.tokenId && localStorage.accessToken;
  const endPoint = (hasTokens && isReversed) ? <Redirect to='/home'/> :
                   (!hasTokens && !isReversed) ? <Redirect to='/'/> : page;

  return endPoint;
}

const Navigation = props => {
  return (
    <Switch>
      <Route exact path='/' render={props => routing(<LandingPage {...props}/>, true)}/>
      <Route exact path='/home' render={props => routing(<HomePage {...props}/>)}/>
    </Switch>
  );
}

export default withRouter(Navigation);
