import api from 'lib/api';
import * as ACTIONS from 'constants/questActionTypes';
import Quest from 'models/quest';
import {arrayOf} from 'normalizr';
import {loadStart, loadEnd} from 'actions/loadingActions';
import {createAction} from 'redux-actions';

export function success(response) {
  return {
    type: ACTIONS.QUESTS_LOAD_SUCCESS,
    response
  };
}

export function error(response) {
  return {
    type: ACTIONS.QUESTS_LOAD_ERROR,
    error: response
  }
}

export function fetch() {
  return function(dispatch, getState) {
    dispatch(loadStart('quests'));
    return api.getNormalized('/quests', arrayOf(Quest))
      .then((response) => {
        dispatch(createAction('QUESTS_LOAD_SUCCESS')(response));
      })
      .catch((response) => {
        dispatch(error(response));
      })
      .then(() => {
        dispatch(loadEnd('quests'));
      });
  };
}

export function get(id) {
  return function(dispatch, getState) {
    dispatch(loadStart('quests'));
    return api.getNormalized(`/quests/${id}`, Quest)
      .then((response) => {
        dispatch(success(response));
      })
      .catch((response) => {
        dispatch(error(response));
      })
      .then(() => {
        dispatch(loadEnd('quests'));
      });
  }
}

export const submit = createAction('QUEST_SUBMIT', (id, code) => {
  if (!code) {
    return Promise.reject('Enter quest code.');
  }
  return api.postNormalized(`/quests/${id}`, {code}, Quest);
});
