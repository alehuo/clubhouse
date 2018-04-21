import UserService from "./../services/UserService";
import { successMessage, errorMessage } from "./notificationReducer";
import { authenticateUser, setIsLoggingIn } from "./authenticationReducer";
import { getUserPerms } from "./permissionReducer";

const initialState = {
  token: null
};

export const userActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN"
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      dispatch(setIsLoggingIn(true));
      const loginResponse = await UserService.login(username, password);
      dispatch(setToken(loginResponse.data.token));
      localStorage.setItem("token", loginResponse.data.token);
      dispatch(getUserPerms(loginResponse.data.token));
      dispatch(authenticateUser());
      dispatch(successMessage("Successfully logged in"));
      dispatch(setIsLoggingIn(false));
    } catch (ex) {
      dispatch(setIsLoggingIn(false));
      dispatch(errorMessage("Failed to log in"));
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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_TOKEN:
      return Object.assign({}, state, { token: action.token });
    default:
      return state;
  }
};

export default userReducer;
