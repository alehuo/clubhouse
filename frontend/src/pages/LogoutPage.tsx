import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deAuthenticateUser } from "./../reducers/actions/authenticationActions";
import { successMessage } from "./../reducers/notificationReducer";
import { setWatchCheckInterval } from "./../reducers/sessionReducer";

export class LogoutPage extends React.Component<any, any> {
  public componentWillMount = () => {
    clearInterval(this.props.watchInterval);
    this.props.setWatchCheckInterval(null);
    localStorage.clear();
    this.props.deAuthenticateUser();
    this.props.successMessage("You have been logged out.");
  }

  public render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state: any) => ({
  watchInterval: state.watch.watchCheckInterval,
});

const mapDispatchToProps = {
  deAuthenticateUser,
  successMessage,
  setWatchCheckInterval,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
