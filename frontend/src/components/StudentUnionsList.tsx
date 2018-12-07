import React from "react";
import { Button, Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { deleteStudentUnion } from "./../reducers/studentUnionReducer";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";
import { RootState } from "../reduxStore";

const StudentUnionsList: React.SFC<any> = ({
  perms,
  stdus,
  deleteStdu,
  token,
}) => (
  <Table striped bordered condensed hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        {PermissionUtils.hasPermission(
          perms,
          Permissions.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS.value,
        ) && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {stdus ? (
        stdus.map((union: any) => (
          <tr key={union.unionId}>
            <td>{union.unionId}</td>
            <td>{union.name}</td>
            <td>{union.description}</td>
            {PermissionUtils.hasPermission(
              perms,
              Permissions.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS.value,
            ) && (
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => deleteStdu(union.unionId, token)}
                >
                  <FontAwesome name="trash" /> Delete
                </Button>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No student unions.</td>
        </tr>
      )}
    </tbody>
  </Table>
);

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
  perms: state.permission.userPerms,
});

const mapDispatchToProps = {
  deleteStdu: deleteStudentUnion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentUnionsList);
