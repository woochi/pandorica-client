import api from 'lib/api';
import {error} from 'actions/errorActions';
import {loadStart as fetchLoadStart, loadEnd as fetchLoadEnd} from 'actions/loadingActions';
import {arrayOf} from 'normalizr';
import Task from 'models/task';
import {createAction} from 'redux-actions';

export function add(task) {
  return {
    type: 'TASK_ADD',
    task
  }
}

export function loadStart() {
  return {
    type: 'TASK_LOAD_START'
  }
}

export function loadEnd() {
  return {
    type: 'TASK_LOAD_END'
  }
}

export function success(task) {
  return {
    type: 'TASK_SUCCESS',
    task
  };
}

export function ok() {
  return {
    type: 'TASK_OK'
  };
}

export function fetch() {
  return function(dispatch, getState) {
    dispatch(fetchLoadStart('tasks'));
    return api.getNormalized(`/tasks`, arrayOf(Task))
      .then((response) => {
        dispatch(createAction('TASK_FETCH_SUCCESS')(response));
      })
      .catch((err) => {
        dispatch(error(err));
      })
      .then(() => {
        dispatch(fetchLoadEnd('tasks'));
      });
  }
}

export function get(id) {
  return function(dispatch, getState) {
    dispatch(loadStart());
    return api.get(`/tasks/${id}`)
      .then((response) => {
        dispatch(success(response));
      })
      .catch((err) => {
        dispatch(error(err));
      })
      .then(() => {
        dispatch(loadEnd());
      });
  }
}

export function submit(code) {
  return function(dispatch, getState) {
    const state = getState();
    if (!!code) {
      dispatch(loadStart());
      return api.post(`/me/tasks`, {code: code})
        .then((response) => {
          dispatch(success(response));
          dispatch(loadEnd());
          return response;
        })
        .catch((err) => {
          dispatch(error(err));
          dispatch(loadEnd());
          throw err;
        });
    }
    return Promise.reject(new Error('Type in the quest code'));
  }
}
