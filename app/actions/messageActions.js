import {connect} from 'lib/socket';
import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';
import api from 'lib/api';
import Message from 'models/message';

export const addMessage = createAction('ADD_MESSAGE');

export const sendMessage = createAction('SEND_MESSAGE', (message, faction) => {
  let endpoint;
  if (!faction) {
    endpoint = '/messages';
  } else {
    endpoint = `/factions/${faction}/messages`;
  }
  const messageModel = {content: message};
  return api.postNormalized(endpoint, messageModel, Message);
});
