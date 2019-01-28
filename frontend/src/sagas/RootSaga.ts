import { call, put, takeEvery } from "redux-saga/effects";
import { setEvents } from "../reducers/actions/calendarActions";
import { setKeys } from "../reducers/actions/keyActions";
import { setNewsposts } from "../reducers/actions/newsActions";
import { errorMessage } from "../reducers/actions/notificationActions";
import { setOwnSessionStatus } from "../reducers/actions/sessionActions";
import { setToken, setUserPerms } from "../reducers/actions/userActions";
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
    }

  } catch (e) {
    // yield put(errorMessage(e.message));
  }
}

function* fetchProtectedData(token: string) {
    try {
        const keys = yield call(KeyService.getKeys, token);
        // @ts-ignore
        yield put(setKeys, keys.payload);
        const userPerms = yield call(PermissionService.getUserPermissions, token);
        // @ts-ignore
        yield put(setUserPerms, userPerms.payload);
        const sessions = yield call(SessionService.getOwnSessionStatus, token);
        // @ts-ignore
        yield put(setOwnSessionStatus, sessions.payload);
      } catch (e) {
        yield put(errorMessage(e.message));
      }
}

function* rootSaga() {
  yield takeEvery("INIT_APP", initApp);
}

export default rootSaga;
