import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { register, confirmRegistration } from '../actions/user';

import './Register.css';

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    confirmRegistration: PropTypes.func.isRequired,
    isRegistering: PropTypes.bool.isRequired,
    error: PropTypes.string,
    username: PropTypes.string,
  };

  state = {
    username: '',
    email: '',
    password: '',
    code: '',
  };

  onRegister = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.register(username, email, password);
  };

  onConfirm = e => {
    e.preventDefault();
    const { code } = this.state;
    this.props.confirmRegistration(this.props.username, code);
  };

  onFormUpdate = e => this.setState({ [e.target.id]: e.target.value });

  renderRegistrationForm = () => {
    return (
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
            id="email"
            icon="mail"
            iconPosition="left"
            placeholder="E-mail address"
            value={this.state.email}
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
          <Button fluid color="blue" loading={this.props.isRegistering} size="large" onClick={this.onRegister}>
            Register
          </Button>
        </Segment>
      </Form>
    );
  };

  renderConfirmForm = () => {
    return (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            id="code"
            icon="lock"
            iconPosition="left"
            placeholder="Code"
            value={this.state.code}
            onChange={this.onFormUpdate}
          />
          <Button fluid color="blue" loading={this.props.isRegistering} size="large" onClick={this.onConfirm}>
            Confirm
          </Button>
        </Segment>
      </Form>
    );
  };

  render() {
    return (
      <div className="Register">
        <Grid textAlign="center">
          <Grid.Column className="Form">
            <Header as="h2" color="teal" textAlign="center">
              {this.props.username ? `Confirm '${this.props.username}'` : 'Register'}
            </Header>
            {this.props.error && <Message error>{this.props.error}</Message>}
            {this.props.username ? this.renderConfirmForm() : this.renderRegistrationForm()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ registration }) => ({
  isRegistering: registration.isRegistering,
  error: registration.error,
  username: registration.username,
});

export default connect(mapStateToProps, { register, confirmRegistration })(Register);
