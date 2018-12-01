import { Reducer } from "redux";

interface AuthenticationState {
  isLoggingIn: boolean;
  isAuthenticated: boolean;
}

const initialState = {
  isLoggingIn: false,
  isAuthenticated: false,
};

export const authenticationActions = {
  SET_IS_LOGGING_IN: "SET_IS_LOGGING_IN",
  AUTHENTICATE_USER: "AUTHENTICATE_USER",
  DEAUTHENTICATE_USER: "DEAUTHENTICATE_USER",
};

export const authenticateUser = () => {
  return {
    type: authenticationActions.AUTHENTICATE_USER,
  };
};

export const deAuthenticateUser = () => {
  return {
    type: authenticationActions.DEAUTHENTICATE_USER,
  };
};

export const setIsLoggingIn = (isLoggingIn: boolean) => {
  return {
    type: authenticationActions.SET_IS_LOGGING_IN,
    isLoggingIn,
  };
};

// TODO: Action typings
const authenticationReducer: Reducer<AuthenticationState, any> = (state = initialState, action) => {
  switch (action.type) {
    case authenticationActions.AUTHENTICATE_USER:
      return { ...{}, ...state, isAuthenticated: true };
    case authenticationActions.DEAUTHENTICATE_USER:
      return { ...{}, ...state, isAuthenticated: false };
    case authenticationActions.SET_IS_LOGGING_IN:
      return { ...{}, ...state, isLoggingIn: action.isLoggingIn };
    default:
      return state;
  }
};

export default authenticationReducer;
