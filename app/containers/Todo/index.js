/**
 *
 * Todo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTodo, { getVisibleTodos, getCompletedTodoCount } from './selectors';
import reducer from './reducer';
import messages from './messages';
import { addTodo, setVisibilityFilter, completeTodo, deleteTodo, clearCompleted } from './actions';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from './constants';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}


export function Todo(props) {
  useInjectReducer({ key: 'todo', reducer });

  console.log("filteredTodos", props);

  let editing = false
  const handleDoubleClick = (e) =>{
    console.log("editing", editing);
    editing = true
  }

  const handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }


  return (
    <div className="todoapp">
      <Helmet>
        <title>Todo</title>
        <meta name="description" content="Description of Todo" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}

      <header className="header">
        <h1>todos</h1>
        <input 
          className="new-todo"

          onBlur={e => props.handleBlur(e, props)}
          onChange={e => props.handleChange}
          onKeyDown={e => props.handleSubmit(e, props)}
          // className={
          // classnames({
          //   edit: this.props.editing,
          //   'new-todo': this.props.newTodo
          // })}
          // type="text"
          // placeholder={this.props.placeholder}
          // autoFocus={true}
          // value={this.state.text}
          // onBlur={this.handleBlur}
          // onChange={this.handleChange}
          // onKeyDown={this.handleSubmit} 
        />
        {/* <TodoTextInput
          newTodo
          onSave={(text) => {
            if (text.length !== 0) {
              addTodo(text)
            }
          }}
          placeholder="What needs to be done?"
        /> */}
      </header>

      <section className="main">
        <span><input className="toggle-all" type="checkbox" /><label></label></span>
        <ul className="todo-list">
          {
            !props.filteredTodos ? "":
              props && props.filteredTodos.map(todo =>
                // <TodoItem key={todo.id} todo={todo} {...actions} />
                <li className="" key={todo.id}>
                  
                  {
                    editing ?
                    <input 
                      className="new-todo"

                      onBlur={e => props.handleBlur(e, props)}
                      onChange={e => props.handleChange}
                      onKeyDown={e => props.handleSubmit(e, props)}
                      // className={
                      // classnames({
                      //   edit: this.props.editing,
                      //   'new-todo': this.props.newTodo
                      // })}
                      // type="text"
                      // placeholder={this.props.placeholder}
                      // autoFocus={true}
                      // value={this.state.text}
                      // onBlur={this.handleBlur}
                      // onChange={this.handleChange}
                      // onKeyDown={this.handleSubmit} 
                    />
                    :
                    <div className="view">
                      <input 
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => props.completeTodo(todo.id)}
                      />
                      <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
                      <button 
                        className="destroy"
                        onClick={() => props.deleteTodo(todo.id)}
                        ></button>
                    </div>
                  }
                  
                  
                </li>
              )}
          {/* <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>asdad</label>
              <button className="destroy"></button>
            </div>
          </li> */}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
        <strong>
          {
              !props.completedCount ? 0:
                props.completedCount
          }
          </strong> item left
        </span>
        <ul className="filters">
          {Object.entries(FILTER_TITLES).map(([filter, value]) =>
            <li key={filter}>
              <a
                className={{ selected: 'active' }}
                style={{ cursor: 'pointer' }}
                onClick={() => props.setFilter(filter)}
              >
                {value}
              </a>
            </li>
          )}
        </ul>
        <button
          className="clear-completed"
          onClick={props.onClearCompleted}
        >Clear completed</button>
      </footer>

    </div>
  );
}

Todo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todo: makeSelectTodo(),
  filteredTodos: getVisibleTodos(),
  // todosCount: state.todos.length,
  completedCount: getCompletedTodoCount()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmit : (e, props) => {
      const text = e.target.value.trim()
      // console.log(text);
      if (e.which === 13) {
        dispatch(addTodo(text))
        e.target.value = ''
        // if (props.newTodo) {
        //   this.setState({ text: '' })
        // }
      }
    },
  
    handleChange : e => {
      this.setState({ text: e.target.value })
    },
  
    handleBlur : (e, props) => {
      // if (!props.newTodo) {
      //   addTodo(e.target.value)
      // }
    },
    // actions: () => dispatch(bindActionCreators(TodoActions, dispatch))

    setFilter: (filter) => {
      dispatch(setVisibilityFilter(filter))
    },

    completeTodo: id => dispatch(completeTodo(id)),
    deleteTodo: id => dispatch(deleteTodo(id)),

    onClearCompleted: () => dispatch(clearCompleted()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Todo);
