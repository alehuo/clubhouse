import React, { Component } from "react";
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
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const checked = val =>
  val === true
    ? undefined
    : "You must have read and accepted the privacy policy.";

const passwd = val =>
  val && val.length >= 8
    ? undefined
    : "Password cannot be empty or shorter than 8 characters";

export class RegisterForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="firstName"
          id="firstName"
          type="text"
          label="First name"
          placeholder="First name"
          component={FieldGroup}
        />
        <Field
          name="lastName"
          id="lastName"
          type="text"
          label="Last name"
          placeholder="First name"
          component={FieldGroup}
        />
        <Field
          name="email"
          id="email"
          type="text"
          label="Email address"
          placeholder="Email address"
          component={FieldGroup}
        />
        <Field
          name="password"
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          component={FieldGroup}
          validate={[passwd]}
        />
        <Field
          name="passwordAgain"
          id="passwordAgain"
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          component={FieldGroup}
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
              I give my consent for the service to store my data to the server
              as said in the privacy policy.
            </b>
            <HelpBlock>Your answer will be saved.</HelpBlock>
          </FormGroup>
        </Well>
        <Button
          type="button"
          bsStyle="danger"
          onClick={this.props.handleClose}
          disabled={this.props.isAdding}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="submit" bsStyle="success" disabled={this.props.isAdding}>
          {this.props.isAdding ? "Registering user.." : "Register"}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isStarting: state.watch.isStarting
});

export default reduxForm({
  // a unique name for the form
  form: "registerUser"
})(connect(mapStateToProps)(RegisterForm));
