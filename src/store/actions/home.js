//Home actions
import {createApiRequest, aggPostReq} from '../../services/requests';
import {buildRegularSets, buildActivitiesSet, calculateAverages} from '../../services/home';
import {dataSources} from '../../services/dictionaries';
import {SET_USER_DATA} from '../types';

//Actions
//Fetching user data -  make request to Google Fitness API and store the data
export const fetchUserData = callback => async dispatch => {
  try {
    aggPostReq.endTimeMillis = new Date().setHours(0, 0, 0, 0);
    aggPostReq.startTimeMillis = aggPostReq.endTimeMillis - 6.048e+8;
    const reqUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
    const response = await createApiRequest('post', reqUrl, aggPostReq);

    console.log(response.data);

    let fitnessData = {}
    fitnessData.avgs = {};
    fitnessData.sets = {};

    response.data.bucket[0].dataset.forEach(dataset => {
      const sourceId = dataset.dataSourceId.split(':')[1];
      const type = dataSources[sourceId];
      if (type !== 'activity') {
        fitnessData.sets[type] = buildRegularSets(dataset, type);
        fitnessData.avgs[type] = calculateAverages(fitnessData.sets[type]);
      } else {
        fitnessData.activities = buildActivitiesSet(dataset);
      }
    });

    dispatch({type: SET_USER_DATA, payload: fitnessData});
    callback();

  } catch (err) {
    let fitnessData = {}
    fitnessData.avgs = {};
    fitnessData.sets = {};
    dispatch({type: SET_USER_DATA, payload: fitnessData});
    callback();
  }
}
