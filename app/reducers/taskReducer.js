import * as ACTIONS from 'constants/taskActionTypes';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loading: true,
  error: false,
  data: {},
  completed: false
});

function add(state, action) {
  return state.merge({
    data: action.task
  });
}

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
  return state.set('completed', true);
}

export default createReducer(initialState, {
  [ACTIONS.TASK_ADD]: add,
  [ACTIONS.TASK_LOAD_START]: loadStart,
  [ACTIONS.TASK_LOAD_END]: loadEnd,
  [ACTIONS.TASK_LOAD_ERROR]: loadError,
  [ACTIONS.TASK_SUCCESS]: success
});
