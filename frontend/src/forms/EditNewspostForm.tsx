import React from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { isEmpty } from "./../utils/FormValidators";

const emptyTitle = isEmpty("Title");
const emptyText = isEmpty("Text");

const EditNewspostForm: React.SFC<any> = props => (
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
      componentClass="textarea"
      validate={[emptyText]}
    />
    <Button
      type="button"
      bsStyle="danger"
      onClick={props.handleClose}
      disabled={props.isEditing}
    >
      Cancel
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button type="submit" bsStyle="success" disabled={props.isEditing}>
      {props.isEditing ? "Editing newspost.." : "Edit"}
    </Button>
  </form>
);

const EditNewspostRx = reduxForm({
  form: "editNewspostForm",
  enableReinitialize: true
})(EditNewspostForm);

export default connect((state: any) => {
  return {
    initialValues: state.news.selectedNewspost
  };
})(EditNewspostRx);
