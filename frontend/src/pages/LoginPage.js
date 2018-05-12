import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "./../reducers/userReducer";

import LoginForm from "./../forms/LoginForm";

export class LoginPage extends Component {
  submitLogin = values => {
    // print the form values to the console
    console.log(values);
    this.props.login(values.email, values.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <h1>Login</h1>
        <LoginForm onSubmit={this.submitLogin} />
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
