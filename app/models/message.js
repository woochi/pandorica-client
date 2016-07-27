import {Schema} from 'normalizr';
import User from './user';

const Message = new Schema('messages', {
  idAttribute: '_id'
});

Message.define({
  user: User
});

export default Message;
