import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import EditNewspostForm from "../../forms/EditNewspostForm";

export class EditNewspost extends Component {
  handleSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit newspost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNewspostForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token,
  isEditing: state.news.isEditing
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNewspost);
