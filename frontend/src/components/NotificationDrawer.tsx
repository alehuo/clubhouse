import React from "react";
import { connect } from "react-redux";
import Notification from "./Notification";

const NotificationDrawer: React.SFC<any> = ({ notifications }) => (
  <React.Fragment>
    {notifications &&
      notifications.map((notification: any) => (
        <Notification
          key={notification.id}
          text={notification.text}
          type={
            notification.notificationType === "SUCCESS"
              ? "success"
              : notification.notificationType === "ERROR"
              ? "danger"
              : "warning"
          }
        />
      ))}
  </React.Fragment>
);

const mapStateToProps = (state: any) => ({
  notifications: state.notification.notifications,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationDrawer);
