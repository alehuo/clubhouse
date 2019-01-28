import {
  ApiResponse,
  DbUser,
  isString,
  isUser,
} from "@alehuo/clubhouse-shared";
import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import PermissionService from "../../services/PermissionService";
import UserService from "../../services/UserService";
import {
  CLEAR_USER_DATA,
  DELETE_USER,
  LOGIN,
  REMOVE_USER,
  SET_TOKEN,
  SET_USER_DATA,
  SET_USER_PERMS,
  SET_USERS,
} from "../constants";
import { deAuthenticateUser } from "./authenticationActions";
import { errorMessage, successMessage } from "./notificationActions";

export const login = (email: string, password: string) =>
  action(LOGIN, { email, password });

export const setToken = (token: string) => action(SET_TOKEN, { token });

export const setUsers = (users: any) => action(SET_USERS, { users });

export const deleteUser = (userId: number, token: string) =>
  action(DELETE_USER, { userId, token });

export const removeUserFromList = (userId: number) =>
  action(REMOVE_USER, { userId });

export const fetchUsers = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await UserService.getUsers(token);
      if (res.payload !== undefined) {
        const users = res.payload;
        if (users.every(isUser)) {
          dispatch(setUsers(users));
        } else {
          dispatch(errorMessage("Back-end returned malformed users."));
        }
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching users"));
      }
    }
  };
};

export const setUserData = (data: any) => action(SET_USER_DATA, { data });

export const fetchUserData = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await UserService.getOwnData(token);
      if (res.payload !== undefined) {
        dispatch(setUserData(res.payload));
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching user data"));
      }
    }
  };
};

export const addUser = (user: Partial<DbUser>) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      if (
        !isString(user.email) ||
        !isString(user.firstName) ||
        !isString(user.lastName) ||
        !isString(user.password)
      ) {
        dispatch(errorMessage("Malformed form data"));
      } else {
        const res = await UserService.register(
          user.email,
          user.firstName,
          user.lastName,
          user.password,
        );
        if (res.payload !== undefined) {
          dispatch(
            successMessage(
              "User successfully registered. Please use your email and password to login.",
            ),
          );
        } else {
          console.log("Response payload was undefined.");
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error registering user"));
      }
    }
  };
};

export const clearUserData = () => action(CLEAR_USER_DATA);

export const setUserPerms = (permissions: number) =>
  action(SET_USER_PERMS, { permissions });

export const getUserPerms = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await PermissionService.getUserPermissions(token);
      if (res.payload !== undefined) {
        dispatch(setUserPerms(res.payload.permissions));
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        dispatch(errorMessage("Error fetching user permissions"));
      }
      dispatch(deAuthenticateUser());
    }
  };
};
