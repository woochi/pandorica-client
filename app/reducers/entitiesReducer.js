import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  notifications: {},
  tasks: {}
});

export default function(state = initialState, action) {
  if (action.payload && action.payload.entities) {
    console.log('BEFORE', state.toJS());
    console.log('MERGE', state.mergeDeep(action.payload.entities).toJS());
    return state.mergeDeep(action.payload.entities);
  }
  return state;
}
