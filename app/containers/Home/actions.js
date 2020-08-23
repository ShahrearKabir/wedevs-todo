/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, ADD_TODO_VALUE, ADD_TODO_CHANGE_STATUS, GET_FILTERED_VALUE, DELETE_TODO_VALUE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addTodoValue(setTodoValue) {
  console.log('action', setTodoValue)
  return {
    type: ADD_TODO_VALUE,
    setTodoValue
  };
}

export function addToChangeStatus(index, status) {
  let indexAndStatus = {
    index: index,
    status: status
  }
  console.log('action', indexAndStatus)
  return {
    type: ADD_TODO_CHANGE_STATUS,
    indexAndStatus
  };
}

export function getFilteredValue(item, status) {
  let itemAndStatusFiltered = {
    item: item,
    status: status
  }
  console.log('action', itemAndStatusFiltered)
  return {
    type: GET_FILTERED_VALUE,
    itemAndStatusFiltered
  };
}

export function getDeleteValue(index) {
  console.log('action', index)
  return {
    type: DELETE_TODO_VALUE,
    index
  };
}

// getDeleteValue
