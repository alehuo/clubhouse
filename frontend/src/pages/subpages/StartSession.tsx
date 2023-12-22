import React from 'react';
import { connect } from 'react-redux';
import StartWatchForm from '../../forms/StartSessionForm';
import { startSession } from '../../reducers/actions/sessionActions';
import { RootState } from '../../reduxStore';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

interface Props {
    token: string | null;
    isAdding: boolean;
    show: boolean;
    onHide: any;
    startSession: any;
}

export class StartSession extends React.Component<Props> {
    public handleSubmit = (values: any) => {
        if (this.props.token !== null) {
            this.props.startSession(this.props.token, values.startMessage);
        }
    };
    public render() {
        return (
            <Dialog open={this.props.show}>
                <DialogTitle>Start session</DialogTitle>
                <DialogContent>
                    <StartWatchForm
                        handleClose={this.props.onHide}
                        onSubmit={this.handleSubmit}
                        isAdding={this.props.isAdding}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    isAdding: state.studentUnion.isAdding,
});

const mapDispatchToProps = {
    startSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartSession);
