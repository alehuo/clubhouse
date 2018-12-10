import React from "react";
import { Button, Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { deleteUser, fetchUsers } from "./../reducers/actions/userActions";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions, UserModel } from "@alehuo/clubhouse-shared";
import { RootState } from "../reduxStore";

interface Props {
  token: string;
  fetchUsers: any;
  perms: number;
  users: UserModel[];
  deleteUser: any;
}

export class UsersList extends React.Component<Props> {
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
                        onClick={() => {
                          if (
                            window.confirm(
                              "Do you want to delete this user?" +
                                " Deleting a user will delete ALL messages and watch history.",
                            )
                          ) {
                            this.props.deleteUser(
                              user.userId,
                              this.props.token,
                            );
                          }
                        }}
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

const mapStateToProps = (state: RootState) => ({
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
