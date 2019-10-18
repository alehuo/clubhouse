import React from "react";
import { Button, Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { deleteStudentUnion } from "./../reducers/actions/studentUnionActions";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permission, StudentUnion } from "@alehuo/clubhouse-shared";
import { RootState } from "../reduxStore";

interface Props {
  perms: number;
  stdus: StudentUnion[];
  deleteStdu: any;
  token: string;
}

const StudentUnionsList: React.FC<Props> = ({
  perms,
  stdus,
  deleteStdu,
  token,
}) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        {PermissionUtils.hasPermission(
          perms,
          Permission.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS,
        ) && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {stdus ? (
        stdus.map((union) => (
          <tr key={union.unionId}>
            <td>{union.unionId}</td>
            <td>{union.name}</td>
            <td>{union.description}</td>
            {PermissionUtils.hasPermission(
              perms,
              Permission.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS,
            ) && (
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Do you want to really delete the student union?",
                      )
                    ) {
                      deleteStdu(union.unionId, token);
                    }
                  }}
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
  perms: state.user.userPerms,
});

const mapDispatchToProps = {
  deleteStdu: deleteStudentUnion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentUnionsList);
