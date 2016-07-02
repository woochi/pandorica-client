import {Schema} from 'normalizr';
import Task from './task';

const Notification = new Schema('notifications', {
  idAttribute: '_id'
});

Notification.define({
  task: Task
});

export default Notification;
