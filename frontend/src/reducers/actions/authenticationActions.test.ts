import { AUTHENTICATE_USER, DEAUTHENTICATE_USER, SET_IS_LOGGING_IN } from '../constants';
import { authenticateUser, deAuthenticateUser, setIsLoggingIn } from './authenticationActions';

describe('Authentication actions', () => {
    it('Should create an action to authenticate user', () => {
        const expectedAction: ReturnType<typeof authenticateUser> = {
            type: AUTHENTICATE_USER,
        };
        expect(authenticateUser()).toEqual(expectedAction);
    });
    it('Should create an action to deauthenticate user', () => {
        const expectedAction: ReturnType<typeof deAuthenticateUser> = {
            type: DEAUTHENTICATE_USER,
        };
        expect(deAuthenticateUser()).toEqual(expectedAction);
    });

    it('Should create an action to set the login state', () => {
        const expectedAction: ReturnType<typeof setIsLoggingIn> = {
            type: SET_IS_LOGGING_IN,
            payload: {
                isLoggingIn: true,
            },
        };
        expect(setIsLoggingIn(true)).toEqual(expectedAction);
    });
});
