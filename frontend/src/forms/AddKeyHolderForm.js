import React from "react";
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

const keyTypes = [
  {
    name: "24h",
    value: "24h"
  },
  {
    name: "Day",
    value: "day"
  }
];

const AddKeyHolderForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="user"
        id="formControlsUser"
        type="text"
        label="User"
        placeholder="User"
        component={FieldGroup}
      />
      <Field
        name="keyType"
        id="formControlsText"
        type="text"
        label="Key type"
        placeholder="Description"
        component="select"
      >
        {keyTypes &&
          keyTypes.map(keyType => (
            <option key={keyType.value} value={keyType.value}>
              {keyType.name}
            </option>
          ))}
      </Field>
      <Well>
        <FormGroup controlId="studentUnionPermission">
          <Field
            name="studentUnionPermission"
            component="input"
            type="checkbox"
          />{" "}
          <b>I have the permission to add a key for the user</b>
          <HelpBlock>
            By checking this box you agree you have the permission of the user
            to add a key to him/her.
          </HelpBlock>
        </FormGroup>
      </Well>
      <Button type="button" bsStyle="danger" onClick={props.handleClose}>
        Cancel
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="submit" bsStyle="success">
        {props.isAdding ? "Adding key to user..." : "Add"}
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({});

export default reduxForm({
  // a unique name for the form
  form: "keyHolder"
})(connect(mapStateToProps)(AddKeyHolderForm));
