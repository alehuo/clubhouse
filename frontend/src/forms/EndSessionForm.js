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

const EndWatchForm = props => {
  return (
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
            I confirm that I have transferred the people I was responsible for
            to another keyholder or told them to leave the building.
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
};

const mapStateToProps = state => ({
  isEnding: state.watch.isEnding
});

export default reduxForm({
  // a unique name for the form
  form: "endWatch"
})(connect(mapStateToProps)(EndWatchForm));
