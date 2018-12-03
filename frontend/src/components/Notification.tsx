import React from "react";
import { Alert } from "react-bootstrap";

const Notification: React.SFC<any> = ({ text, type }) => (
  <Alert bsStyle={type}>
    <p>{text}</p>
  </Alert>
);

export default Notification;
