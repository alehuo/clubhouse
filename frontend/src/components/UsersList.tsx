import React from "react";
import { Button, Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { deleteUser, fetchUsers } from "./../reducers/userReducer";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";

export class UsersList extends React.Component<any, any> {
  public componentDidMount() {
    this.props.fetchUsers(this.props.token);
  }
  public render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_REMOVE_USER.value,
            ) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {this.props.users ? (
            this.props.users.map((user: any) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                {PermissionUtils.hasPermission(
                  this.props.perms,
                  Permissions.ALLOW_REMOVE_USER.value,
                ) && (
                  <td>
                    {PermissionUtils.hasPermission(
                      this.props.perms,
                      Permissions.ALLOW_REMOVE_USER.value,
                    ) && (
                      <Button
                        bsStyle="danger"
                        onClick={() =>
                          this.props.deleteUser(user.userId, this.props.token)
                        }
                      >
                        <FontAwesome name="trash" /> Delete
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

const mapStateToProps = (state: any) => ({
  token: state.user.token,
  perms: state.permission.userPerms,
});

const mapDispatchToProps = {
  fetchUsers,
  deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
