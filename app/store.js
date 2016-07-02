import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import errorReducer from './reducers/errorReducer';
import taskReducer from './reducers/taskReducer';
import tasksReducer from './reducers/tasksReducer';
import {reducer as formReducer} from 'redux-form';
import entitiesReducer from './reducers/entitiesReducer';
import loadingReducer from './reducers/loadingReducer';

const immutableFormReducer = (state = Immutable.fromJS({}), action) => Immutable.fromJS(formReducer(state.toJS(), action));

const logger = createLogger();
const reducer = combineReducers({
  loading: loadingReducer,
  entities: entitiesReducer,
  error: errorReducer,
  task: taskReducer,
  form: immutableFormReducer,
  tasks: tasksReducer
});

const initialState = Immutable.fromJS({});

export default createStore(reducer, initialState, applyMiddleware(thunk, logger));
