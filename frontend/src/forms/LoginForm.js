import React, { Component } from "react";
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

export class LoginForm extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="username"
          id="formControlsText"
          type="text"
          label="Username"
          placeholder="Username"
          component={FieldGroup}
        />
        <Field
          name="password"
          id="formControlsText"
          type="password"
          label="Password"
          placeholder="Password"
          component={FieldGroup}
        />
        <Button type="submit" disabled={this.props.isLoggingIn}>
          {this.props.isLoggingIn ? "Logging in.." : "Login"}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn
});

LoginForm = connect(mapStateToProps)(LoginForm);

export default reduxForm({
  // a unique name for the form
  form: "loginPage"
})(LoginForm);
