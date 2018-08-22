//Empty data message
//Used for showing error in case user does not have Google Fit initialized
import React from 'react';
import {Container, Segment, Header, Icon} from 'semantic-ui-react';

//Component
const EmptyDataMessage = (props) => {
  return (
    <Container>
      <Segment basic style={styles.messageContainer}>
        <Header as='h3'>
          <Icon name='warning sign' />
          An error occurred. No data found...
        </Header>
        <p>
          We were not able to find any Google Fit data for you. For FitnessExpress to work, we require that you have Google Fit account initialized. You may be seeing this message because you have not yet initialized your Google Fit account.
        </p>
        <p>
          If this is the case, please visit <a href='https://www.google.com/fit/' target='_blank'>Google Fit</a> to start your account
        </p>
      </Segment>
    </Container>
  );
}

//Styles
const styles = {
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '45px 10%'
  }
}

//Export
export default EmptyDataMessage;
