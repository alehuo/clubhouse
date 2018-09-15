import React from "react";
import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { FieldGroup } from "../components/FieldGroup";
import { isEmpty } from "../utils/FormValidators";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="email"
        id="formControlEmail"
        type="text"
        label="Email address"
        autoComplete="email"
        placeholder="E-mail address"
        component={FieldGroup}
        validate={[isEmpty("E-mail address")]}
      />
      <Field
        name="password"
        id="formControlPassword"
        type="password"
        label="Password"
        autoComplete="password"
        placeholder="Password"
        component={FieldGroup}
        validate={[isEmpty("Password")]}
      />
      <Button type="submit" bsStyle="success" disabled={props.isLoggingIn}>
        {props.isLoggingIn ? "Logging in.." : "Login"}
      </Button>
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
