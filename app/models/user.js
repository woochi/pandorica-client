import {Schema} from 'normalizr';

const User = new Schema('users', {
  idAttribute: '_id'
});

export default User;
