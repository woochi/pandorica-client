import {Schema} from 'normalizr';
import Faction from './faction';

const Message = new Schema('messages', {
  idAttribute: '_id'
});

Message.define({
  faction: Faction
});

export default Message;
