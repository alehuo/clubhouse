import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import EndWatchForm from '../../forms/EndSessionForm';
import { endSession } from '../../reducers/actions/sessionActions';
import { RootState } from '../../reduxStore';

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
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>End session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EndWatchForm
                        handleClose={this.props.onHide}
                        onSubmit={this.handleSubmit}
                        isEnding={this.props.isEnding}
                    />
                </Modal.Body>
            </Modal>
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
