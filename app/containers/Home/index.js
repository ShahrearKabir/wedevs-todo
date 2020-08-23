/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome, { makeSelectGetAllTodoValue } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { addTodoValue, addToChangeStatus, getFilteredValue, getDeleteValue } from './actions'


// let totalData = []

// let getItemByStatus = (props, status) =>{
//   console.log("STATUS", props, status);

//   if(status == 1){
//     totalData = props.filter(item => item.status == status)
//   }
//   else if(status == 2){
//     totalData = props.filter(item => item.status == status)
//   }
//   else if(status == 3){
//     totalData = props.filter(item => item.status == status)
//   }

//   console.log("totalData", totalData);

// }


export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  
  console.log("PROPS.getAllTodoValue", props.getAllTodoValue);

  

  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}

      <div className="container">
        <div className="row">
          <div className="col-12 m-2">
            <h1><center>todos</center></h1>
          </div>

          <div className="col-12 m-2">
            <div className="card">
              <div className="card-header">
                <input 
                  id="new-task" 
                  className="form-control" 
                  type="text" 
                  // onkeypress="handleChange()"
                  onKeyPress={ props.checkEnterPress }
                />
                
              </div>
              <div className="card-body">
                <ul id="incomplete-tasks">
                  {
                    props.getAllTodoValue.setTodoFilteredValue.length > 0?

                      props.getAllTodoValue.setTodoFilteredValue.map((item,index) =>{

                        return(
                          <li key={ index } className="d-flex justify-content-around align-items-center">
                          <input type="radio" className="form-check-input mr-3" onChange={ e => props.addToChangeStatus(index, 3) }/>
                          <label style={ item.status == 3 ? {textDecoration: 'line-through'} : {}}>{ item.textValue }</label>
                          <input type="text" className="form-control" />
                          <button className="delete" onClick={ e => props.deleteTodoItem(index) }>Delete</button>
                        </li>
                        )
                      })
                      :
                      props.getAllTodoValue.setTodoValue.map((item,index) =>{

                        return(
                          <li key={ index } className="d-flex justify-content-around align-items-center">
                          <input type="radio" className="form-check-input mr-3" onChange={ e => props.addToChangeStatus(index, 3) }/>
                          <label style={ item.status == 3 ? {textDecoration: 'line-through'} : {}}>{ item.textValue }</label>
                          <input type="text" className="form-control" />
                          <button className="delete" onClick={ e => props.deleteTodoItem(index) }>Delete</button>
                        </li>
                        )
                      })
                  }
                  
                </ul>
                <ul id="completed-tasks"></ul>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-around align-items-center">
                  <span className="text-secondary" id="total-items">
                    { 
                      props.getAllTodoValue.setTodoValue.length > 0 ? 
                        props.getAllTodoValue.setTodoValue.length + " items" 
                        :props.getAllTodoValue.setTodoValue.length + " item" 
                    }
                    </span>

                  <span className="d-flex justify-content-center" style={{flex: "1 0 auto"}}>
                    <span 
                      className="btn btn-light m-1" 
                      onClick={ e => props.getItemByStatus(props.getAllTodoValue.setTodoValue, null)}
                    >All</span>
                    <span 
                      className="btn btn-light m-1" 
                      onClick={e => props.getItemByStatus(props.getAllTodoValue.setTodoValue, 1)}
                    >Active</span>
                    <span 
                      className="btn btn-light m-1" 
                      onClick={e => props.getItemByStatus(props.getAllTodoValue.setTodoValue, 3)}
                    >Completed</span>
                  </span>
                  
                  <span 
                    className="btn btn-light" 
                    // onclick="clearCompletedItems()"
                  ><u>Clear Completed</u></span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  getAllTodoValue: makeSelectGetAllTodoValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    checkEnterPress: e => {
      var keyPressed = event.keyCode || event.which;
      if(keyPressed==13){
        console.log('test...', e.target.value);
        let allValue = {
          textValue: e.target.value,
          status: 1
        }
        dispatch(addTodoValue(allValue))
        e.target.value = ''
      }
    },

    addToChangeStatus: (index, status) => {
      console.log('test...', index, status);
        
      dispatch(addToChangeStatus(index, status))
    },

    getItemByStatus: (item, status) =>{
      console.log('itemtest...', item, status);
      dispatch(getFilteredValue(item, status))
    },

    deleteTodoItem: (index) =>{
      console.log('itemtest...', index);
      dispatch(getDeleteValue(index))
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
