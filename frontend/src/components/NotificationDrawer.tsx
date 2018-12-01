import React from "react";
import { connect } from "react-redux";
import Notification from "./Notification";
import { notificationTypes } from "../reducers/notificationReducer";

const NotificationDrawer: React.SFC<any> = ({ notifications }) => (
  <React.Fragment>
    {notifications &&
      notifications.map((notification: any) => (
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

const mapStateToProps = (state: any) => ({
  notifications: state.notification.notifications
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDrawer);
