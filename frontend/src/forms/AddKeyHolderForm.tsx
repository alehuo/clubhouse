import React from 'react';
import { connect } from 'react-redux';

import { Field, formValueSelector, reduxForm } from 'redux-form';

import { KeyType, StudentUnion, User } from '@alehuo/clubhouse-shared';
import { FieldGroup } from './../components/FieldGroup';
import { checked } from './../utils/FormValidators';
import { Button } from '@material-ui/core';

const userFilter = (users: User[], id: number) => {
    const user = users.find(usr => usr.userId === id);
    if (!user) {
        return 'N/A';
    }
    return user.firstName + ' ' + user.lastName;
};

const showKeyTitle = (keyTypes: KeyType[], selectedKey: number) => {
    const keyType = keyTypes.find(kt => kt.keyTypeId === selectedKey);
    if (keyType !== undefined) {
        return keyType.title;
    }
    return 'N/A';
};

const confirmed = checked('You must have the permission to add a key');

interface Props {
    handleSubmit: any;
    handleClose: any;
    selectedKey: number;
    selectedUser: number;
    isAdding: boolean;
    users: User[];
    keyTypes: KeyType[];
    studentUnions: StudentUnion[];
}

const AddKeyHolderForm: React.FC<Props> = ({
    handleSubmit,
    users,
    studentUnions,
    keyTypes,
    handleClose,
    selectedKey,
    selectedUser,
    isAdding,
}) => (
        <form onSubmit={handleSubmit}>
            <Field component={FieldGroup} as="select" name="user" label="User">
                {users &&
                    users.map(user => (
                        <option key={user.firstName + user.lastName} value={user.userId}>
                            {user.firstName + ' ' + user.lastName}
                        </option>
                    ))}
            </Field>
            <Field component={FieldGroup} as="select" name="studentUnion" label="Student union">
                {studentUnions &&
                    studentUnions.map(stdu => (
                        <option key={stdu.unionId} value={stdu.unionId}>
                            {stdu.name}
                        </option>
                    ))}
            </Field>
            <Field component={FieldGroup} as="select" name="keyType" id="keyType" label="Key type">
                {keyTypes &&
                    keyTypes.map(keyType => (
                        <option key={keyType.keyTypeId} value={keyType.keyTypeId}>
                            {keyType.title}
                        </option>
                    ))}
            </Field>
            <Field name="description" type="text" label="Key description" component={FieldGroup} />
            <Field
                name="studentUnionPermission"
                type="checkbox"
                label="Agreement"
                component={FieldGroup}
                validate={[confirmed]}
            />{' '}
            <div>
                By checking this checkbox you agree you have the permission to add the following key:
            <p>
                    {selectedKey && selectedUser && keyTypes && (
                        <span>
                            <b>{keyTypes && showKeyTitle(keyTypes, selectedKey)} key</b> for user{' '}
                            <b>{userFilter(users, selectedUser)}</b>
                        </span>
                    )}
                </p>
            </div>
            <Button type="button" variant="text" onClick={handleClose}>
                Cancel
            </Button>
            {'   '}
            <Button type="submit" variant="text">
                {isAdding ? 'Adding key to user...' : 'Add'}
            </Button>
        </form>
    );

const AddKeyHolderFormRx = reduxForm<FormData, any, string>({
    form: 'keyHolder',
})(AddKeyHolderForm);

const selector = formValueSelector('keyHolder');

const mapStateToProps = () => {
    return {
        initialValues: {
            keyType: 1,
            user: 1,
        },
    };
};

export default connect<{ selectedUser: number; selectedKey: number }>(
    state => ({
        selectedUser: selector(state, 'user'),
        selectedKey: selector(state, 'keyType'),
    }),
    mapStateToProps,
)(AddKeyHolderFormRx);
