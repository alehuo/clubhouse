import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { startWatch } from "../../reducers/sessionReducer";
import StartWatchForm from "../../forms/StartSessionForm";

export class StartWatch extends Component {
  handleSubmit = values => {
    this.props.startWatch(this.props.token, values.startMessage);
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Start session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StartWatchForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = {
  startWatch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartWatch);
