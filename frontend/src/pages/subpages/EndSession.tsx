import React from 'react';
import { connect } from 'react-redux';
import EndWatchForm from '../../forms/EndSessionForm';
import { endSession } from '../../reducers/actions/sessionActions';
import { RootState } from '../../reduxStore';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

interface Props {
    token: string | null;
    endSession: any;
    show: boolean;
    onHide: any;
    isEnding: boolean;
}

export class EndSession extends React.Component<Props> {
    public handleSubmit = (values: any) => {
        if (this.props.token !== null) {
            this.props.endSession(this.props.token, values.endMessage);
        }
    };
    public render() {
        return (
            <Dialog open={this.props.show} >
                <DialogTitle>End session</DialogTitle>
                <DialogContent>
                    <EndWatchForm
                        handleClose={this.props.onHide}
                        onSubmit={this.handleSubmit}
                        isEnding={this.props.isEnding}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    isEnding: state.session.isEnding,
});

const mapDispatchToProps = {
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(EndSession);
