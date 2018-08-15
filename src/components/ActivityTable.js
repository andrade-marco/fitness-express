//Activity Table
//Generates the table that shows which activities were completed by day of week

import React from 'react';
import {Segment, Message} from 'semantic-ui-react';
import {generateEmptySetArray} from '../services/home';

//Helpers
//Generates rows for table of activities
function generateRows(activities) {
  //Create rows array and add first row with week days
  let rowsArray = [];
  rowsArray.push(generateFirstRow());

  //Create cells and rows for each activity in the list of activities completed
  Object.keys(activities).forEach((key, i) => {
    //Creat cells with colours based on whether activity was completed that day
    let daysArr = generateEmptySetArray();
    let cells = [];
    cells.push(<td key={`${key}-${i}`} className='activity-cell' width='30%'>{key}</td>);
    daysArr.forEach((entry, j) => {
      const k = `${key}-${i}-${j}`;
      const index = activities[key].findIndex(val => entry.day === val);
      const color = (index > -1) ? '#06BEC2' : '#FFFFFF';
      cells.push(<td key={k} className='days-cell' style={{backgroundColor: color}} width='10%'/>);
    });

    rowsArray.push(<tr key={i}>{cells}</tr>);

  });

  return rowsArray;
}

//Generate rows with days of the week (first row)
function generateFirstRow() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const set = generateEmptySetArray();
  const cells = set.map((entry, i) => {
    return <td key={i} width='10%' style={{textAlign: 'center'}}>{days[entry.day]}</td>
  });

  return (
    <tr key={'days-row'}>
      <td width='30%'></td>
      {cells}
    </tr>
  );
}

//Component
const ActivityTable = ({activities}) => {
  if (activities) {
    if (Object.keys(activities).length > 0) {
      //Return final component
      return (
        <Segment>
          <table style={{tableLayout: 'fixed', width: '100%'}}>
            <tbody>
              {generateRows(activities)}
            </tbody>
          </table>
        </Segment>
      );
    } else {
      return (
        <Message
          icon='battery empty'
          header='No activities found'
          content='Go to your Google Fit account to start adding workout sessions'/>
      );
    }
  } else {
    return <Segment style={{minHeight: '120px'}} loading />;
  }
}

//Export
export default ActivityTable;
