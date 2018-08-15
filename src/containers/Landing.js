//Landing page
//Imports
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Segment, Header, Icon, Message} from 'semantic-ui-react';
import {GoogleLogin} from 'react-google-login';
import {signinUser} from '../store/actions/auth';

//Setup
//Note: in real production application these variables should probably be hidden
//(saved as environment variables)
const APP_ID = '579529306830-8uu7nu1m15gsg0mq081ic9mb55qh1dt2.apps.googleusercontent.com';
const APP_SCOPE = 'https://www.googleapis.com/auth/fitness.activity.read';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorVisible: false
    }
  }

  //Helpers
  //Resolve error message - decided whether to show error
  resolveErrorMessage = () => {
    if (this.state.errorVisible) {
      return (
        <Message negative>
          <Message.Header>Something went wrong...</Message.Header>
          <p>An error occurred. Please try sigining in again.</p>
        </Message>
      );
    }

    return null;
  }

  //Handlers
  //Handling successful response from Google Authentication
  handleSuccessResponse = response => {
    this.props.signinUser(response, () => {
      this.props.history.push('/home');
    });
  }

  //Handling failure response from Google Authentication
  handleFailureResponse = (response) => {
    this.setState({
      errorVisible: true
    });
  }

  //Render component
  render () {
    return (
      <div className='landing-wrapper'>
        <Segment className='partially-transparent width-restricted' raised padded='very' textAlign='center'>
          <Header as='h2'>Welcome to</Header>
          <img className='main-logo' src='/images/FE_logo.svg' alt=''/>
          <Segment basic>
            <p>
              FitnessExpress lets you easily access and visualize your Google Fit data for the last 7 days. Login with your Google account and quickly see your stats.
            </p>
          </Segment>
          <GoogleLogin
            className='signin-button'
            clientId={APP_ID}
            scope={APP_SCOPE}
            onSuccess={this.handleSuccessResponse}
            onFailure={this.handleFailureResponse}>
            <Icon name='google'/>
            <span>Sign in with Google</span>
          </GoogleLogin>
        </Segment>
        {this.resolveErrorMessage()}
      </div>
    );
  }
}

//Export - connect to Redux
export default connect(null, {signinUser})(LandingPage);
