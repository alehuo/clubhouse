import React from 'react';
import { connect } from 'react-redux';
import AddStudentUnionForm from '../../forms/AddStudentUnionForm';
import { addStudentUnion } from '../../reducers/actions/studentUnionActions';
import { RootState } from '../../reduxStore';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

interface Props {
    addStudentUnion: any;
    token: string | null;
    show: boolean;
    onHide: any;
}

interface FormValues {
    studentUnionName: string;
    studentUnionDescription: string;
}

export class AddStudentUnion extends React.Component<Props> {
    public handleSubmit = (values: FormValues) => {
        if (this.props.token !== null) {
            this.props.addStudentUnion(
                {
                    name: values.studentUnionName,
                    description: values.studentUnionDescription,
                },
                this.props.token,
            );
        }
    };
    public render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>Add a student union</DialogTitle>
                <DialogContent>
                    <AddStudentUnionForm
                        handleClose={this.props.onHide}
                        onSubmit={(values: FormValues) => this.handleSubmit(values)}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
});

const mapDispatchToProps = { addStudentUnion };

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentUnion);
