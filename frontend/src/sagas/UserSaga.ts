import { ApiResponse } from "@alehuo/clubhouse-shared";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  authenticateUser,
  setIsLoggingIn,
} from "../reducers/actions/authenticationActions";
import {
  errorMessage,
  successMessage,
} from "../reducers/actions/notificationActions";
import { fetchOwnSessionStatus, setOwnSessionStatus } from "../reducers/actions/sessionActions";
import {
  deleteUser,
  fetchUserData,
  getUserPerms,
  login,
  removeUserFromList,
  setToken,
  setUserData,
  setUserPerms,
} from "../reducers/actions/userActions";
import { DELETE_USER, LOGIN } from "../reducers/constants";
import UserService from "../services/UserService";

function* userLogin(action: ReturnType<typeof login>) {
    console.log(action);
  try {
    yield put(setIsLoggingIn(true));
    const loginResponse = yield call(
      UserService.login,
      action.payload.email,
      action.payload.password,
    );
    if (loginResponse.payload !== undefined) {
      const token: string = loginResponse.payload.token;
      localStorage.setItem("token", token);
      // @ts-ignore
      yield put(setToken(token));
      const sessionStatus = yield call(fetchOwnSessionStatus, token);
      // @ts-ignore
      yield put(setOwnSessionStatus, sessionStatus.payload);
      const userPerms = yield call(getUserPerms, token);
      // @ts-ignore
      yield put(setUserPerms, userPerms.payload);
      const userdata = yield call(fetchUserData, token);
      // @ts-ignore
      yield put(setUserData(userdata.payload));
      // @ts-ignore
      yield put(authenticateUser);
      // @ts-ignore
      yield put(successMessage("Successfully logged in"));
    } else {
      // @ts-ignore
      yield put(errorMessage("Response payload was undefined."));
    }
    // @ts-ignore
    yield put(setIsLoggingIn(false));
  } catch (err) {
    // @ts-ignore
    yield put(setIsLoggingIn(false));
    if (err.response && err.response.data) {
      const res = err.response.data as ApiResponse<undefined>;
      if (res.error !== undefined) {
        // @ts-ignore
        yield put(errorMessage(res.error.message));
      }
    } else {
      // If the response doesn't contain an error key, the back-end might be down
      // @ts-ignore
      yield put(errorMessage("Error logging in"));
    }
  }
}

function* userDeletion(action: ReturnType<typeof deleteUser>) {
  try {
    yield call(UserService.remove, action.payload.userId, action.payload.token);
    yield put(successMessage("Successfully deleted user"));
    yield put(removeUserFromList(action.payload.userId));
  } catch (err) {
    if (err.response && err.response.data) {
      const res = err.response.data as ApiResponse<undefined>;
      if (res.error !== undefined) {
        yield put(errorMessage(res.error.message));
      }
    } else {
      // If the response doesn't contain an error key, the back-end might be down
      yield put(errorMessage("Error deleting user"));
    }
  }
}

function* userSaga() {
  yield takeEvery(LOGIN, userLogin);
  yield takeEvery(DELETE_USER, userDeletion);
}

export default userSaga;
