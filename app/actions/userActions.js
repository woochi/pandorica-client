import {createAction} from 'redux-actions';
import {getNormalized, putNormalized} from 'lib/api';
import User from 'models/user';

export const fetch = createAction('USER_FETCH', () => {
  return getNormalized('/me', User);
});

export const update = createAction('USER_UPDATE', (data) => {
  return putNormalized('/me', data, User);
});
