/*
 *
 * Todo reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  SET_VISIBILITY_FILTER
 } from './constants';

 import { SHOW_ALL } from './constants'
 import { combineReducers } from 'redux'

export const initialState = [
  // {...todos1}
  {
    text: 'Todo List',
    completed: false,
    id: 0
  }
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    // case SET_VISIBILITY_FILTER:
    //   // return action.filter
    //   return [
    //     ...state,
    //     {filter: action.filter}
    //   ]

    default:
      return state
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", action.filter);
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todo = combineReducers({
  todos,
  visibilityFilter
})

export default todo

// export default visibilityFilter
