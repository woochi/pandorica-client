import {Schema} from 'normalizr';
import Task from './task';

const Quest = new Schema('quests', {
  idAttribute: '_id'
});

export default Quest;
