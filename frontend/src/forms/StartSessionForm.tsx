import React from 'react';

import { Field, reduxForm } from 'redux-form';

import { FieldGroup } from './../components/FieldGroup';
import { checked, isEmpty } from './../utils/FormValidators';
import { Button } from '@material-ui/core';

const emptyStartMessage = isEmpty('Start message');
const confirmationChecked = checked('You must agree to the rules of the clubhouse before starting a session');

interface Props {
    handleSubmit: any;
    handleClose: any;
    isAdding: boolean;
    isEnding: boolean;
}

const StartSessionForm: React.FC<Props> = props => (
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
            componentClass="textarea"
            validate={[emptyStartMessage]}
        />
        <div>
            <div>
                <Field name="confirmation" component="input" type="checkbox" validate={[confirmationChecked]} />{' '}
                <b>I confirm that I have read the rules of the clubhouse before starting a session.</b>
                <div>Your answer will be saved.</div>
            </div>
        </div>
        <Button variant="text" onClick={props.handleClose} disabled={props.isAdding}>
            Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="text" disabled={props.isEnding}>
            {props.isEnding ? 'Starting session..' : 'Start session'}
        </Button>
    </form>
);

export default reduxForm<{}, any, string>({
    // a unique name for the form
    form: 'startSession',
})(StartSessionForm);
