import { ApiResponse } from "@alehuo/clubhouse-shared";
import { call, put, takeEvery } from "redux-saga/effects";
import { errorMessage } from "../reducers/actions/notificationActions";
import { fetchOwnSessionStatus, setOwnSessionStatus } from "../reducers/actions/sessionActions";
import { FETCH_OWN_SESSION_STATUS } from "../reducers/constants";
import sessionService from "../services/SessionService";

export function* sessionSaga_fetchOwnSessionStatus(action: ReturnType<typeof fetchOwnSessionStatus>) {
  try {
    const ownSessionStatus: ApiResponse<{
      running: boolean;
      peopleCount: number;
      startTime: string;
    }> = yield call(sessionService.getOwnSessionStatus, action.payload.token);
    if (ownSessionStatus.payload !== undefined) {
      const session = ownSessionStatus.payload;
      yield put(
        setOwnSessionStatus(
          session.running,
          session.peopleCount,
          session.startTime,
        ),
      );
    } else {
      yield put(errorMessage("Response payload was undefined."));
    }
  } catch (err) {
    if (err.response && err.response.data) {
      const res = err.response.data as ApiResponse<undefined>;
      if (res.error !== undefined) {
        yield put(errorMessage(res.error.message));
      }
    } else {
      // If the response doesn't contain an error key, the back-end might be down
      yield put(errorMessage("Error fetching watch status"));
    }
  }
}

function* sessionSaga() {
  yield takeEvery(FETCH_OWN_SESSION_STATUS, sessionSaga_fetchOwnSessionStatus);
}

export default sessionSaga;
