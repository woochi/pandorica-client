import 'whatwg-fetch';
import _ from 'lodash';
import {normalize} from 'normalizr';

export function getAPIUrl() {
  const host = window.location.host.split(':')[0];
  if (host === 'app.ropecon.fi') {
    return `${window.location.protocol}//api.ropecon.fi`;
  } else {
    return `${window.location.protocol}//${host}:35005`;
  }
}

const API_URL = getAPIUrl();

function formatOptions(options) {
  var defaults = {
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const auth = localStorage.getItem('auth');

  if (auth) {
    _.extend(defaults.headers, {
      'Authorization': `Basic ${auth}`
    });
  }

  return _.extend(defaults, options);
}

function getAPIUrlForPath(path) {
  return API_URL + path;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    if (response.status === 403) {
      logOut().then(() => {
        window.history.replaceState({}, '', '/');
        window.location = '/';
      });
    }
    return new Promise((resolve, reject) => {
      response.json().then((error) => {
        reject(error);
      });
    });
  }
}

function retry(method) {
  return method().then(undefined, (err) => {

  });
}

function parseJSON(response) {
  return response.json();
}

function request(path, options, retry = 0) {
  return fetch(getAPIUrlForPath(path), formatOptions(options))
    .then(checkStatus)
    .then(parseJSON);
}

export function get(path, options = {}) {
  return request(path, options);
}

export function getNormalized(path, schema) {
  return get(path, {}, schema)
    .then((data) => {
      return normalize(data, schema);
    });
}

export function post(path, data, options = {}) {
  return request(path, _.extend(options, {
    method: 'post',
    body: JSON.stringify(data)
  }));
}

export function postNormalized(path, data, schema) {
  return post(path, data)
    .then((data) => normalize(data, schema));
}

export function put(path, data, options = {}) {
  return request(path, _.extend(options, {
    method: 'put',
    body: JSON.stringify(data)
  }));
}

export function putNormalized(path, data, schema) {
  return put(path, data)
    .then((data) => normalize(data, schema));
}

export function signUp(data) {
  return post('/signup', data).then((response) => {
    persistAuthentication(data.email, data.password)
  });
}

export function logIn(data) {
  return post('/login', data).then((response) => {
    persistAuthentication(data.email, data.password);
  });
}

export function isLoggedIn() {
  return localStorage.getItem('auth') !== null;
}

function persistAuthentication(email, password) {
  const auth = btoa(`${email}:${password}`);
  localStorage.setItem('auth', auth);
}

export function logOut() {
  return new Promise((resolve) => {
    resolve(localStorage.removeItem('auth'));
  });
}

function destroy(path) {
  return request(path, {
    method: 'delete'
  });
}

export default {
  get,
  getAPIUrl,
  post,
  destroy,
  signUp,
  logIn,
  isLoggedIn,
  logOut,
  getNormalized,
  postNormalized
};
