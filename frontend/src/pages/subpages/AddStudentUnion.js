import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import AddStudentUnionForm from "./../../forms/AddStudentUnionForm";
import { addStudentUnion } from "./../../reducers/studentUnionReducer";

export class AddStudentUnion extends Component {
  handleSubmit = values => {
    this.props.addStudentUnion({
      name: values.studentUnionName,
      description: values.studentUnionDescription
    });
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a student union</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStudentUnionForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { addStudentUnion };

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentUnion);
