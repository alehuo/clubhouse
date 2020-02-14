import { DbUser } from '@alehuo/clubhouse-shared';
import { action } from 'typesafe-actions';
import {
    ADD_USER,
    CLEAR_USER_DATA,
    DELETE_USER,
    FETCH_USER_DATA,
    FETCH_USERS,
    GET_USER_PERMS,
    LOGIN,
    REMOVE_USER,
    SET_USER_DATA,
    SET_USER_PERMS,
    SET_USERS,
} from '../constants';

export const login = (email: string, password: string, rememberMe: boolean) =>
    action(LOGIN, { email, password, rememberMe });

export const setUsers = (users: any) => action(SET_USERS, { users });

export const deleteUser = (userId: number) => action(DELETE_USER, { userId });

export const removeUserFromList = (userId: number) => action(REMOVE_USER, { userId });

export const fetchUsers = () => action(FETCH_USERS);

export const setUserData = (data: any) => action(SET_USER_DATA, { data });

export const fetchUserData = () => action(FETCH_USER_DATA);

export const addUser = (user: Partial<DbUser>) => action(ADD_USER, { user });

export const clearUserData = () => action(CLEAR_USER_DATA);

export const setUserPerms = (permissions: number) => action(SET_USER_PERMS, { permissions });

export const getUserPerms = () => action(GET_USER_PERMS);
