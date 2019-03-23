import React from "react";
import { Alert, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import KeysList from "./../components/KeysList";
import { toggleModal } from "./../reducers/actions/keyActions";
import { fetchKeys, fetchKeyTypes } from "./../reducers/actions/keyActions";
import { fetchUsers } from "./../reducers/actions/userActions";
import PermissionUtils from "./../utils/PermissionUtils";
import AddKeyHolder from "./subpages/AddKeyHolder";

import {
  Key,
  KeyType,
  Permission,
  StudentUnion,
  User,
} from "@alehuo/clubhouse-shared";
import CustomOverlay from "../components/CustomOverlay";
import { fetchStudentUnions } from "../reducers/actions/studentUnionActions";
import { RootState } from "../reduxStore";

interface Props {
  token: string;
  fetchKeys: any;
  fetchKeyTypes: any;
  fetchUsers: any;
  fetchStudentUnions: any;
  perms: number;
  toggleModal: any;
  keys: Key[];
  modalOpen: boolean;
  keyTypes: KeyType[];
  users: User[];
  studentUnions: StudentUnion[];
}

export class KeysPage extends React.Component<Props> {
  public componentWillMount() {
    this.fetchKeys();
  }
  public fetchKeys = () => {
    if (
      this.props.token !== "" &&
      this.props.perms &&
      PermissionUtils.hasPermission(
        this.props.perms,
        Permission.ALLOW_VIEW_KEYS,
      )
    ) {
      this.props.fetchKeys(this.props.token);
      this.props.fetchKeyTypes(this.props.token);
      this.props.fetchUsers(this.props.token);
      this.props.fetchStudentUnions(this.props.token);
    }
  }
  public render() {
    if (this.props.token === "") {
      return <div />;
    }
    return (
      <React.Fragment>
        <div>
          Keys
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permission.ALLOW_ADD_REMOVE_KEYS,
            ) && (
              <CustomOverlay id="addKey" text="Add a new keyholder.">
                <Button
                  variant="success"
                  onClick={() => this.props.toggleModal(true)}
                >
                  <FontAwesome name="plus" /> Add a keyholder
                </Button>
              </CustomOverlay>
            )}
            {"  "}
            {
              <CustomOverlay
                id="sendEmail"
                text="Send an email to all verified keyholders in the system."
              >
                <Button variant="info">
                  <FontAwesome name="envelope" /> Send an email to keyholder(s)
                </Button>
              </CustomOverlay>
            }
          </p>
        </div>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permission.ALLOW_VIEW_KEYS,
        ) ? (
          <KeysList
            keys={this.props.keys}
            studentUnions={this.props.studentUnions}
            keyTypes={this.props.keyTypes}
            users={this.props.users}
          />
        ) : (
          <Alert variant="warning">
            <h4>No permission to view keys</h4>
            <p>You don't have correct permissions to view keys.</p>
          </Alert>
        )}
        <AddKeyHolder
          show={this.props.modalOpen}
          onHide={() => this.props.toggleModal(false)}
          keyTypes={this.props.keyTypes}
          users={this.props.users}
          studentUnions={this.props.studentUnions}
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
  perms: state.user.userPerms,
  studentUnions: state.studentUnion.studentUnions,
});

const mapDispatchToProps = {
  toggleModal,
  fetchKeys,
  fetchKeyTypes,
  fetchUsers,
  fetchStudentUnions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeysPage);
