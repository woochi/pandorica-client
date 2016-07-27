import {Schema} from 'normalizr';
import Faction from './Faction';

const Message = new Schema('messages', {
  idAttribute: '_id'
});

Message.define({
  faction: Faction
});

export default Message;
