import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

const RouteWithTitle = ({ title, ...rest }) => {
  return (
    <>
      {title && <DocumentTitle title={title + ' | Storyteller'} />}
      <Route {...rest} />
    </>
  );
};

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  <RouteWithTitle
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to='/sign-in' />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
