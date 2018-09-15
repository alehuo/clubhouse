import React from "react";
import { connect } from "react-redux";

import { HelpBlock, Button } from "react-bootstrap";
import { Field, reduxForm, formValueSelector } from "redux-form";

import { FieldGroup } from "./../components/FieldGroup";
import { checked } from "./../utils/FormValidators";

const userFilter = (users, id) => {
  const user = users.find(user => Number(user.userId) === Number(id));
  if (!user) {
    return "N/A";
  }
  return user.firstName + " " + user.lastName;
};

const confirmed = checked("You must have the permission to add a key");

const AddKeyHolderForm = props => {
  const {
    handleSubmit,
    users,
    keyTypes,
    handleClose,
    selectedKey,
    selectedUser
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FieldGroup}
        name="user"
        componentClass="select"
        label="User"
      >
        {users &&
          users.map(user => (
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
          keyTypes.map(keyType => (
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
          {selectedKey &&
            selectedUser && (
              <span>
                <b>
                  {
                    keyTypes.find(
                      keyType => Number(keyType.id) === Number(selectedKey)
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
        {props.isAdding ? "Adding key to user..." : "Add"}
      </Button>
    </form>
  );
};

const AddKeyHolderFormRx = reduxForm({
  form: "keyHolder"
})(AddKeyHolderForm);

const selector = formValueSelector("keyHolder");

const mapStateToProps = state => {
  return {
    initialValues: {
      keyType: 1,
      user: 1
    }
  };
};

export default connect(
  state => ({
    selectedUser: selector(state, "user"),
    selectedKey: selector(state, "keyType")
  }),
  mapStateToProps
)(AddKeyHolderFormRx);
