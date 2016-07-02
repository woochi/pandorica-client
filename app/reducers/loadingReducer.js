import {handleActions} from 'redux-actions';
import * as ACTIONS from 'constants/loadingActionTypes';
import Immutable from 'immutable';

function loadStart(state, action) {
  return state.merge({
    [action.payload]: true
  });
}

function loadEnd(state, action) {
  return state.merge({
    [action.payload]: false
  });
}

const initialState = Immutable.Map();

export default handleActions({
  [ACTIONS.LOAD_START]: loadStart,
  [ACTIONS.LOAD_END]: loadEnd
}, initialState);
