import React from 'react';
import { connect } from 'react-redux';

import { Button, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import { RootState } from '../reduxStore';
import { FieldGroup } from './../components/FieldGroup';
import { checked, isEmpty } from './../utils/FormValidators';

const emptyName = isEmpty('Student union name');
const emptyDesc = isEmpty('Student union description');
const stduPermission = checked('You must have the permission from the student union');

interface Props {
    handleSubmit: any;
    handleClose: any;
    isAdding: boolean;
}

const AddStudentUnionForm: React.FC<Props> = ({ handleSubmit, handleClose, isAdding }) => (
    <form onSubmit={handleSubmit}>
        <Field
            name="studentUnionName"
            id="formControlsText"
            type="text"
            label="Name"
            placeholder="Name"
            autocomplete="off"
            component={FieldGroup}
            validate={[emptyName]}
            autoFocus={true}
        />
        <Field
            name="studentUnionDescription"
            id="formControlsText"
            type="textarea"
            label="Description"
            placeholder="Description"
            autoComplete="off"
            component={FieldGroup}
            validate={[emptyDesc]}
        />
        <div>
            <FormGroup controlId="studentUnionPermission">
                <Field name="studentUnionPermission" component="input" type="checkbox" validate={[stduPermission]} />{' '}
                <b>I have the permission from the student union to save their information to the service</b>
                <p>
                    Your answer will be saved in case a student union wants to do a data request, as required by the
                    European Union General Data Protection Regulation.
                </p>
            </FormGroup>
        </div>
        <Button type="button" variant="danger" onClick={handleClose} disabled={isAdding}>
            Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="submit" variant="success" disabled={isAdding}>
            {isAdding ? 'Adding student union..' : 'Add'}
        </Button>
    </form>
);

const mapStateToProps = (state: RootState) => ({
    isAdding: state.studentUnion.isAdding,
});

const RxForm = reduxForm<{}, any, string>({
    form: 'studentUnion',
})(AddStudentUnionForm);

export default connect(mapStateToProps)(RxForm);
