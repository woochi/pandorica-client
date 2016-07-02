import createSocket from 'socket.io-client';
import api from './api';

let socket;

export function connect() {
  const apiUrl = api.getAPIUrl();
  socket = createSocket(apiUrl);
  return socket;
}

export function config() {

}

export default socket;
