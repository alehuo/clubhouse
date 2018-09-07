import React, { Component } from "react";
import { connect } from "react-redux";

import { addUser } from "./../reducers/userReducer";

import RegisterForm from "./../forms/RegisterForm";

export class RegisterPage extends Component {
  handleSubmit = values => {
    this.props.addUser(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password
      },
      this.props.token
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <RegisterForm onSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
