import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "./../reducers/actions/userActions";

import { RootState } from "../reduxStore";
import LoginForm from "./../forms/LoginForm";

interface Props {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  login: any;
}

export class LoginPage extends React.Component<Props> {
  public submitLogin = (values: any) => {
    this.props.login(values.email, values.password);
  }

  public render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <h1>Login</h1>
        <LoginForm
          onSubmit={this.submitLogin}
          isLoggingIn={this.props.isLoggingIn}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
