import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button, Alert } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import PermissionUtils from "./../utils/PermissionUtils";

export class RulesPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Rules{"  "}
          <small>
            Rules of the clubhouse you <b>must</b> follow!
          </small>
          <p>
            {PermissionUtils.hasPermission(this.props.perms, 0x00040000) && (
              <Button bsStyle="success">
                <FontAwesome name="edit" /> Edit rules
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(this.props.perms, 0x00080000) ? (
          <div>Rules here</div>
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view rules</h4>
            <p>You don't have correct permissions to view rules.</p>
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ perms: state.permission.userPerms });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RulesPage);
