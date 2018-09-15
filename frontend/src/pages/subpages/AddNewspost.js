import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import AddNewspostForm from "../../forms/AddNewspostForm";

import { addNewspost } from "../../reducers/newsReducer";

export class AddNewspost extends Component {
  handleSubmit = values => {
    this.props.addNewspost(
      this.props.token,
      values.newspostTitle,
      values.newspostMessage
    );
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a newspost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewspostForm
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
  isAdding: state.news.isAdding
});

const mapDispatchToProps = {
  addNewspost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewspost);
