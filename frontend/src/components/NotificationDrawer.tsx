import React from "react";
import { connect } from "react-redux";
import { RootState } from "../reduxStore";
import Notification from "./Notification";

interface Props {
  notifications: Array<{
    id: string;
    text: string;
    notificationType: string;
  }>;
}

const NotificationDrawer: React.SFC<Props> = ({ notifications }) => (
  <React.Fragment>
    {notifications &&
      notifications.map((notification) => (
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

const mapStateToProps = (state: RootState) => ({
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps)(NotificationDrawer);
