import React from "react";

import { Button, FormGroup, HelpBlock, Well } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { FieldGroup } from "./../components/FieldGroup";

import {
  checked,
  isEmpty,
  passwd,
  validatePasswords,
  validEmail,
} from "./../utils/FormValidators";

const firstNameEmpty = isEmpty("First name");
const lastNameEmpty = isEmpty("Last name");
const emailEmpty = isEmpty("E-mail address");
const passwordEmpty = isEmpty("Password");
const passwordValid = passwd(8);

const RegisterForm: React.SFC<any> = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="firstName"
      id="firstName"
      type="text"
      label="First name"
      placeholder="First name"
      component={FieldGroup}
      validate={[firstNameEmpty]}
      autoFocus={true}
    />
    <Field
      name="lastName"
      id="lastName"
      type="text"
      label="Last name"
      placeholder="Last name"
      component={FieldGroup}
      validate={[lastNameEmpty]}
    />
    <Field
      name="email"
      id="email"
      type="text"
      label="E-mail address"
      placeholder="something@email.com"
      component={FieldGroup}
      validate={[emailEmpty, validEmail]}
    />
    <Field
      name="password"
      id="password"
      type="password"
      label="Password"
      placeholder="Password"
      component={FieldGroup}
      validate={[passwordEmpty, passwordValid]}
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
    <Button type="submit" bsStyle="success" disabled={props.isRegistering}>
      {props.isRegistering ? "Registering user.." : "Register"}
    </Button>
  </form>
);
// TODO: Props
export default reduxForm<{}, any, string>({
  form: "registerForm",
})(RegisterForm);
