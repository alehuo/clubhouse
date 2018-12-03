import React from "react";

import { Button, FormGroup, HelpBlock, Well } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { checked, isEmpty } from "./../utils/FormValidators";

const endMessageEmpty = isEmpty("End message");
const confirmationChecked = checked(
  "You must agree that you have made the required steps before ending a session",
);

const EndSessionForm: React.SFC<any> = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      autoFocus={true}
      name="endMessage"
      id="formControlsText"
      type="textarea"
      label="End message"
      placeholder="End message"
      autoComplete="off"
      component={FieldGroup}
      componentClass="textarea"
      validate={[endMessageEmpty]}
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
          I confirm that I have transferred the people I was responsible for to
          another keyholder or told them to leave the building.
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
      {props.isEnding ? "Ending watch.." : "End watch"}
    </Button>
  </form>
);
// TODO: Typings
export default reduxForm<{}, any, string>({
  // a unique name for the form
  form: "endSession",
})(EndSessionForm);
