/*
 *
 * Todo actions
 *
 */

import { DEFAULT_ACTION, ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL_TODOS, CLEAR_COMPLETED, SET_VISIBILITY_FILTER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const addTodo = text => ({ type: ADD_TODO, text })
export const deleteTodo = id => ({ type: DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: EDIT_TODO, id, text })
export const completeTodo = id => ({ type: COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({ type: SET_VISIBILITY_FILTER, filter})
