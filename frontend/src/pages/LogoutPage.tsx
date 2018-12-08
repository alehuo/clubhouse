import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../reduxStore";
import { deAuthenticateUser } from "./../reducers/actions/authenticationActions";
import { successMessage } from "./../reducers/actions/notificationActions";
import { setWatchCheckInterval } from "./../reducers/sessionReducer";

interface Props {
  watchInterval: NodeJS.Timeout | null;
  setWatchCheckInterval: any;
  deAuthenticateUser: any;
  successMessage: any;
}

export class LogoutPage extends React.Component<Props> {
  public componentWillMount() {
    if (this.props.watchInterval) {
      clearInterval(this.props.watchInterval);
    }
    this.props.setWatchCheckInterval(null);
    localStorage.clear();
    this.props.deAuthenticateUser();
    this.props.successMessage("You have been logged out.");
  }

  public render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state: RootState) => ({
  watchInterval: state.watch.watchCheckInterval,
});

const mapDispatchToProps = {
  deAuthenticateUser,
  successMessage,
  setWatchCheckInterval,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutPage);
