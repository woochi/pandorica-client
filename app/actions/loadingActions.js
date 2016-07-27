import {createAction} from 'redux-actions';

import {LOAD_START, LOAD_END} from 'constants/loadingActionTypes';

export const loadStart = createAction(LOAD_START);
export const loadEnd = createAction(LOAD_END);
