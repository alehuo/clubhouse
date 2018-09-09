import React from "react";
import { connect } from "react-redux";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

const FieldGroup = ({ input, meta, id, label, help, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} {...input} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

const LoginForm = props => {
  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="email"
        id="formControlsUsrname"
        type="text"
        label="Email address"
        autoComplete="email"
        placeholder="Email address"
        component={FieldGroup}
      />
      <Field
        name="password"
        id="formControlsPasswd"
        type="password"
        label="Password"
        autoComplete="password"
        placeholder="Password"
        component={FieldGroup}
      />
      <Button type="submit" disabled={props.isLoggingIn}>
        {props.isLoggingIn ? "Logging in.." : "Login"}
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn
});

export default reduxForm({
  // a unique name for the form
  form: "loginPage"
})(connect(mapStateToProps)(LoginForm));
