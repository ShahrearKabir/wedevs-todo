import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from './constants'

/**
 * Direct selector to the todo state domain
 */

const getVisibilityFilter = state => state && state.todo && state.todo.visibilityFilter
const getTodos = state => state && state.todo 



const selectTodoDomain = state => state.todo || initialState;

const makeSelectTodo = () =>
  createSelector(selectTodoDomain,substate => substate,);

const getVisibleTodos = () => createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todo) => {
      // console.log("visibilityFilter", visibilityFilter);
      if(visibilityFilter == SHOW_ALL){
        console.log("visibilityFilter_SHOW_ALL", todo);
        return todo.todos
      }
      else if(visibilityFilter == SHOW_COMPLETED){
        console.log("visibilityFilter_SHOW_COMPLETED", todo.todos.filter(t => t.completed));
        let setTodos = todo.todos.filter(t => t.completed)
        return setTodos
      }
      else if(visibilityFilter == SHOW_ACTIVE){
        console.log("visibilityFilter_SHOW_ACTIVE", todo.todos.filter(t => !t.completed));
        let setTodos = todo.todos.filter(t => !t.completed)
        return setTodos
      }
    }
  )

  const getCompletedTodoCount = createSelector(
    [getTodos],
    todos => (todo) =>
      
      todo && todo.todo && todo.todo.todos.reduce((count, todo) =>
        !todo.completed ? count + 1 : count,
          0
      )
      // return count;
      // console.log("......", todo && todo.todo && todo.todo.todos);
    
  )
  

export default makeSelectTodo;
export { selectTodoDomain, getVisibleTodos, getCompletedTodoCount };
