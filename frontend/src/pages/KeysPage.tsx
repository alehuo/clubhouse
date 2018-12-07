import React, { Component } from "react";
import { Alert, Button, PageHeader } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import KeysList from "./../components/KeysList";
import { toggleModal } from "./../reducers/actions/keyActions";
import { fetchKeys, fetchKeyTypes } from "./../reducers/keyReducer";
import { fetchUsers } from "./../reducers/userReducer";
import PermissionUtils from "./../utils/PermissionUtils";
import AddKeyHolder from "./subpages/AddKeyHolder";

import { Permissions } from "@alehuo/clubhouse-shared";
import { RootState } from "../reduxStore";

export class KeysPage extends React.Component<any> {
  public componentDidMount() {
    this.props.fetchKeys(this.props.token);
    this.props.fetchKeyTypes(this.props.token);
    this.props.fetchUsers(this.props.token);
  }
  public render() {
    return (
      <React.Fragment>
        <PageHeader>
          Keys
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_REMOVE_KEYS.value,
            ) && (
              <Button
                bsStyle="success"
                onClick={() => this.props.toggleModal(true)}
              >
                <FontAwesome name="plus" /> Add a keyholder
              </Button>
            )}
            {"  "}
            {
              <Button bsStyle="info">
                <FontAwesome name="envelope" /> Send an email to keyholder(s)
              </Button>
            }
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_KEYS.value,
        ) ? (
          <KeysList keys={this.props.keys} />
        ) : (
          <Alert bsStyle="warning">
            <p>
              No permission to view keyholders.{" "}
              <b>Please contact an administrator.</b>
            </p>
          </Alert>
        )}
        <AddKeyHolder
          show={this.props.modalOpen}
          onHide={() => this.props.toggleModal(false)}
          keyTypes={this.props.keyTypes}
          users={this.props.users}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  token: state.user.token,
  keys: state.key.keys,
  users: state.user.users,
  keyTypes: state.key.keyTypes,
  modalOpen: state.key.modalOpen,
  perms: state.permission.userPerms,
});

const mapDispatchToProps = {
  toggleModal,
  fetchKeys,
  fetchKeyTypes,
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeysPage);
