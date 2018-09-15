import React from "react";

import { FormGroup, HelpBlock, Button, Well } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { isEmpty, checked } from "./../utils/FormValidators";

const emptyStartMessage = isEmpty("Start message");
const confirmationChecked = checked(
  "You must agree to the rules of the clubhouse before starting a session"
);

const StartSessionForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        autoFocus={true}
        name="startMessage"
        id="formControlsText"
        type="textarea"
        label="Start message"
        placeholder="Start message"
        autoComplete="off"
        component={FieldGroup}
        validate={[emptyStartMessage]}
      />
      <Well>
        <FormGroup controlId="confirmation">
          <Field
            name="confirmation"
            component="input"
            type="checkbox"
            validate={[confirmationChecked]}
          />{" "}
          <b>
            I confirm that I have read the rules of the clubhouse before
            starting a session.
          </b>
          <HelpBlock>Your answer will be saved.</HelpBlock>
        </FormGroup>
      </Well>
      <Button
        type="button"
        bsStyle="danger"
        onClick={props.handleClose}
        disabled={props.isAdding}
      >
        Cancel
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="submit" bsStyle="success" disabled={props.isEnding}>
        {props.isEnding ? "Starting session.." : "Start session"}
      </Button>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "startSession"
})(StartSessionForm);
