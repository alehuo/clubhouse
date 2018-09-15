import React from "react";
import { connect } from "react-redux";

import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  Well
} from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import validator from "validator";

const FieldGroup = ({
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

const checked = val =>
  val === true
    ? undefined
    : "You must have read and accepted the privacy policy.";

const isEmpty = name => val => {
  return val ? undefined : name + " cannot be empty";
};

const validEmail = val => {
  return validator.isEmail(val) ? undefined : "E-mail address is invalid";
};

const passwd = length => val =>
  val && val.length >= length
    ? undefined
    : "Password cannot be empty or shorter than " + length + " characters";

const validatePasswords = (value, values) => {
  if (!values.passwordAgain) {
    return "Please type your password again";
  }
  if (values.passwordAgain !== values.password) {
    return "Passwords do not match";
  }
  return undefined;
};

const RegisterForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="firstName"
        id="firstName"
        type="text"
        label="First name"
        placeholder="First name"
        component={FieldGroup}
        validate={[isEmpty("First name")]}
      />
      <Field
        name="lastName"
        id="lastName"
        type="text"
        label="Last name"
        placeholder="Last name"
        component={FieldGroup}
        validate={[isEmpty("Last name")]}
      />
      <Field
        name="email"
        id="email"
        type="text"
        label="E-mail address"
        placeholder="something@email.com"
        component={FieldGroup}
        validate={[isEmpty("E-mail address"), validEmail]}
      />
      <Field
        name="password"
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        component={FieldGroup}
        validate={[passwd(8)]}
      />
      <Field
        name="passwordAgain"
        id="passwordAgain"
        type="password"
        label="Confirm password"
        placeholder="Confirm password"
        component={FieldGroup}
        validate={validatePasswords}
      />
      <Well>
        <FormGroup controlId="studentUnionPermission">
          <Field
            name="userPermission"
            component="input"
            type="checkbox"
            validate={[checked]}
          />{" "}
          <b>
            I give my consent for the service to store my data to the server as
            said in the privacy policy.
          </b>
          <HelpBlock>Your answer will be saved.</HelpBlock>
        </FormGroup>
      </Well>
      <Button type="submit" bsStyle="success" disabled={props.isAdding}>
        {props.isAdding ? "Registering user.." : "Register"}
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  isStarting: state.watch.isStarting
});

export default reduxForm({
  // a unique name for the form
  form: "registerUser"
})(connect(mapStateToProps)(RegisterForm));
