import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import StartWatchForm from "../../forms/StartSessionForm";
import { startSession } from "../../reducers/actions/sessionActions";
import { RootState } from "../../reduxStore";

interface Props {
  token: string;
  isAdding: boolean;
  show: boolean;
  onHide: any;
  startSession: any;
}

export class StartSession extends React.Component<Props> {
  public handleSubmit = (values: any) => {
    this.props.startSession(this.props.token, values.startMessage);
  }
  public render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Start session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StartWatchForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
            isAdding={this.props.isAdding}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  token: state.user.token,
  isAdding: state.studentUnion.isAdding,
});

const mapDispatchToProps = {
  startSession,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartSession);
