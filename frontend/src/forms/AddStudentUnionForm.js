import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
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
        <Button type="button" bsStyle="danger" onClick={this.props.handleClose} disabled={this.props.isAdding}>
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
