import * as ACTIONS from 'constants/taskActionTypes';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

function success(state, action) {
  return state.merge({
    entities: state.get('entities').set(action.task._id, action.task)
  });
}

const initialState = Immutable.fromJS({
  entities: {}
});

export default createReducer(initialState, {
  [ACTIONS.TASK_SUCCESS]: success
});
