import PermissionService from "./../services/PermissionService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  userPerms: 0
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
      dispatch(setUserPerms(res.data.permissions));
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
