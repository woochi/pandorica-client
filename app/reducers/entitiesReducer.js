import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  notifications: {},
  tasks: {}
});

export default function(state = initialState, action) {
  if (action.response && action.response.entities) {
    return state.merge(action.response.entities);
  }
  return state;
}
