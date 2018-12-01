import React, { Component } from "react";
import { Alert, PageHeader } from "react-bootstrap";
import { connect } from "react-redux";
import UsersList from "./../components/UsersList";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";

export class UserListPage extends React.Component<any> {
  public render() {
    return (
      <React.Fragment>
        <PageHeader>Users</PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_USERS.value,
        ) ? (
          <UsersList users={this.props.users} />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view users</h4>
            <p>You don't have correct permissions to view users.</p>
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  studentUnions: state.studentUnion.studentUnions,
  perms: state.permission.userPerms,
  users: state.user.users,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListPage);
