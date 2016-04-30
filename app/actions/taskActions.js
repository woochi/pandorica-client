import api from 'lib/api';

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

export function loadError(error) {
  return {
    type: 'TASK_LOAD_ERROR',
    error
  }
}

export function fetch() {
  return function(dispatch, getState) {
    dispatch(loadStart());
    api.get('/tasks')
      .then((task) => {
        console.log('DONE', task);
        dispatch(add(task))
        dispatch(loadEnd());
      })
      .catch((error) => {
        console.log('ERROR 2');
        dispatch(loadError(error))
      });
  }
}

export function skip() {
  return function(dispatch, getState) {
    dispatch(loadStart());
    api.destroy('/tasks')
      .then((nextTask) => {
        dispatch(add(nextTask));
        dispatch(loadEnd());
      }).catch((err) => {
        dispatch(loadError());
      });
  }
}

export function success(points) {
  return {
    type: 'TASK_SUCCESS',
    points
  };
}

export function complete() {
  return function(dispatch, getState) {
    const state = getState();
    const taskId = state.getIn(['task', 'data', '_id']);
    const code = state.getIn(['form', 'task', 'code', 'value']);
    if (!!code && !!taskId) {
      dispatch(loadStart());
      api.post(`/tasks/${taskId}`, {code: code})
        .then((response) => {
          dispatch(add(response));
          dispatch(loadEnd());
        })
        .catch((err) => {
          dispatch(loadEnd());
        });
    }
  }
}
