import * as ACTIONS from 'constants/taskActionTypes';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  error: false,
  completed: false,
  points: 0
});

function loadStart(state, action) {
  return state.set('loading', true);
}

function loadEnd(state, action) {
  return state.set('loading', false);
}

function loadError(state, action) {
  return state.set('error', action.error);
}

function success(state, action) {
  return state.merge({
    completed: true,
    points: action.points
  });
}

function ok(state, action) {
  return state.set('completed', false);
}

export default createReducer(initialState, {
  [ACTIONS.TASK_LOAD_START]: loadStart,
  [ACTIONS.TASK_LOAD_END]: loadEnd,
  [ACTIONS.TASK_LOAD_ERROR]: loadError,
  [ACTIONS.TASK_SUCCESS]: success,
  [ACTIONS.TASK_OK]: ok
});
