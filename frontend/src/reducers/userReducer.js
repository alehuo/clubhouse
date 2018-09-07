import UserService from "../services/UserService";
import { successMessage, errorMessage } from "./notificationReducer";
import { authenticateUser, setIsLoggingIn } from "./authenticationReducer";
import { getUserPerms } from "./permissionReducer";
import { fetchOwnWatchStatus } from "./sessionReducer";

const initialState = {
  token: null,
  users: [],
  modalOpen: false
};

export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN",
  SET_USERS: "SET_USERS",
  ADD_USER_FORM_MODAL_OPEN: "ADD_USER_FORM_MODAL_OPEN",
  REMOVE_USER: "REMOVE_USER"
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      dispatch(setIsLoggingIn(true));
      const loginResponse = await UserService.login(email, password);
      dispatch(setToken(loginResponse.data.token));
      localStorage.setItem("token", loginResponse.data.token);
      dispatch(fetchOwnWatchStatus(localStorage.getItem("token")));
      dispatch(getUserPerms(loginResponse.data.token));
      dispatch(authenticateUser());
      dispatch(successMessage("Successfully logged in"));
      dispatch(setIsLoggingIn(false));
    } catch (ex) {
      dispatch(setIsLoggingIn(false));
      dispatch(errorMessage(ex.response.data.error));
      console.error(ex);
    }
  };
};

export const setToken = token => {
  return {
    type: userActions.SET_TOKEN,
    token
  };
};

export const setUsers = users => {
  return {
    type: userActions.SET_USERS,
    users
  };
};

export const deleteUser = (userId, token) => {
  return async dispatch => {
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

export const removeUserFromList = userId => {
  return {
    type: userActions.REMOVE_USER,
    userId
  };
};

export const fetchUsers = token => {
  return async dispatch => {
    try {
      const res = await UserService.getUsers(token);
      dispatch(setUsers(res.data));
    } catch (ex) {
      dispatch(errorMessage(ex.response.data.error));
    }
  };
};

export const addFormModalOpen = status => {
  return {
    type: userActions.ADD_USER_FORM_MODAL_OPEN,
    status
  };
};

export const addUser = user => {
  return async dispatch => {
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

const userReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default userReducer;
