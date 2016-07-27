import api from 'lib/api';
import * as ACTIONS from 'constants/notificationActionTypes';
import Notification from 'models/notification';
import {arrayOf} from 'normalizr';
import {loadStart, loadEnd} from 'actions/loadingActions';
import {createAction} from 'redux-actions';

export function success(response) {
  return {
    type: ACTIONS.NOTIFICATIONS_LOAD_SUCCESS,
    response
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
    dispatch(loadStart('notifications'));
    return api.getNormalized('/notifications', arrayOf(Notification))
      .then((response) => {
        dispatch(createAction('NOTIFICATIONS_LOAD_SUCCESS')(response));
      })
      .catch((response) => {
        dispatch(error(response));
      })
      .then(() => {
        dispatch(loadEnd('notifications'));
      });
  };
}

export function get(id) {
  return function(dispatch, getState) {
    dispatch(loadStart('notifications'));
    return api.getNormalized(`/notifications/${id}`, Notification)
      .then((response) => {
        dispatch(success(response));
      })
      .catch((response) => {
        dispatch(error(response));
      })
      .then(() => {
        dispatch(loadEnd('notifications'));
      });
  }
}
