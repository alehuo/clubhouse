import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import StartWatchForm from "../../forms/StartSessionForm";
import { startWatch } from "../../reducers/sessionReducer";

export class StartSession extends React.Component<any> {
  public handleSubmit = (values: any) => {
    this.props.startWatch(this.props.token, values.startMessage);
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

const mapStateToProps = (state: any) => ({
  token: state.user.token,
  isAdding: state.studentUnion.isAdding,
});

const mapDispatchToProps = {
  startWatch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartSession);
