import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import {ERROR} from 'constants/errorActionTypes';
import _ from 'lodash';

const initialState = false;

export default function(state = initialState, action) {
  if (action && action.type === ERROR) {
    if (action.error) {
      return action.error.message || _.get(action, 'error.reason.message') || _.get(action, 'error.reason');
    }
    return false;
  }

  return state;
};
