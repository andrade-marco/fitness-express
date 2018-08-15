//Home page
//This is the main page of the application, where the fitness data is displayed

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Label,
  Icon,
  Dropdown,
  Message} from 'semantic-ui-react';
import * as d3 from 'd3';
import NavBar from '../components/NavBar';
import AveragesPanel from '../components/AveragesPanel';
import ActivityTable from '../components/ActivityTable';
import {fetchUserData} from '../store/actions/home';
import {signoutUser} from '../store/actions/auth';

//Setup vars
//Text options for graph header
const textOptions = {
  steps: 'Total steps',
  distance: 'Distance in meters',
  calories: 'Calories burned',
  speed: 'Speed in km/h'
}

//Options of graph dropdown
const options = [
  {key: 1, text: 'Steps', value: 'steps'},
  {key: 2, text: 'Distance', value: 'distance'},
  {key: 3, text: 'Calories', value: 'calories'},
  {key: 4, text: 'Speed', value: 'speed'}
];

//Component
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: 'steps',
      headerText: 'Total steps'
    }
  }

  //Lifecycle methods
  //Sends API request and add event listener for responsive bar chart
  componentDidMount() {
    this.props.fetchUserData();
    window.addEventListener('resize', () => this.handleGraphGeneration())
  }

  //Generates bar chart once data from API is received
  componentDidUpdate() {
    this.handleGraphGeneration();
  }

  //Helpers
  updateBarChart = (container, dataset, prevDataset) => {
    if (dataset && dataset.length > 0) {
      const width = parseInt(d3.select(container).style("width"));
      const height = parseInt(d3.select(container).style("height"));

      //Remove data
      d3.select(container).selectAll('.bar').remove();

      //Enter new data
      let yScale = d3.scaleLinear()
      yScale.domain([0, d3.max(dataset, d => d.value)])
      yScale.range([height - 18, 0]);

      let xScale = d3.scaleOrdinal()
      xScale.domain([0,1,2,3,4,5,6])
      xScale.range(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

      const nodes = d3.select(container).selectAll('.bar').data(dataset);
      const groups = nodes.enter().append('g').classed('bar', true);

      //Appending bars and texts
      groups.append('rect')
            .style('fill', '#06bec2')
            .attr('x', (d,i) => i * width / 7)
            .attr('y', d => yScale(d.value))
            .attr('height', d => height - yScale(d.value) - 18)
            .attr('width', (width - 10)/ 7);

      groups.append('text')
            .text(d => xScale(d.day))
            .attr('y', height)
            .attr('x', (d, i) => (width * i / 7) + (width / 14))
            .style('text-anchor', 'middle')

      groups.append('text')
            .text(d => (d.value > 0) ? d3.format(',.1f')(d.value) : '')
            .attr('y', d => yScale(d.value) + 20)
            .attr('x', (d,i) => (width * i / 7) + (width / 14))
            .attr('fill', '#FFF')
            .style('text-anchor', 'middle');
    }
  }

  //Handlers
  //Handles the generation of bar chart
  handleGraphGeneration = () => {
    if ('sets' in this.props.userData) {
      const svg = this.graph;
      const {selectedData} = this.state;
      const data = this.props.userData.sets[selectedData]
      this.updateBarChart(svg, data)
    }
  }

  //Handles signing out
  handleSignOut = () => {
    this.props.signoutUser(() => {
      this.props.history.push('/');
    });
  }

  //Handles change in chart dropdown
  handleDropdownChange = (event, {value}) => {
    this.setState({
      ...this.state,
      selectedData: value,
      headerText: textOptions[value]
    });
  }

  //Rendering component
  render () {
    return (
      <div className='page-wrapper'>
        <NavBar signOut={this.handleSignOut}/>
        <Container className='content-wrapper'>
          <Label circular size='big' style ={{paddingLeft: '20px', marginBottom: '10px'}}>
            <Icon name='user' />
            Welcome, {this.props.username}
          </Label>
          <Grid stackable columns={2}>
            <Grid.Column width={6}>
              <AveragesPanel averages={this.props.userData.avgs}/>
              <ActivityTable activities={this.props.userData.activities}/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Segment className='graph-header' attached='top'>
                  <span>{this.state.headerText}</span>
                    <Dropdown onChange={this.handleDropdownChange} options={options} placeholder='Choose an option' value={this.state.selectedData} selection/>
                </Segment>
                <Segment attached='bottom'>
                  <svg ref={graph => this.graph = graph} height={420} width='100%'></svg>
                </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.name,
    userData: state.home.userData
  }
}

//Export
export default connect(mapStateToProps, {fetchUserData, signoutUser})(HomePage);
