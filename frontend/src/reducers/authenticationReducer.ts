import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions/authenticationActions";
import {
  AUTHENTICATE_USER,
  DEAUTHENTICATE_USER,
  SET_IS_LOGGING_IN,
} from "./constants";

// Initial authentication reducer state
export interface AuthenticationState {
  readonly isLoggingIn: boolean;
  readonly isAuthenticated: boolean;
}

const initialState: AuthenticationState = {
  isLoggingIn: false,
  isAuthenticated: false,
};

export type AuthenticationAction = ActionType<typeof actions>;

const authenticationReducer: Reducer<
  AuthenticationState,
  AuthenticationAction
> = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...{}, ...state, isAuthenticated: true };
    case DEAUTHENTICATE_USER:
      return { ...{}, ...state, isAuthenticated: false };
    case SET_IS_LOGGING_IN:
      return { ...{}, ...state, isLoggingIn: action.payload.isLoggingIn };
    default:
      return state;
  }
};

export default authenticationReducer;
