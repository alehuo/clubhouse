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
  val === true ? undefined : "You must check the checkbox";

// Todo: add field name to message
const notEmpty = val =>
  val && val.length > 0 ? undefined : "Input must not be empty";

const StartWatchForm = props => {
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
        validate={[notEmpty]}
      />
      <Well>
        <FormGroup controlId="confirmation">
          <Field
            name="confirmation"
            component="input"
            type="checkbox"
            validate={[checked]}
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

const mapStateToProps = state => ({
  isAdding: state.studentUnion.isAdding
});

export default reduxForm({
  // a unique name for the form
  form: "startWatch"
})(connect(mapStateToProps)(StartWatchForm));
