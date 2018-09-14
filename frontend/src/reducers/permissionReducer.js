import PermissionService from "../services/PermissionService";
import { errorMessage } from "./notificationReducer";
import { deAuthenticateUser } from "./authenticationReducer";

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
      dispatch(setUserPerms(res.data));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
      dispatch(deAuthenticateUser());
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case permissionActions.SET_USER_PERMS:
      return {
        ...{},
        ...state,
        userPerms: action.permissions.permissions
      };
    default:
      return state;
  }
};
