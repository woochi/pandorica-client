import createSocket from 'socket.io-client';
import api from './api';
import {addMessage} from 'actions/messageActions';
import store from 'store';
import Faction from 'models/faction';
import Message from 'models/message';
import {normalize} from 'normalizr';

export function connect() {
  const apiUrl = api.getAPIUrl();
  return config(createSocket(apiUrl));
}

export function config(socket) {
  socket.on('message', (message) => {
    store.dispatch(addMessage(normalize(message, Message)));
  });
}
