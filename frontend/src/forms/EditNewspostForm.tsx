import React from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import { FieldGroup } from './../components/FieldGroup';
import { isEmpty } from './../utils/FormValidators';
import { Button } from '@material-ui/core';

const emptyTitle = isEmpty('Title');
const emptyText = isEmpty('Text');

interface EditNewspostFormProps {
    handleClose?: any;
    handleSubmit?: any;
    isEditing?: any;
}

const EditNewspostForm: React.FC<EditNewspostFormProps> = props => (
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
        <Button type="button" variant="text" onClick={props.handleClose} disabled={props.isEditing}>
            Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="submit" variant="text" disabled={props.isEditing}>
            {props.isEditing ? 'Editing newspost..' : 'Edit'}
        </Button>
    </form>
);

const EditNewspostRx = reduxForm<{}, EditNewspostFormProps, string>({
    form: 'editNewspostForm',
    enableReinitialize: true,
    // @ts-ignore
})(EditNewspostForm);

export default connect((state: any) => {
    return {
        initialValues: state.news.selectedNewspost,
    };
})(EditNewspostRx);
