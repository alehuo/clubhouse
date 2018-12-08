import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import EndWatchForm from "../../forms/EndSessionForm";
import { endWatch } from "../../reducers/sessionReducer";
import { RootState } from "../../reduxStore";

export class EndSession extends React.Component<any> {
  public handleSubmit = (values: any) => {
    this.props.endWatch(this.props.token, values.endMessage);
  }
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
  token: state.user.token,
  isEnding: state.watch.isEnding,
});

const mapDispatchToProps = {
  endWatch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndSession);
