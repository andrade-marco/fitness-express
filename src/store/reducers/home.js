import {SET_USER_DATA} from '../types';

const DEFAULT_STATE = {
  userData: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {...state, userData: action.payload}
    default:
      return state;
  }
}
