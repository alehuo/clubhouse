import React from "react";
import { Alert } from "react-bootstrap";
const Notification = ({ text, type }) => {
  return (
    <Alert bsStyle={type}>
      <p>{text}</p>
    </Alert>
  );
};

export default Notification;
