import React from 'react';

import { Field, reduxForm } from 'redux-form';

import { FieldGroup } from './../components/FieldGroup';
import { checked, isEmpty } from './../utils/FormValidators';
import { Button } from '@material-ui/core';

const endMessageEmpty = isEmpty('End message');
const confirmationChecked = checked('You must agree that you have made the required steps before ending a session');

interface Props {
    handleSubmit: any;
    handleClose: any;
    isAdding: boolean;
    isEnding: boolean;
}

const EndSessionForm: React.FC<Props> = props => (
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
        <div>
            <div>
                <Field name="confirmation" component="input" type="checkbox" validate={[confirmationChecked]} />{' '}
                <b>
                    I confirm that I have transferred the people I was responsible for to another keyholder or told them
                    to leave the building.
                </b>
                <div>Your answer will be saved.</div>
            </div>
        </div>
        <Button type="button" variant="text" onClick={props.handleClose} disabled={props.isAdding}>
            Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="submit" variant="text" disabled={props.isEnding}>
            {props.isEnding ? 'Ending watch..' : 'End watch'}
        </Button>
    </form>
);
// TODO: Typings
export default reduxForm<{}, any, string>({
    // a unique name for the form
    form: 'endSession',
})(EndSessionForm);
