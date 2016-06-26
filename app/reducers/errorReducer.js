import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import {ERROR} from 'constants/errorActionTypes';

const initialState = false;

export default function(state = initialState, action) {
  console.log(action);
  if (action && action.type === ERROR) {
    if (action.error) {
      return action.error.message;
    }
    return false;
  }

  return state;
};
