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
  val === true ? undefined : "You must have the permission from the user";

const passwd = val =>
  val && val.length >= 8
    ? undefined
    : "Password cannot be empty or shorter than 8 characters";

const stduSelected = val =>
  val === -1 ? undefined : "Please select a student union from the list";

export class AddStudentUnionForm extends Component {
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
        <Field
          name="unionId"
          id="unionId"
          componentClass="select"
          label="Student union"
          component={FieldGroup}
          validate={[stduSelected]}
        >
          <option value="-1">Select student union</option>
          {this.props.studentUnions &&
            this.props.studentUnions.map(stdu => (
              <option key={stdu.unionId} value={stdu.unionId}>
                {stdu.name}
              </option>
            ))}
        </Field>
        <Well>
          <FormGroup controlId="studentUnionPermission">
            <Field
              name="userPermission"
              component="input"
              type="checkbox"
              validate={[checked]}
            />{" "}
            <b>
              I have the permission from the user to save their information to
              the service
            </b>
            <HelpBlock>
              Your answer will be saved in case the user wants to do a data
              request, as required by the European Union General Data Protection
              Regulation.
            </HelpBlock>
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
          {this.props.isAdding ? "Adding user.." : "Add"}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAdding: state.studentUnion.isAdding,
  studentUnions: state.studentUnion.studentUnions
});

export default reduxForm({
  // a unique name for the form
  form: "studentUnion"
})(connect(mapStateToProps)(AddStudentUnionForm));
