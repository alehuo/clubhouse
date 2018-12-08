import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import UserService from "../services/UserService";
import { authenticateUser, setIsLoggingIn } from "./actions/authenticationActions";
import { errorMessage, successMessage } from "./actions/notificationActions";
import { getUserPerms } from "./permissionReducer";
import { fetchOwnWatchStatus } from "./sessionReducer";

export interface UserState {
  token: string;
  users: any[];
  userData: any;
  modalOpen: boolean;
  isRegistering: boolean;
}

const initialState = {
  token: "",
  users: [],
  userData: {},
  modalOpen: false,
  isRegistering: false,
};

export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN",
  SET_USERS: "SET_USERS",
  REMOVE_USER: "REMOVE_USER",
  SET_USER_DATA: "SET_USER_DATA",
  CLEAR_USER_DATA: "CLEAR_USER_DATA",
};

export const login = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      dispatch(setIsLoggingIn(true));
      const loginResponse = await UserService.login(email, password);
      dispatch(setToken(loginResponse.data.token));
      localStorage.setItem("token", loginResponse.data.token);
      dispatch(fetchOwnWatchStatus(localStorage.getItem("token") || ""));
      dispatch(getUserPerms(loginResponse.data.token));
      dispatch(authenticateUser());
      dispatch(successMessage("Successfully logged in"));
      dispatch(setIsLoggingIn(false));
      dispatch(fetchUserData(loginResponse.data.token));
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

export const setToken = (token: string) => {
  return {
    type: userActions.SET_TOKEN,
    token,
  };
};

export const setUsers = (users: any) => {
  return {
    type: userActions.SET_USERS,
    users,
  };
};

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

export const removeUserFromList = (userId: number) => {
  return {
    type: userActions.REMOVE_USER,
    userId,
  };
};

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

export const setUserData = (data: any) => {
  return {
    type: userActions.SET_USER_DATA,
    data,
  };
};

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

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_TOKEN:
      return { ...{}, ...state, ...{ token: action.token } };
    case userActions.SET_USERS:
      return { ...{}, ...state, ...{ users: action.users } };
    case userActions.REMOVE_USER:
      return {
        ...{},
        ...state,
        ...{
          users: state.users.filter((user) => user.userId !== action.userId),
        },
      };
    case userActions.SET_USER_DATA:
      return { ...{}, ...state, ...{ userData: action.data } };
    case userActions.CLEAR_USER_DATA:
      return { ...{}, ...state, ...{ userData: {} } };
    default:
      return state;
  }
};

export default userReducer;
