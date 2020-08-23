/**
 *
 * TodoHome
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
import makeSelectTodoHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TodoHome() {
  useInjectReducer({ key: 'todoHome', reducer });
  useInjectSaga({ key: 'todoHome', saga });

  return (
    <div>
      <Helmet>
        <title>TodoHome</title>
        <meta name="description" content="Description of TodoHome" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TodoHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todoHome: makeSelectTodoHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TodoHome);
