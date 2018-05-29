import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { fetchUsers, deleteUser } from "./../reducers/userReducer";
import FontAwesome from "react-fontawesome";
import PermissionUtils from "./../utils/PermissionUtils";

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
            {(PermissionUtils.hasPermission(this.props.perms, Math.pow(2, 0)) ||
              PermissionUtils.hasPermission(
                this.props.perms,
                Math.pow(2, 31)
              )) && <th>Actions</th>}
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
                {PermissionUtils.hasPermission(
                  this.props.perms,
                  Math.pow(2, 11)
                ) && (
                  <td>
                    {PermissionUtils.hasPermission(
                      this.props.perms,
                      Math.pow(2, 0)
                    ) && (
                      <Button
                        bsStyle="danger"
                        onClick={() =>
                          this.props.deleteUser(user.userId, this.props.token)
                        }
                      >
                        <FontAwesome name="delete" /> Delete
                      </Button>
                    )}
                    {PermissionUtils.hasPermission(
                      this.props.perms,
                      Math.pow(2, 31)
                    ) && (
                      <Button
                        bsStyle="primary"
                        onClick={() =>
                          this.props.deleteUser(user.userId, this.props.token)
                        }
                      >
                        <FontAwesome name="edit" /> Edit
                      </Button>
                    )}
                  </td>
                )}
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
  token: state.user.token,
  perms: state.permission.userPerms
});

const mapDispatchToProps = {
  fetchUsers,
  deleteUser: () => console.log("jee")
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
