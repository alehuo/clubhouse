import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AddStudentUnionForm from "../../forms/AddStudentUnionForm";
import { addStudentUnion } from "../../reducers/actions/studentUnionActions";
import { RootState } from "../../reduxStore";

interface Props {
  addStudentUnion: any;
  token: string;
  show: boolean;
  onHide: any;
}

interface FormValues {
  studentUnionName: string;
  studentUnionDescription: string;
}

export class AddStudentUnion extends React.Component<Props> {
  public handleSubmit = (values: FormValues) => {
    this.props.addStudentUnion(
      {
        name: values.studentUnionName,
        description: values.studentUnionDescription,
      },
      this.props.token,
    );
  }
  public render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a student union</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStudentUnionForm
            handleClose={this.props.onHide}
            onSubmit={(values: FormValues) => this.handleSubmit(values)}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
});

const mapDispatchToProps = { addStudentUnion };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudentUnion);
