import * as ACTIONS from 'constants/notificationActionTypes';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loading: false,
  data: []
});

function loadStart(state, action) {
  return state.set('loading', true);
}

function loadSuccess(state, action) {
  return state.merge({
    loading: false,
    data: action.notifications
  });
}

function loadError(state, action) {
  return state.set('loading', false);
}

export default createReducer(initialState, {
  [ACTIONS.NOTIFICATIONS_LOAD_START]: loadStart,
  [ACTIONS.NOTIFICATIONS_LOAD_SUCCESS]: loadSuccess,
  [ACTIONS.NOTIFICATIONS_LOAD_ERROR]: loadError
});
