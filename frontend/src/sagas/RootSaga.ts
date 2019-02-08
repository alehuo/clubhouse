import { ApiResponse } from "@alehuo/clubhouse-shared";
import { call, put, takeEvery } from "redux-saga/effects";
import { authenticateUser } from "../reducers/actions/authenticationActions";
import { setEvents } from "../reducers/actions/calendarActions";
import { setKeys } from "../reducers/actions/keyActions";
import { setNewsposts } from "../reducers/actions/newsActions";
import { errorMessage } from "../reducers/actions/notificationActions";
import { setAppLoadingState } from "../reducers/actions/rootActions";
import { setOwnSessionStatus } from "../reducers/actions/sessionActions";
import {
  fetchUserData,
  setToken,
  setUserPerms,
} from "../reducers/actions/userActions";
import { setRules } from "../reducers/ruleReducer";
import CalendarService from "../services/CalendarService";
import KeyService from "../services/KeyService";
import NewsService from "../services/NewsService";
import PermissionService from "../services/PermissionService";
import RuleService from "../services/RuleService";
import SessionService from "../services/SessionService";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* initApp() {
  try {
    yield put(setAppLoadingState(true));
    // Calendar events
    const eventResponse = yield call(CalendarService.getEvents);
    yield put(setEvents(eventResponse.payload));
    // Newsposts
    const newspostResponse = yield call(NewsService.getNewsposts);
    yield put(setNewsposts(newspostResponse.payload));
    // Rules
    const ruleResponse = yield call(RuleService.getRules);
    yield put(setRules(ruleResponse.payload));

    const token = localStorage.getItem("token");

    if (token !== null) {
      yield put(setToken(token));
      yield call(fetchProtectedData, token);
      yield put(fetchUserData(token));
      yield put(authenticateUser());
    }
  } catch (e) {
    yield put(errorMessage(e.message));
  }
  yield put(setAppLoadingState(false));
}

function* fetchProtectedData(token: string) {
  try {
    // Fetch & set keys
    const keys = yield call(KeyService.getKeys, token);
    // @ts-ignore
    yield put(setKeys(keys.payload));

    // Fetch & set user permissions
    const userPerms: ApiResponse<any> = yield call(
      PermissionService.getUserPermissions,
      token,
    );
    // @ts-ignore
    yield put(setUserPerms(userPerms.payload.permissions));

    // Fetch & set sessions
    const sessions = yield call(SessionService.getOwnSessionStatus, token);
    // @ts-ignore
    yield put(
      setOwnSessionStatus(
        sessions.payload.running,
        sessions.payload.peopleCount,
        sessions.payload.startTime,
      ),
    );

    // Fetch & set user data
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

function* rootSaga() {
  yield takeEvery("INIT_APP", initApp);
}

export default rootSaga;
