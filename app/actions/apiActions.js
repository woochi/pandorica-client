import {createAction} from 'redux-actions';
import {getNormalized as requestNormalized} from 'lib/api';
import {normalize} from 'normalizr';

export const getNormalized = createAction('API_GET', (url, schema) => {
  return requestNormalized(url, schema);
});
