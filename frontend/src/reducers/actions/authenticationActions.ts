import { action } from "typesafe-actions";
import * as authenticationActions from "../constants/authenticationConstants";

export const authenticateUser = () =>
  action(authenticationActions.AUTHENTICATE_USER);

export const deAuthenticateUser = () =>
  action(authenticationActions.DEAUTHENTICATE_USER);

export const setIsLoggingIn = (isLoggingIn: boolean) =>
  action(authenticationActions.SET_IS_LOGGING_IN, { isLoggingIn });
