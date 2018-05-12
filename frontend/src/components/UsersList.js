import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchUsers } from "./../reducers/userReducer";

export class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers(this.props.token);
  }
  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users ? (
            this.props.users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = {
  fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
