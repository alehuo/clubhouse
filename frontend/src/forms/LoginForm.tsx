import React from "react";
import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { FieldGroup } from "../components/FieldGroup";
import { isEmpty } from "../utils/FormValidators";

const emailEmpty = isEmpty("E-mail address");
const passwordEmpty = isEmpty("Password");

interface LoginFormProps {
  isLoggingIn: boolean;
  handleSubmit: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  isLoggingIn,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="email"
      id="formControlEmail"
      type="text"
      label="Email address"
      autoComplete="email"
      placeholder="E-mail address"
      component={FieldGroup}
      validate={[emailEmpty]}
      autoFocus={true}
    />
    <Field
      name="password"
      id="formControlPassword"
      type="password"
      label="Password"
      autoComplete="password"
      placeholder="Password"
      component={FieldGroup}
      validate={[passwordEmpty]}
    />
    <Button type="submit" variant="success" disabled={isLoggingIn}>
      {isLoggingIn ? "Logging in.." : "Login"}
    </Button>
  </form>
);

export default reduxForm({
  form: "loginForm",
  // @ts-ignore
})(LoginForm);
