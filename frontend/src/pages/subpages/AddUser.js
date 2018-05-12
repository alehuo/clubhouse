import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import AddUserForm from "./../../forms/AddUserForm";
import { addUser } from "./../../reducers/userReducer";
import { fetchStudentUnions } from "./../../reducers/studentUnionReducer";

export class AddUser extends Component {
  handleSubmit = values => {
    this.props.addUser(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        unionId: values.unionId,
        password: values.password
      },
      this.props.token
    );
  };

  componentDidMount() {
    this.props.fetchStudentUnions(this.props.token);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUserForm
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

const mapDispatchToProps = { addUser, fetchStudentUnions };

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
