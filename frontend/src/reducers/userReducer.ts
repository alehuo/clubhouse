import { User } from '@alehuo/clubhouse-shared';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as userActions from './actions/userActions';
import { CLEAR_USER_DATA, REMOVE_USER, SET_USER_DATA, SET_USER_PERMS, SET_USERS } from './constants';

export interface UserState {
    readonly users: User[];
    readonly userData?: User;
    readonly userPerms: number;
    readonly modalOpen: boolean;
    readonly isRegistering: boolean;
}

const initialState: UserState = {
    users: [],
    userData: undefined,
    userPerms: 0,
    modalOpen: false,
    isRegistering: false,
};

type UserAction = ActionType<typeof userActions>;

const userReducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...{}, ...state, ...{ users: action.payload.users } };
        case REMOVE_USER:
            return {
                ...{},
                ...state,
                ...{
                    users: state.users.filter(user => user.userId !== action.payload.userId),
                },
            };
        case SET_USER_DATA:
            return { ...{}, ...state, ...{ userData: action.payload.data } };
        case CLEAR_USER_DATA:
            return { ...{}, ...state, ...{ userData: {} } };
        case SET_USER_PERMS:
            return {
                ...{},
                ...state,
                userPerms: action.payload.permissions,
            };
        default:
            return state;
    }
};

export default userReducer;
