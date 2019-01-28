import { call, put, takeEvery } from "redux-saga/effects";
import { setEvents } from "../reducers/actions/calendarActions";
import { errorMessage } from "../reducers/actions/notificationActions";
import CalendarService from "../services/CalendarService";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* initApp() {
  try {
    // Calendar events
    const events = yield call(CalendarService.getEvents);
    yield put(setEvents(events));
  } catch (e) {
    // yield put(errorMessage(e.message));
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
  yield takeEvery("INIT_APP", initApp);
}

export default rootSaga;
