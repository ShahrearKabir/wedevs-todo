import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the todoHome state domain
 */

const selectTodoHomeDomain = state => state.todoHome || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TodoHome
 */

const makeSelectTodoHome = () =>
  createSelector(
    selectTodoHomeDomain,
    substate => substate,
  );

export default makeSelectTodoHome;
export { selectTodoHomeDomain };
