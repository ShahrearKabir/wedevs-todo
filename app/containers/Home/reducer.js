/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ADD_TODO_VALUE, ADD_TODO_CHANGE_STATUS, GET_FILTERED_VALUE, DELETE_TODO_VALUE } from './constants';

export const initialState = {
  setTodoValue: [],
  setTodoFilteredValue: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case ADD_TODO_VALUE:
        return { 
          ...state,
          setTodoValue: [...state.setTodoValue, action.setTodoValue]
        }

      case ADD_TODO_CHANGE_STATUS:
        state.setTodoValue[action.indexAndStatus.index].status = action.indexAndStatus.status
        return {
          ...state,
          setTodoValue:[
            ...state.setTodoValue,
          ],
        
        };

      case GET_FILTERED_VALUE:
        let filteredElement = []

        if(action.itemAndStatusFiltered.status){
          filteredElement = state.setTodoValue.filter(item => item.status == action.itemAndStatusFiltered.status)
        }
        else{
          filteredElement = [...state.setTodoValue]
        }
        
        return { 
          ...state,
          setTodoFilteredValue: [ ...filteredElement]
        }

      case DELETE_TODO_VALUE:
        let deleteElement = []

        if(action.index){
          state.setTodoValue.splice(action.index, 1)
        }
        else{
          deleteElement = [...state.setTodoValue]
        }
        
        return { 
          ...state,
          setTodoFilteredValue: [ ...deleteElement]
        }
    }
  });

export default homeReducer;
