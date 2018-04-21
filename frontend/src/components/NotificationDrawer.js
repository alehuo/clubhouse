import React, { Component } from "react";
import { connect } from "react-redux";
import Notification from "./Notification";
import { notificationTypes } from "../reducers/notificationReducer";

export class NotificationDrawer extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.notifications &&
          this.props.notifications.map(notification => (
            <Notification
              key={notification.id}
              text={notification.text}
              type={
                notification.notificationType === notificationTypes.SUCCESS
                  ? "success"
                  : notification.notificationType === notificationTypes.ERROR
                    ? "danger"
                    : "warning"
              }
            />
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDrawer);
