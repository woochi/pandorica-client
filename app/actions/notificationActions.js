import api from 'lib/api';
import * as ACTIONS from 'constants/notificationActionTypes';

export function loadStart() {
  return {
    type: ACTIONS.NOTIFICATIONS_LOAD_START
  }
}

export function success(response) {
  return {
    type: ACTIONS.NOTIFICATIONS_LOAD_SUCCESS,
    notifications: response
  };
}

export function error(response) {
  return {
    type: ACTIONS.NOTIFICATIONS_LOAD_ERROR,
    error: response
  }
}

export function fetch() {
  return function(dispatch, getState) {
    dispatch(loadStart());
    return api.get('/notifications')
      .then((response) => {
        dispatch(success(response));
      })
      .catch((response) => {
        dispatch(error(response));
      });
  };
}

export function get(id) {
  return function(dispatch, getState) {
    dispatch(loadStart());
    return api.get(`/notifications/${id}`)
      .then((response) => {
        dispatch(success(response));
      })
      .catch((response) => {
        dispatch(error(response));
      });
  }
}
