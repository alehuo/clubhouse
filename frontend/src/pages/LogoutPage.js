import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deAuthenticateUser } from "./../reducers/authenticationReducer";
import { successMessage } from "./../reducers/notificationReducer";

export class LogoutPage extends Component {
  componentWillMount = () => {
    localStorage.clear();
    this.props.deAuthenticateUser();
    this.props.successMessage("You have been logged out.");
  };

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deAuthenticateUser,
  successMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
