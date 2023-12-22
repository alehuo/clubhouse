import React from 'react';

import { Field, reduxForm } from 'redux-form';

import { FieldGroup } from './../components/FieldGroup';
import { isEmpty } from './../utils/FormValidators';
import { Button } from '@material-ui/core';

const emptyTitle = isEmpty('Title');
const emptyText = isEmpty('Text');

interface Props {
    handleSubmit: any;
    handleClose: any;
    isAdding: boolean;
}

const AddNewspostForm: React.FC<Props> = ({ handleSubmit, handleClose, isAdding }) => (
    <form onSubmit={handleSubmit}>
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
        <Button type="button" variant="text" onClick={handleClose} disabled={isAdding}>
            Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="submit" variant="text" disabled={isAdding}>
            {isAdding ? 'Adding newspost..' : 'Add'}
        </Button>
    </form>
);

export default reduxForm<{}, any, string>({
    form: 'addNewspostForm',
})(AddNewspostForm);
