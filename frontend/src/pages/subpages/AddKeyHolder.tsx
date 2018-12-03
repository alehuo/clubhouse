import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AddKeyHolderForm from "../../forms/AddKeyHolderForm";

export class AddKeyHolder extends React.Component<any, any> {
  public handleSubmit = (values: any) => {
    // tslint:disable-next-line:no-console
    console.log("Submitted");
  }
  public render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a keyholder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddKeyHolderForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
            keyTypes={this.props.keyTypes}
            users={this.props.users}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  token: state.user.token,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddKeyHolder);
