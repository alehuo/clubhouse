const initialState = {
  isLoggingIn: false,
  isAuthenticated: false
};

export const authenticationActions = {
  SET_IS_LOGGING_IN: "SET_IS_LOGGING_IN",
  AUTHENTICATE_USER: "AUTHENTICATE_USER",
  DEAUTHENTICATE_USER: "DEAUTHENTICATE_USER"
};

export const authenticateUser = () => {
  return {
    type: authenticationActions.AUTHENTICATE_USER
  };
};

export const deAuthenticateUser = () => {
  return {
    type: authenticationActions.DEAUTHENTICATE_USER
  };
};

export const setIsLoggingIn = isLoggingIn => {
  return {
    type: authenticationActions.SET_IS_LOGGING_IN,
    isLoggingIn
  };
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case authenticationActions.AUTHENTICATE_USER:
      return Object.assign({}, state, { isAuthenticated: true });
    case authenticationActions.DEAUTHENTICATE_USER:
      return Object.assign({}, state, { isAuthenticated: false });
    case authenticationActions.SET_IS_LOGGING_IN:
      return Object.assign({}, state, { isLoggingIn: action.isLoggingIn });
    default:
      return state;
  }
};

export default authenticationReducer;
