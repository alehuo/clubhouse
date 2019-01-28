import { call, delay, put, takeEvery } from "redux-saga/effects";
import uuidv1 from "uuid/v1";
import {
  addNotification,
  clearNotification,
  errorMessage,
  NotificationType,
  successMessage,
} from "../reducers/actions/notificationActions";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../reducers/constants";

function* successMessageGenerator(action: ReturnType<typeof successMessage>) {
  yield call(
    generateNotification,
    action.payload.text,
    "SUCCESS",
    action.payload.timeout,
  );
}

function* errorMessageGenerator(action: ReturnType<typeof errorMessage>) {
  yield call(
    generateNotification,
    action.payload.text,
    "ERROR",
    action.payload.timeout,
  );
}

function* generateNotification(
  text: string,
  type: NotificationType,
  timeout?: number,
) {
  const id = uuidv1();
  yield put(addNotification(id, text, type));
  yield delay(timeout || 4000);
  yield put(clearNotification(id));
}

function* notificationSaga() {
  yield takeEvery(SUCCESS_MESSAGE, successMessageGenerator);
  yield takeEvery(ERROR_MESSAGE, errorMessageGenerator);
}

export default notificationSaga;
