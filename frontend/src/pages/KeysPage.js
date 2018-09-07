import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button, Alert } from "react-bootstrap";
import KeysList from "./../components/KeysList";
import FontAwesome from "react-fontawesome";
import { toggleModal } from "./../reducers/keyReducer";
import AddKeyHolder from "./subpages/AddKeyHolder";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";

export class KeysPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Keys
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_REMOVE_KEYS.value
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
          Permissions.ALLOW_VIEW_KEYS.value
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
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.key.keys,
  modalOpen: state.key.modalOpen,
  perms: state.permission.userPerms
});

const mapDispatchToProps = {
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeysPage);
