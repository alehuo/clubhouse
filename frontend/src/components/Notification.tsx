import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  text: string;
  type: string;
}

const Notification: React.SFC<Props> = ({ text, type }) => (
  <Alert bsStyle={type}>
    <p>{text}</p>
  </Alert>
);

export default Notification;
