import React from 'react';
import { connect } from 'react-redux';
import EditNewspostForm from '../../forms/EditNewspostForm';
import { RootState } from '../../reduxStore';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

interface Props {
    show: boolean;
    onHide: any;
}

export class EditNewspost extends React.Component<Props> {
    public handleSubmit = (values: any) => {
        console.log(values);
    };
    public render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>Edit newspost</DialogTitle>
                <DialogContent>
                    <EditNewspostForm handleClose={this.props.onHide} onSubmit={this.handleSubmit} />
                </DialogContent>
            </Dialog >
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    isEditing: state.news.isEditing,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewspost);
