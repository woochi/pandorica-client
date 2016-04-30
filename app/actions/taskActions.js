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

export function success(points) {
  return {
    type: 'TASK_SUCCESS',
    points
  };
}

export function ok() {
  return {
    type: 'TASK_OK'
  };
}

export function submit() {
  return function(dispatch, getState) {
    const state = getState();
    const code = state.getIn(['form', 'task', 'code', 'value']);
    if (!!code) {
      dispatch(loadStart());
      api.post(`/me/tasks`, {code: code})
        .then((response) => {
          dispatch(success(response.points));
          dispatch(loadEnd());
        })
        .catch((err) => {
          dispatch(error(err));
          dispatch(loadEnd());
        });
    }
  }
}
