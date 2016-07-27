import {Schema} from 'normalizr';

const Message = new Schema('messages', {
  idAttribute: '_id'
});

export default Message;
