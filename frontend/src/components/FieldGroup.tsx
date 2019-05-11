import React from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const FieldGroup: React.FC<any> = ({
  input,
  meta,
  id,
  label,
  help,
  meta: { touched, error, warning },
  ...props
}) => (
  <FormGroup controlId={id}>
    <FormLabel>{label}</FormLabel>
    <FormControl {...props} {...input} />
    {help && <div>{help}</div>}
    {touched &&
      ((error && <span style={{ color: "red" }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);
