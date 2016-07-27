import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  notifications: {},
  tasks: {}
});

export default function(state = initialState, action) {
  if (action.payload && action.payload.entities) {
    return state.mergeDeep(action.payload.entities);
  }
  return state;
}
