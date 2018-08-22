//Page loader
import React from 'react';
import {Container, Segment, Header} from 'semantic-ui-react';

//Component
const PageLoader = (props) => {
  return (
    <Container style={styles.loadingContainer}>
      <Segment basic loading/>
      <Segment basic>
        <Header as='h5'>Retrieving your data...</Header>
      </Segment>
    </Container>
  );
}

//Styles
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 85px)'
  }
}

//Export
export default PageLoader;
