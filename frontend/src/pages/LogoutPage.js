import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deAuthenticateUser } from "./../reducers/authenticationReducer";
import { successMessage } from "./../reducers/notificationReducer";
import { setWatchCheckInterval } from "./../reducers/watchReducer";

export class LogoutPage extends Component {
  componentWillMount = () => {
    clearInterval(this.props.watchInterval);
    this.props.setWatchCheckInterval(null);
    localStorage.clear();
    this.props.deAuthenticateUser();
    this.props.successMessage("You have been logged out.");
  };

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  watchInterval: state.watch.watchCheckInterval
});

const mapDispatchToProps = {
  deAuthenticateUser,
  successMessage,
  setWatchCheckInterval
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
