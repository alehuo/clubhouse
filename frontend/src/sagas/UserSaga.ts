import { ApiResponse, isString, isUser } from '@alehuo/clubhouse-shared';
import { push } from 'connected-react-router';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { authenticateUser, deAuthenticateUser, setIsLoggingIn } from '../reducers/actions/authenticationActions';
import { errorMessage, successMessage } from '../reducers/actions/notificationActions';
import { fetchOwnSessionStatus } from '../reducers/actions/sessionActions';
import {
    addUser,
    deleteUser,
    login,
    removeUserFromList,
    setUserData,
    setUserPerms,
    setUsers,
} from '../reducers/actions/userActions';
import { ADD_USER, DELETE_USER, FETCH_USER_DATA, FETCH_USERS, GET_USER_PERMS, LOGIN } from '../reducers/constants';
import PermissionService from '../services/PermissionService';
import UserService from '../services/UserService';
import { RootState } from '../reduxStore';

function* userSaga_login(action: ReturnType<typeof login>) {
    try {
        yield put(setIsLoggingIn(true));
        const loginResponse = yield call(UserService.login, action.payload.email, action.payload.password);
        if (loginResponse.payload !== undefined) {
            const token = String(loginResponse.payload.token);
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
            yield put(authenticateUser(token));
            yield put(fetchOwnSessionStatus(token));
            const userPerms = yield call(PermissionService.getUserPermissions, token);
            yield put(setUserPerms(userPerms.payload.permissions));
            const userdata = yield call(UserService.getOwnData, token);
            yield put(setUserData(userdata.payload));
            yield put(successMessage('Successfully logged in'));
            yield put(push('/'));
        } else {
            yield put(errorMessage('Response payload was undefined.'));
        }
        yield put(setIsLoggingIn(false));
    } catch (err) {
        yield put(setIsLoggingIn(false));
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            yield put(errorMessage('Error logging in'));
        }
    }
}

function* userSaga_deleteUser(action: ReturnType<typeof deleteUser>) {
    try {
        const token = yield select((state: RootState) => state.auth.token);
        if (token !== null) {
            yield call(UserService.remove, action.payload.userId, String(token));
            yield put(successMessage('Successfully deleted user'));
            yield put(removeUserFromList(action.payload.userId));
        } else {
            yield put(successMessage('User is unauthenticated, cannot delete user'));
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            yield put(errorMessage('Error deleting user'));
        }
    }
}

function* userSaga_fetchUsers() {
    try {
        const token = yield select((state: RootState) => state.auth.token);
        if (token !== null) {
            const res = yield call(UserService.getUsers, String(token));
            if (res.payload !== undefined) {
                const users = res.payload;
                if (users.every(isUser)) {
                    yield put(setUsers(users));
                } else {
                    yield put(errorMessage('Back-end returned malformed users.'));
                }
            } else {
                yield put(errorMessage('Response payload was undefined.'));
            }
        } else {
            yield put(errorMessage('User is unauthenticated, cannot fetch users.'));
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            yield put(errorMessage('Error fetching users'));
        }
    }
}

function* userSaga_addUser(action: ReturnType<typeof addUser>) {
    try {
        const user = action.payload.user;
        if (
            !isString(user.email) ||
            !isString(user.firstName) ||
            !isString(user.lastName) ||
            !isString(user.password)
        ) {
            yield put(errorMessage('Malformed form data'));
        } else {
            const res = yield call(UserService.register, user.email, user.firstName, user.lastName, user.password);
            if (res.payload !== undefined) {
                yield put(successMessage('User successfully registered. Please use your email and password to login.'));
            } else {
                yield put(errorMessage('Response payload was undefined.'));
            }
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            yield put(errorMessage('Error registering user'));
        }
    }
}

function* userSaga_fetchUserData() {
    try {
        const token = yield select((state: RootState) => state.auth.token);
        if (token !== null) {
            const res = yield call(UserService.getOwnData, String(token));
            if (res.payload !== undefined) {
                yield put(setUserData(res.payload));
            } else {
                yield put(errorMessage('Response payload was undefined.'));
            }
        } else {
            yield put(errorMessage('User is unauthenticated, cannot fetch user data.'));
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            yield put(errorMessage('Error fetching user data'));
        }
    }
}

function* userSaga_getUserPerms() {
    try {
        const token = yield select((state: RootState) => state.auth.token);
        if (token !== null) {
            const res = yield call(PermissionService.getUserPermissions, String(token));
            if (res.payload !== undefined) {
                yield put(setUserPerms(res.payload.permissions));
            } else {
                yield put(errorMessage('Response payload was undefined.'));
            }
        } else {
            yield put(errorMessage('User is unauthenticated, cannot get user permissions.'));
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                yield put(errorMessage(res.error.message));
            }
        } else {
            yield put(errorMessage('Error fetching user permissions'));
        }
        yield put(deAuthenticateUser());
    }
}

function* userSaga() {
    yield takeEvery(LOGIN, userSaga_login);
    yield takeEvery(DELETE_USER, userSaga_deleteUser);
    yield takeEvery(FETCH_USERS, userSaga_fetchUsers);
    yield takeEvery(ADD_USER, userSaga_addUser);
    yield takeEvery(FETCH_USER_DATA, userSaga_fetchUserData);
    yield takeEvery(GET_USER_PERMS, userSaga_getUserPerms);
}

export default userSaga;
