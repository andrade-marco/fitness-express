//Data container
//Component to show user's fitness data
import React from 'react';
import {Container, Label, Icon, Grid, Segment, Dropdown} from 'semantic-ui-react';
import AveragesPanel from './AveragesPanel';
import ActivityTable from './ActivityTable';

//Options of graph dropdown
const options = [
  {key: 1, text: 'Steps', value: 'steps'},
  {key: 2, text: 'Distance', value: 'distance'},
  {key: 3, text: 'Calories', value: 'calories'},
  {key: 4, text: 'Speed', value: 'speed'}
];

//Component
const DataContainer = ({
  averages,
  activities,
  username,
  headerText,
  dropdownChange,
  dropdownValue,
  svgComponent
}) => {
  return (
    <Container className='content-wrapper'>
      <Label circular size='big' style ={styles.labelStyle}>
        <Icon name='user' />
        Welcome, {username}
      </Label>
      <Grid stackable columns={2}>
        <Grid.Column width={6}>
          <AveragesPanel averages={averages}/>
          <ActivityTable activities={activities}/>
        </Grid.Column>
        <Grid.Column width={10}>
            <Segment className='graph-header' attached='top'>
              <span>{headerText}</span>
                <Dropdown
                  onChange={dropdownChange}
                  options={options} placeholder='Choose an option'
                  value={dropdownValue}
                  selection/>
            </Segment>
            <Segment attached='bottom'>
              {svgComponent()}
            </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

//Styles
const styles = {
  labelStyle: {
    paddingLeft: '20px',
    marginBottom: '10px'
  }
}

//Export
export default DataContainer;
