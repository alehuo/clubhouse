import React from "react";
import { connect } from "react-redux";

import { addUser } from "./../reducers/actions/userActions";

import { RootState } from "../reduxStore";
import RegisterForm from "./../forms/RegisterForm";

export class RegisterPage extends React.Component<any> {
  public handleSubmit = (values: any) => {
    this.props.addUser(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      },
      this.props.token,
    );
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <RegisterForm
          onSubmit={this.handleSubmit}
          isRegistering={this.props.isRegistering}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isRegistering: state.user.isRegistering,
});

const mapDispatchToProps = {
  addUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage);
