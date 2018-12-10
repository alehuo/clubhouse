import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../reduxStore";
import { deAuthenticateUser } from "./../reducers/actions/authenticationActions";
import { successMessage } from "./../reducers/actions/notificationActions";
import { setSessionCheckInterval } from "./../reducers/actions/sessionActions";

interface Props {
  sessionInterval?: NodeJS.Timeout;
  setSessionCheckInterval: any;
  deAuthenticateUser: any;
  successMessage: any;
}

export class LogoutPage extends React.Component<Props> {
  public componentWillMount() {
    if (this.props.sessionInterval) {
      clearInterval(this.props.sessionInterval);
    }
    this.props.setSessionCheckInterval(undefined);
    localStorage.clear();
    this.props.deAuthenticateUser();
    this.props.successMessage("You have been logged out.");
  }

  public render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state: RootState) => ({
  sessionInterval: state.session.sessionCheckInterval,
});

const mapDispatchToProps = {
  deAuthenticateUser,
  successMessage,
  setSessionCheckInterval,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutPage);
