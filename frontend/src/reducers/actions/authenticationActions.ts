import { action } from 'typesafe-actions';
import * as authenticationActions from '../constants';

export const authenticateUser = (token: string) => action(authenticationActions.AUTHENTICATE_USER, { token });

export const deAuthenticateUser = () => action(authenticationActions.DEAUTHENTICATE_USER);

export const setIsLoggingIn = (isLoggingIn: boolean) =>
    action(authenticationActions.SET_IS_LOGGING_IN, { isLoggingIn });
