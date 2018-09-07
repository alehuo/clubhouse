import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button, Alert } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import StudentUnionsList from "./../components/StudentUnionsList";
import AddStudentUnion from "./subpages/AddStudentUnion";
import { addFormModalOpen } from "./../reducers/studentUnionReducer";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";

export class StudentUnionsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Student unions
          <p>
            {PermissionUtils.hasPermission(this.props.perms, Permissions.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS.value) && (
              <Button
                bsStyle="success"
                onClick={() => this.props.addFormModalOpen(true)}
              >
                <FontAwesome name="plus" /> Add a student union
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(this.props.perms, Permissions.ALLOW_VIEW_STUDENT_UNIONS.value) ? (
          <StudentUnionsList stdus={this.props.studentUnions} />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view student unions</h4>
            <p>You don't have correct permissions to view student unions.</p>
          </Alert>
        )}
        <AddStudentUnion
          show={this.props.modalOpen}
          onHide={() => this.props.addFormModalOpen(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentUnions: state.studentUnion.studentUnions,
  modalOpen: state.studentUnion.modalOpen,
  perms: state.permission.userPerms
});

const mapDispatchToProps = { addFormModalOpen };

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsPage);
