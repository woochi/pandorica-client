import * as ACTIONS from '../constants/taskActionTypes'

export function createTask() {
  return {
    type: ACTIONS.TASK_CREATE
  }
}

export function createTaskSuccess() {
  return {
    type: ACTIONS.TASK_CREATE_SUCCESS
  }
}

export function createTaskError() {
  return {
    type: ACTIONS.TASK_CREATE_ERROR
  }
}
