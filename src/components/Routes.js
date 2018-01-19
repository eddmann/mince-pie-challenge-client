import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Register from '../containers/Register';
import Login from '../containers/Login';
import Add from '../containers/Add';
import Browse from '../containers/Browse';
import View from '../containers/View';
import NotFound from '../components/NotFound';

const PrivateRoute = ({ component: Component, isAuthenticated, path }) =>
  <Route path={path} exact render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  )} />;
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

const PublicRoute = ({ component: Component, isAuthenticated, path }) =>
  <Route path={path} exact render={props => (
    !isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
  )} />;
PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

const Routes = ({ isAuthenticated }) =>
  <Switch>
    <PublicRoute isAuthenticated={isAuthenticated} path="/register" component={Register} />
    <PublicRoute isAuthenticated={isAuthenticated} path="/login" component={Login} />
    <PrivateRoute isAuthenticated={isAuthenticated} path="/add" component={Add} />
    <Route path="/pies/:id" exact component={View} />
    <Route path="/" exact component={Browse} />
    <Route path="*" exact component={NotFound} />
  </Switch>;
Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Routes;
