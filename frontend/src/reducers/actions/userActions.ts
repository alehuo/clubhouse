import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import UserService from "../../services/UserService";
import { fetchOwnSessionStatus } from "../actions/sessionActions";
import { CLEAR_USER_DATA, REMOVE_USER, SET_TOKEN, SET_USER_DATA, SET_USERS } from "../constants";
import { getUserPerms } from "../permissionReducer";
import { authenticateUser, setIsLoggingIn } from "./authenticationActions";
import { errorMessage, successMessage } from "./notificationActions";

export const login = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      dispatch(setIsLoggingIn(true));
      const loginResponse = await UserService.login(email, password);
      const token: string = loginResponse.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      dispatch(fetchOwnSessionStatus(token));
      dispatch(getUserPerms(token));
      dispatch(fetchUserData(token));
      dispatch(authenticateUser());
      dispatch(successMessage("Successfully logged in"));
      dispatch(setIsLoggingIn(false));
    } catch (err) {
      dispatch(setIsLoggingIn(false));
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error logging in"));
      }
    }
  };
};

export const setToken = (token: string) => action(SET_TOKEN, { token });

export const setUsers = (users: any) => action(SET_USERS, { users });

export const deleteUser = (userId: number, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await UserService.remove(userId, token);
      dispatch(successMessage("Successfully deleted user"));
      dispatch(removeUserFromList(userId));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error deleting user"));
      }
    }
  };
};

export const removeUserFromList = (userId: number) =>
  action(REMOVE_USER, { userId });

export const fetchUsers = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await UserService.getUsers(token);
      dispatch(setUsers(res.data));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
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
      dispatch(setUserData(res.data));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching user data"));
      }
    }
  };
};

export const addUser = (user: any) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await UserService.register(user);
      dispatch(
        successMessage(
          "User successfully registered. Please use your email and password to login.",
        ),
      );
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error registering user"));
      }
    }
  };
};

export const clearUserData = () => action(CLEAR_USER_DATA);
