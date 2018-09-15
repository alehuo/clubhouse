import React from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

export const FieldGroup = ({
  input,
  meta,
  id,
  label,
  help,
  meta: { touched, error, warning },
  ...props
}) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} {...input} />
    {help && <HelpBlock>{help}</HelpBlock>}
    {touched &&
      ((error && <span style={{ color: "red" }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);
