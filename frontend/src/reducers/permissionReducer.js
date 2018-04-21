import PermissionService from "./../services/PermissionService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  userPerms: []
};

export const permissionActions = {
  SET_USER_PERMS: "SET_USER_PERMS"
};

export const setUserPerms = permissions => {
  return {
    type: permissionActions.SET_USER_PERMS,
    permissions
  };
};

export const getUserPerms = token => {
  return async dispatch => {
    try {
      const res = await PermissionService.getUserPermissions(token);
    } catch (err) {
      dispatch(errorMessage("Failed to fetch user permissions"));
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case permissionActions.SET_USER_PERMS:
      return Object.assign({}, state, { userPerms: action.permissions });
    default:
      return state;
  }
};
