import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button, Alert } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import UsersList from "./../components/UsersList";
import AddUser from "./subpages/AddUser";
import { addFormModalOpen } from "./../reducers/userReducer";
import PermissionUtils from "./../utils/PermissionUtils";

export class UserListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Users
          <p>
            <Button
              bsStyle="success"
              onClick={() => this.props.addFormModalOpen(true)}
            >
              <FontAwesome name="plus" /> Add a user
            </Button>
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(this.props.perms, 0x00002000) ? (
          <UsersList users={this.props.users} />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view users</h4>
            <p>You don't have correct permissions to view users.</p>
          </Alert>
        )}
        <AddUser
          show={this.props.modalOpen}
          onHide={() => this.props.addFormModalOpen(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentUnions: state.studentUnion.studentUnions,
  modalOpen: state.user.modalOpen,
  perms: state.permission.userPerms,
  users: state.user.users
});

const mapDispatchToProps = { addFormModalOpen };

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
