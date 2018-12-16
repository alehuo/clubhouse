import React from "react";
import { Alert, Button, PageHeader } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import KeysList from "./../components/KeysList";
import { toggleModal } from "./../reducers/actions/keyActions";
import { fetchKeys, fetchKeyTypes } from "./../reducers/actions/keyActions";
import { fetchUsers } from "./../reducers/actions/userActions";
import PermissionUtils from "./../utils/PermissionUtils";
import AddKeyHolder from "./subpages/AddKeyHolder";

import { Permission } from "@alehuo/clubhouse-shared";
import CustomOverlay from "../components/CustomOverlay";
import { RootState } from "../reduxStore";

interface Props {
  token: string;
  fetchKeys: any;
  fetchKeyTypes: any;
  fetchUsers: any;
  perms: number;
  toggleModal: any;
  keys: any;
  modalOpen: boolean;
  keyTypes: any;
  users: any;
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
    }
  }
  public render() {
    if (this.props.token === "") {
      return <div />;
    }
    return (
      <React.Fragment>
        <PageHeader>
          Keys
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permission.ALLOW_ADD_REMOVE_KEYS,
            ) && (
              <CustomOverlay id="addKey" text="Add a new keyholder.">
                <Button
                  bsStyle="success"
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
                <Button bsStyle="info">
                  <FontAwesome name="envelope" /> Send an email to keyholder(s)
                </Button>
              </CustomOverlay>
            }
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permission.ALLOW_VIEW_KEYS,
        ) ? (
          <KeysList keys={this.props.keys} />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view keys</h4>
            <p>You don't have correct permissions to view keys.</p>
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
  perms: state.user.userPerms,
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
