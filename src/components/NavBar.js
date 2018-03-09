import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NavItem = props => (
  <Route
    path={props.to}
    exact
    children={({ match, history }) => (
      <Menu.Item onClick={e => history.push(e.currentTarget.getAttribute('to'))} as="a" active={!!match} {...props}>
        {props.children}
      </Menu.Item>
    )}
  />
);
NavItem.propTypes = {
  to: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

const NavBar = ({ isAuthenticated, onLogout }) => (
  <Menu stackable>
    <Link to="/">
      <Menu.Item header>Mince Pie Challenge</Menu.Item>
    </Link>
    {isAuthenticated && (
      <NavItem to="/add">
        <Icon name="add" /> Add
      </NavItem>
    )}
    <Menu.Menu position="right">
      {!isAuthenticated && (
        <NavItem to="/register">
          <Icon name="pencil" /> Register
        </NavItem>
      )}
      {!isAuthenticated && (
        <NavItem to="/login">
          <Icon name="lock" /> Login
        </NavItem>
      )}
      {isAuthenticated && (
        <NavItem active={false} onClick={onLogout}>
          <Icon name="unlock alternate" /> Logout
        </NavItem>
      )}
    </Menu.Menu>
  </Menu>
);
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;
