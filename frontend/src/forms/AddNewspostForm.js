import React from "react";

import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { isEmpty } from "./../utils/FormValidators";

const emptyTitle = isEmpty("Title");
const emptyText = isEmpty("Text");

const AddNewspostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="newspostTitle"
        id="formControlsText"
        type="text"
        label="Title"
        placeholder="Title"
        autoComplete="off"
        component={FieldGroup}
        validate={[emptyTitle]}
        autoFocus={true}
      />
      <Field
        name="newspostMessage"
        id="formControlsText"
        type="textarea"
        label="Text"
        placeholder="Text"
        autoComplete="off"
        component={FieldGroup}
        validate={[emptyText]}
      />
      <Button
        type="button"
        bsStyle="danger"
        onClick={props.handleClose}
        disabled={props.isAdding}
      >
        Cancel
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="submit" bsStyle="success" disabled={props.isAdding}>
        {props.isAdding ? "Adding newspost.." : "Add"}
      </Button>
    </form>
  );
};

export default reduxForm({
  form: "addNewspostForm"
})(AddNewspostForm);
