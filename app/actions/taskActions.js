import api from 'lib/api';
import {error} from 'actions/errorActions';

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
        })
        .catch((err) => {
          dispatch(error(err));
          dispatch(loadEnd());
        });
    }
  }
}
