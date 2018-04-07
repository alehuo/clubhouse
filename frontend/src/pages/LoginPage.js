import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { login } from "./../reducers/userReducer";

const FieldGroup = ({ id, label, help, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.submitLogin}>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Email address"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <Button type="submit" disabled={this.props.isLoggingIn}>
            {this.props.isLoggingIn ? "Logging in.." : "Login"}
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
