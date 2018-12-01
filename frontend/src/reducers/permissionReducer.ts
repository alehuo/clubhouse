import PermissionService from "../services/PermissionService";
import { errorMessage } from "./notificationReducer";
import { deAuthenticateUser } from "./authenticationReducer";
import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface PermissionState {
  userPerms: number;
}

const initialState = {
  userPerms: 0
};

export const permissionActions = {
  SET_USER_PERMS: "SET_USER_PERMS"
};

export const setUserPerms = (permissions: number) => {
  return {
    type: permissionActions.SET_USER_PERMS,
    permissions
  };
};

export const getUserPerms = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await PermissionService.getUserPermissions(token);
      dispatch(setUserPerms(res.data));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
      dispatch(deAuthenticateUser());
    }
  };
};

const permissionReducer: Reducer<PermissionState, any> = (
  state = initialState,
  action
) => {
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

export default permissionReducer;
