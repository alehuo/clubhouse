import React from "react";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from "react-bootstrap";

export const FieldGroup: React.SFC<any> = ({
  input,
  meta,
  id,
  label,
  help,
  meta: { touched, error, warning },
  // @ts-ignore
  ...props,
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
