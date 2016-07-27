import {Map} from 'immutable';
import {handleActions} from 'redux-actions';
import {fetch} from 'actions/userActions';

const initialState = new Map();

const mergeUser = (state, action) => {
  return state.merge(action.payload.entities.users[action.payload.result]);
}

export default handleActions({
  ['USER_FETCH_FULFILLED']: mergeUser,
  ['USER_UPDATE_FULFILLED']: mergeUser
}, initialState);
