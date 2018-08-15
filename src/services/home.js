//Helper functions for home actions/page
import {activitiesDictionary} from './dictionaries';

//Generate blank entries array
//Generate an array with the previous 7 days of the week in correct order
export function generateEmptySetArray() {
  let emptyArray = [];
  for (var i = 6; i >= 0; i--) {
    //Get today's date and generate day of week going backwards 7 days
    const today = new Date().setHours(0, 0, 0, 0);
    const prevDay = new Date(today - (6.048e+8 / 7 * (i + 1))).getDay();

    //Change entries and initialize value to zero
    emptyArray[i] = {}
    emptyArray[i].day = prevDay;
    emptyArray[i].value = 0;
  }

  return emptyArray;
}

//Create sets for non-activity data
//Create arrays of data for steps, distance, calories and speed
export function buildRegularSets(dataset, type) {
  let dataArray = generateEmptySetArray();
  dataset.point.forEach(point => {
    //Determine the day of week activity was completed - based on end time
    let day = new Date(point.endTimeNanos / 1000000).getDay();
    let value = point.value[0].intVal || point.value[0].fpVal;
    let index = dataArray.findIndex(entry => entry.day === day);

    //Add value to array - average if speed
    //Note: average is simplified here - for more accuracy it should be
    //a weighted average
    if (type === 'speed') {
      dataArray[index].value += value;
      dataArray[index].value /= 2;
    } else {
      dataArray[index].value += value;
    }
  });

  return dataArray;
}

//Create the set of activities
//Create activities object that contains the activities completed by user
//and the days of the week when they were completed
export function buildActivitiesSet(dataset) {
  let activitiesSet = {};
  dataset.point.forEach(point => {

    //Determine the day of week activity was completed - based on end time
    //and activity type
    let day = new Date(point.endTimeNanos / 1000000).getDay();
    let activity = activitiesDictionary[point.value[0].intVal] || '';

    //Check to see if activity code is valid
    if (activity) {
      if (activity in activitiesSet) {
        const index = activitiesSet[activity].findIndex(el => el === day);
        if(index === -1) activitiesSet[activity].push(day);
      } else {
        activitiesSet[activity] = [];
        activitiesSet[activity].push(day);
      }
    }
  });

  return activitiesSet;
}

//Calculating weekly averages
export function calculateAverages(dataArray) {
  const sum = dataArray.map(point => point.value).reduce((acc, next) => acc += next);
  const avg = Math.round(sum / 7 * 10) / 10;
  return avg;
}
