import React from "react";
import { connect } from "react-redux";

import { Button, HelpBlock } from "react-bootstrap";
import { Field, formValueSelector, reduxForm } from "redux-form";

import { KeyType, StudentUnion, User } from "@alehuo/clubhouse-shared";
import { RootState } from "../reduxStore";
import { FieldGroup } from "./../components/FieldGroup";
import { checked } from "./../utils/FormValidators";

const userFilter = (users: any, id: number) => {
  const user = users.find((usr: any) => Number(usr.userId) === Number(id));
  if (!user) {
    return "N/A";
  }
  return user.firstName + " " + user.lastName;
};

const confirmed = checked("You must have the permission to add a key");

interface Props {
  handleSubmit: any;
  handleClose: any;
  selectedKey: number;
  selectedUser: number;
  isAdding: boolean;
  users: User[];
  keyTypes: KeyType[];
  studentUnions: StudentUnion[];
}

const AddKeyHolderForm: React.SFC<Props> = ({
  handleSubmit,
  users,
  studentUnions,
  keyTypes,
  handleClose,
  selectedKey,
  selectedUser,
  isAdding,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      component={FieldGroup}
      name="user"
      componentClass="select"
      label="User"
    >
      {users &&
        users.map((user) => (
          <option key={user.firstName + user.lastName} value={user.userId}>
            {user.firstName + " " + user.lastName}
          </option>
        ))}
    </Field>
    <Field
      component={FieldGroup}
      name="studentUnion"
      componentClass="select"
      label="Student union"
    >
      {studentUnions &&
        studentUnions.map((stdu) => (
          <option key={stdu.unionId} value={stdu.unionId}>
            {stdu.name}
          </option>
        ))}
    </Field>
    <Field
      component={FieldGroup}
      name="keyType"
      componentClass="select"
      label="Key type"
    >
      {keyTypes &&
        keyTypes.map((keyType) => (
          <option key={keyType.keyTypeId} value={keyType.keyTypeId}>
            {keyType.title}
          </option>
        ))}
    </Field>
    <Field
      name="description"
      type="text"
      label="Key description"
      component={FieldGroup}
    />
    <Field
      name="studentUnionPermission"
      type="checkbox"
      label="Agreement"
      component={FieldGroup}
      validate={[confirmed]}
    />{" "}
    <HelpBlock>
      By checking this checkbox you agree you have the permission to add the
      following key:
      <p>
        {selectedKey && selectedUser && keyTypes && (
          <span>
            <b>
              {keyTypes &&
                keyTypes.find(
                  (keyType) => Number(keyType.keyTypeId) === Number(selectedKey),
                )!.title}{" "}
              key
            </b>{" "}
            for user <b>{userFilter(users, selectedUser)}</b>
          </span>
        )}
      </p>
    </HelpBlock>
    <Button type="button" bsStyle="danger" onClick={handleClose}>
      Cancel
    </Button>
    {"   "}
    <Button type="submit" bsStyle="success">
      {isAdding ? "Adding key to user..." : "Add"}
    </Button>
  </form>
);

const AddKeyHolderFormRx = reduxForm<FormData, any, string>({
  form: "keyHolder",
})(AddKeyHolderForm);

const selector = formValueSelector("keyHolder");

const mapStateToProps = (state: RootState) => {
  return {
    initialValues: {
      keyType: 1,
      user: 1,
    },
  };
};

export default connect<{ selectedUser: number; selectedKey: number }>(
  (state) => ({
    selectedUser: selector(state, "user"),
    selectedKey: selector(state, "keyType"),
  }),
  mapStateToProps,
)(AddKeyHolderFormRx);
