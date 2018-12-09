import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AddKeyHolderForm from "../../forms/AddKeyHolderForm";
import { RootState } from "../../reduxStore";

interface FormValues {
  user: string;
  keyType: number;
  studentUnionPermission: boolean;
}

interface Props {
  show: boolean;
  onHide: any;
  keyTypes: any[];
  users: any[];
}

export class AddKeyHolder extends React.Component<Props> {
  public handleSubmit = (values: FormValues) => {
    console.log(values);
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
            onSubmit={(values: FormValues) => this.handleSubmit(values)}
            keyTypes={this.props.keyTypes}
            users={this.props.users}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(AddKeyHolder);
