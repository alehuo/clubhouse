import React from "react";
import { connect } from "react-redux";

import { Button, HelpBlock } from "react-bootstrap";
import { Field, formValueSelector, reduxForm } from "redux-form";

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

const AddKeyHolderForm: React.SFC<any> = ({
  handleSubmit,
  users,
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
        users.map((user: any) => (
          <option key={user.firstName + user.lastName} value={user.userId}>
            {user.firstName + " " + user.lastName}
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
        keyTypes.map((keyType: any) => (
          <option key={keyType.id} value={keyType.id}>
            {keyType.title}
          </option>
        ))}
    </Field>
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
        {selectedKey && selectedUser && (
          <span>
            <b>
              {
                keyTypes.find(
                  (keyType: any) => Number(keyType.id) === Number(selectedKey),
                ).title
              }{" "}
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

const AddKeyHolderFormRx = reduxForm<{}, any, string>({
  form: "keyHolder",
})(AddKeyHolderForm);

const selector = formValueSelector("keyHolder");

const mapStateToProps = (state: any) => {
  return {
    initialValues: {
      keyType: 1,
      user: 1,
    },
  };
};

export default connect(
  (state) => ({
    selectedUser: selector(state, "user"),
    selectedKey: selector(state, "keyType"),
  }),
  mapStateToProps,
)(AddKeyHolderFormRx);
