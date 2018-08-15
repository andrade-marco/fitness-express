//API Requests
import axios from 'axios';

//Body of post request for aggregate data
export const aggPostReq = {
  "startTimeMillis": 0,
  "endTimeMillis": 0,
  "aggregateBy": [
    {
      "dataTypeName": "com.google.step_count.delta",
      "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    },
    {
      "dataTypeName": "com.google.distance.delta",
      "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:pruned_distance"
    },
    {
      "dataTypeName": "com.google.calories.expended",
      "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:from_activities"
    },
    {
      "dataTypeName": "com.google.speed",
      "dataSourceId": "derived:com.google.speed:com.google.android.gms:from_distance<-merge_distance_delta"
    },
    {
      "dataTypeName": "com.google.activity.segment",
      "dataSourceId": "derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments"
    }
  ]
}

//Making API requests
export function createApiRequest(method, path, data) {
  return axios[method](path, data);
}
