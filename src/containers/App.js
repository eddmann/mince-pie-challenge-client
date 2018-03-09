/* global setTimeout */

import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';
import Routes from '../components/Routes';
import NavBar from '../components/NavBar';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, clearSuccessMessage } from '../actions/user';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    clearSuccessMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.successMessage) {
      setTimeout(() => this.props.clearSuccessMessage(), 5000);
    }
  }

  onLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, successMessage } = this.props;

    return (
      <Container className="App">
        <NavBar isAuthenticated={isAuthenticated} onLogout={this.onLogout} />
        {successMessage && <Message success>{successMessage}</Message>}
        <Routes isAuthenticated={isAuthenticated} />
      </Container>
    );
  }
}

const mapStateToProps = ({ isAuthenticated, successMessage }) => ({
  isAuthenticated,
  successMessage,
});

export default withRouter(connect(mapStateToProps, { logout, clearSuccessMessage })(App));
