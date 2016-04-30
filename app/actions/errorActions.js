import {ERROR} from 'constants/errorActionTypes';

export function error(err) {
  return {
    type: ERROR,
    error: err
  };
}
