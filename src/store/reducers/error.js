//Error reducer
import {FIT_APP_NOT_FOUND} from '../types';

const DEFAULT_STATE = {
  error: false,
  message: ''
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FIT_APP_NOT_FOUND:
      return {error: true, message: 'GoogleFitNotInitialized'}
    default:
      return state;
  }
}
