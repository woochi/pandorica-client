import {createAction} from 'redux-actions';
import {getNormalized as requestNormalized, putNormalized as apiPutNormalized} from 'lib/api';
import {normalize} from 'normalizr';

export const getNormalized = createAction('API_GET', (url, schema) => {
  return requestNormalized(url, schema);
});

export const putNormalized = createAction('API_PUT', (url, data, schema) => {
  return apiPutNormalized(url, data, schema);
});
