import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  text: string;
  type: "success" | "warning" | "danger" | "info";
}

const Notification: React.FC<Props> = ({ text, type }) => (
  <Alert variant={type}>
    <p>{text}</p>
  </Alert>
);

export default Notification;
