import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions/authenticationActions';
import { AUTHENTICATE_USER, DEAUTHENTICATE_USER, SET_IS_LOGGING_IN } from './constants';

// Initial authentication reducer state
export interface AuthenticationState {
    readonly token: string | null;
    readonly isLoggingIn: boolean;
}

const initialState: AuthenticationState = {
    token: null,
    isLoggingIn: false,
};

export type AuthenticationAction = ActionType<typeof actions>;

const authenticationReducer: Reducer<AuthenticationState, AuthenticationAction> = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...{}, ...state, token: action.payload.token };
        case DEAUTHENTICATE_USER:
            return { ...{}, ...state, token: null };
        case SET_IS_LOGGING_IN:
            return { ...{}, ...state, isLoggingIn: action.payload.isLoggingIn };
        default:
            return state;
    }
};

export default authenticationReducer;
