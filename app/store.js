import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import errorReducer from './reducers/errorReducer';
import taskReducer from './reducers/taskReducer';
import {reducer as formReducer} from 'redux-form';

const immutableFormReducer = (state = Immutable.fromJS({}), action) => Immutable.fromJS(formReducer(state.toJS(), action));

const logger = createLogger();
const reducer = combineReducers({
  error: errorReducer,
  task: taskReducer,
  form: immutableFormReducer
});
const state = Immutable.fromJS({});

const initialState = reducer(state);

export default createStore(reducer, initialState, applyMiddleware(thunk, logger));
