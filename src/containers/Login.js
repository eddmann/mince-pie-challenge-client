import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { login } from '../actions/user';

import './Login.css';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  state = { username: '', password: '' };

  onLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const from = (this.props.location.state && this.props.location.state.from.pathname) || '/';
    this.props.login(username, password, from);
  };

  onFormUpdate = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    return (
      <div className="Login">
        <Grid textAlign="center">
          <Grid.Column className="Form">
            <Header as="h2" color="teal" textAlign="center">
              Login
            </Header>
            {this.props.error && <Message error>{this.props.error}</Message>}
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  id="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onFormUpdate}
                />
                <Form.Input
                  fluid
                  id="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  value={this.state.password}
                  type="password"
                  onChange={this.onFormUpdate}
                />
                <Button loading={this.props.isLoggingIn} fluid color="blue" size="large" onClick={this.onLogin}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  isLoggingIn: login.isLoggingIn,
  error: login.error,
});

export default connect(mapStateToProps, { login })(Login);
