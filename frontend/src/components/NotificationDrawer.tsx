import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import Notification from "./Notification";

const NotificationDrawer: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  return (
    <>
      {notifications &&
        notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.text}
            variant={
              notification.notificationType === "SUCCESS"
                ? "success"
                : notification.notificationType === "ERROR"
                ? "error"
                : "warning"
            }
          />
        ))}
    </>
  );
};

export default NotificationDrawer;
