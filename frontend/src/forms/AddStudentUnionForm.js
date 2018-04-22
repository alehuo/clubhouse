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

const FieldGroup = ({ input, meta, id, label, help, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} {...input} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

export class AddStudentUnionForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="studentUnionName"
          id="formControlsText"
          type="text"
          label="Name"
          placeholder="Name"
          component={FieldGroup}
        />
        <Field
          name="studentUnionDescription"
          id="formControlsText"
          type="text"
          label="Description"
          placeholder="Description"
          component={FieldGroup}
        />
        <Well>
          <FormGroup controlId="studentUnionPermission">
            <Field
              name="studentUnionPermission"
              component="input"
              type="checkbox"
            />{" "}
            <b>
              I have the permission from the student union to save their
              information to the service
            </b>
            <HelpBlock>
              Your answer will be saved in case a student union wants to do a
              data request, as required by the European Union General Data
              Protection Regulation.
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
          {this.props.isAdding ? "Adding student union.." : "Add"}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAdding: state.studentUnion.isAdding
});

export default reduxForm({
  // a unique name for the form
  form: "studentUnion"
})(connect(mapStateToProps)(AddStudentUnionForm));
