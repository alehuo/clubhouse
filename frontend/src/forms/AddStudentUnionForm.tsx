import React from "react";
import { connect } from "react-redux";

import { FormGroup, HelpBlock, Button, Well } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { isEmpty, checked } from "./../utils/FormValidators";

const AddStudentUnionForm: React.SFC<any> = ({
  handleSubmit,
  handleClose,
  isAdding
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="studentUnionName"
      id="formControlsText"
      type="text"
      label="Name"
      placeholder="Name"
      autocomplete="off"
      component={FieldGroup}
      validate={[isEmpty]}
      autoFocus={true}
    />
    <Field
      name="studentUnionDescription"
      id="formControlsText"
      type="textarea"
      label="Description"
      placeholder="Description"
      autoComplete="off"
      component={FieldGroup}
      validate={[isEmpty]}
    />
    <Well>
      <FormGroup controlId="studentUnionPermission">
        <Field
          name="studentUnionPermission"
          component="input"
          type="checkbox"
          validate={[checked]}
        />{" "}
        <b>
          I have the permission from the student union to save their information
          to the service
        </b>
        <HelpBlock>
          Your answer will be saved in case a student union wants to do a data
          request, as required by the European Union General Data Protection
          Regulation.
        </HelpBlock>
      </FormGroup>
    </Well>
    <Button
      type="button"
      bsStyle="danger"
      onClick={handleClose}
      disabled={isAdding}
    >
      Cancel
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button type="submit" bsStyle="success" disabled={isAdding}>
      {isAdding ? "Adding student union.." : "Add"}
    </Button>
  </form>
);

const mapStateToProps = (state: any) => ({
  isAdding: state.studentUnion.isAdding
});

export default reduxForm({
  // a unique name for the form
  form: "studentUnion"
  // @ts-ignore
})(connect(mapStateToProps)(AddStudentUnionForm));
