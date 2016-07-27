import {Schema, arrayOf} from 'normalizr';
import Message from './message';

const Faction = new Schema('factions', {
  idAttribute: 'name'
});

Faction.define({
  messages: arrayOf(Message)
});

export default Faction;
