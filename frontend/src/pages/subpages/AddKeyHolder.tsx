import { Key, KeyType, StudentUnion, User } from '@alehuo/clubhouse-shared';
import React from 'react';
import { connect } from 'react-redux';
import AddKeyHolderForm from '../../forms/AddKeyHolderForm';
import { addKey } from '../../reducers/actions/keyActions';
import { RootState } from '../../reduxStore';
import { DialogContent, DialogTitle, Dialog } from '@material-ui/core';

interface FormValues {
    user: number;
    keyType: number;
    studentUnion: number;
    studentUnionPermission: boolean;
    description: string;
}

interface Props {
    show: boolean;
    onHide: any;
    keyTypes: KeyType[];
    studentUnions: StudentUnion[];
    users: User[];
    addKey: (token: string, data: Partial<Key>) => void;
    token: string | null;
}

export class AddKeyHolder extends React.Component<Props> {
    public handleSubmit = (values: FormValues) => {
        console.log(values);
        if (this.props.token !== null) {
            this.props.addKey(this.props.token, {
                userId: Number(values.user),
                unionId: Number(values.studentUnion),
                keyType: Number(values.keyType),
                description: values.description,
            });
        }
    };
    public render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>Add a keyholder</DialogTitle>
                <DialogContent>
                    <AddKeyHolderForm
                        handleClose={this.props.onHide}
                        onSubmit={(values: FormValues) => this.handleSubmit(values)}
                        keyTypes={this.props.keyTypes}
                        users={this.props.users}
                        studentUnions={this.props.studentUnions}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
});

const mapDispatchToProps = {
    addKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddKeyHolder);
