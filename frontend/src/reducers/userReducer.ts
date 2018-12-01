import UserService from "../services/UserService";
import { successMessage, errorMessage } from "./notificationReducer";
import { authenticateUser, setIsLoggingIn } from "./authenticationReducer";
import { getUserPerms } from "./permissionReducer";
import { fetchOwnWatchStatus } from "./sessionReducer";
import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface UserState {
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
  isRegistering: false
};

export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN",
  SET_USERS: "SET_USERS",
  ADD_USER_FORM_MODAL_OPEN: "ADD_USER_FORM_MODAL_OPEN",
  REMOVE_USER: "REMOVE_USER",
  SET_USER_DATA: "SET_USER_DATA",
  CLEAR_USER_DATA: "CLEAR_USER_DATA"
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
    } catch (ex) {
      dispatch(setIsLoggingIn(false));
      dispatch(errorMessage(ex.response.data.error));
      console.error(ex);
    }
  };
};

export const setToken = (token: string) => {
  return {
    type: userActions.SET_TOKEN,
    token
  };
};

export const setUsers = (users: any) => {
  return {
    type: userActions.SET_USERS,
    users
  };
};

export const deleteUser = (userId: number, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await UserService.remove(userId, token);
      dispatch(successMessage("Successfully deleted user"));
      dispatch(removeUserFromList(userId));
    } catch (ex) {
      dispatch(errorMessage(ex.response.data.error));
      console.error(ex);
    }
  };
};

export const removeUserFromList = (userId: number) => {
  return {
    type: userActions.REMOVE_USER,
    userId
  };
};

export const fetchUsers = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await UserService.getUsers(token);
      dispatch(setUsers(res.data));
    } catch (ex) {
      dispatch(errorMessage(ex.response.data.error));
    }
  };
};

export const setUserData = (data: any) => {
  return {
    type: userActions.SET_USER_DATA,
    data
  };
};

export const fetchUserData = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await UserService.getOwnData(token);
      dispatch(setUserData(res.data));
    } catch (ex) {
      dispatch(errorMessage(ex.response.data.error));
    }
  };
};

export const addFormModalOpen = (status: boolean) => {
  return {
    type: userActions.ADD_USER_FORM_MODAL_OPEN,
    status
  };
};

export const addUser = (user: any) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await UserService.register(user);
      dispatch(
        successMessage(
          "User successfully registered. Please use your email and password to login."
        )
      );
    } catch (err) {
      dispatch(errorMessage("Error registering user"));
    }
  };
};

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_TOKEN:
      return { ...{}, ...state, ...{ token: action.token } };
    case userActions.SET_USERS:
      return { ...{}, ...state, ...{ users: action.users } };
    case userActions.ADD_USER_FORM_MODAL_OPEN:
      return { ...{}, ...state, ...{ modalOpen: action.status } };
    case userActions.REMOVE_USER:
      return {
        ...{},
        ...state,
        ...{
          users: state.users.filter(user => user.userId !== action.userId)
        }
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
