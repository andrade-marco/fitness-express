//Averages panel
//Panels for showing the weekly (past 7 days) averages for steps, calories, distance and speed
import React from 'react';
import {Segment, Icon, Message} from 'semantic-ui-react';

//Item dictionary
const dataDict = {
  steps: {icon: 'male', label: 'steps per day'},
  calories: {icon: 'fire', label: 'calories per day'},
  speed: {icon: 'tachometer alternate', label: 'km per hour'},
  distance: {icon: 'road', label: 'km per day'}
};

//Component
const AveragesPanel = ({averages}) => {
  if (averages) {
    if (Object.keys(averages).length > 0) {
      function renderDataSegment() {
        let segmentsArray = [];
        Object.keys(averages).forEach(key => {
          const value = (key !== 'speed') ? Math.round(averages[key]) : averages[key];
          const segEl = (
            <Segment key={key} vertical>
              <div style={styles.outerContainer}>
                <Icon style={styles.iconStyle} name={dataDict[key].icon}/>
                <div style={styles.innerContainer}>
                  {value}
                  <div style={styles.dataLabel}>{dataDict[key].label}</div>
                </div>
              </div>
            </Segment>
          );
          segmentsArray.push(segEl);
        });

        return segmentsArray;
      }

      return (
        <Segment style={styles.segmentStyle}>
          <div style={{...styles.dataLabel, fontSize: '1.3em'}}>Weekly averages</div>
          {renderDataSegment()}
        </Segment>
      );
    }
  } else {
    return <Segment style={{minHeight: '340px'}} loading />;
  }
}

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 15px'
  },
  innerContainer: {
    fontSize: '2.5em',
    marginLeft: '10px',
    color: '#FFF',
    lineHeight: '1'
  },
  dataLabel: {
    fontSize: '0.5em',
    color: '#A0A0A0',
    marginLeft: '5px'
  },
  iconStyle: {
    color: 'rgba(6, 190, 194, 0.5)',
    fontSize: '1.5em'
  },
  segmentStyle: {
    backgroundColor: 'rgba(76, 76, 76, 1)',
    minHeight: '340px'
  }
}

export default AveragesPanel;
