import {SET_CURRENT_USER} from '../types';

const DEFAULT_STATE = {
  currentUser: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {...state, currentUser: action.payload};
    default:
      return state;
  }
}
