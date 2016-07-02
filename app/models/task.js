import {Schema} from 'normalizr';

const Task = new Schema('tasks', {
  idAttribute: '_id'
});

export default Task;
