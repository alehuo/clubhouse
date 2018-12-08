import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import EditNewspostForm from "../../forms/EditNewspostForm";
import { RootState } from "../../reduxStore";

export class EditNewspost extends React.Component<any, any> {
  public handleSubmit = (values: any) => {
    // tslint:disable-next-line:no-console
    console.log(values);
  }
  public render() {
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

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
  isEditing: state.news.isEditing,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditNewspost);
