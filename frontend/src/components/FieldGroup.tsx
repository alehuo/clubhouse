import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  label: string;
  error: string;
  id?: string;
  input: any;
  meta: any;
  help: any;
}

export const FieldGroup: React.FC<Props> = ({
  input,
  meta,
  id,
  label,
  help,
  meta: { touched, error, warning },
  ...props
}) => (
  <Form.Group controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} {...input} />
    {help && <div>{help}</div>}
    {touched &&
      ((error && <span style={{ color: "red" }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </Form.Group>
);
