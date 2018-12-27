import { Key, KeyType, StudentUnion, User } from "@alehuo/clubhouse-shared";
import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AddKeyHolderForm from "../../forms/AddKeyHolderForm";
import { addKey } from "../../reducers/actions/keyActions";
import { RootState } from "../../reduxStore";

interface FormValues {
  user: number;
  keyType: number;
  studentUnion: number;
  studentUnionPermission: boolean;
  description: string;
}

interface Props {
  show: boolean;
  onHide: any;
  keyTypes: KeyType[];
  studentUnions: StudentUnion[];
  users: User[];
  addKey: (token: string, data: Partial<Key>) => void;
  token: string;
}

export class AddKeyHolder extends React.Component<Props> {
  public handleSubmit = (values: FormValues) => {
    console.log(values);
    this.props.addKey(this.props.token, {
      userId: Number(values.user),
      unionId: Number(values.studentUnion),
      keyType: Number(values.keyType),
      description: values.description,
    });
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
            studentUnions={this.props.studentUnions}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
});

const mapDispatchToProps = {
  addKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddKeyHolder);
