import 'whatwg-fetch';
import _ from 'lodash';

const API_URL = 'http://192.168.0.228:8081'

function formatOptions(options) {
  var defaults = {
    credentials: 'same-origin',
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

export function post(path, data, options = {}) {
  return request(path, _.extend(options, {
    method: 'post',
    body: JSON.stringify(data)
  }));
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
  post,
  destroy,
  signUp,
  logIn,
  isLoggedIn,
  logOut
};
