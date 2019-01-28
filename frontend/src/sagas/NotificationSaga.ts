import { delay, put, takeEvery } from "redux-saga/effects";
import uuidv1 from "uuid/v1";
import {
  addNotification,
  clearNotification,
  errorMessage,
  successMessage,
} from "../reducers/actions/notificationActions";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../reducers/constants";

function* successMessageGenerator(action: ReturnType<typeof successMessage>) {
  const id = uuidv1();
  yield put(
    addNotification(
    id,
      action.payload.text,
      "SUCCESS",
    ),
  );
  yield delay(action.payload.timeout || 4000);
  yield put(clearNotification(id));
}

function* errorMessageGenerator(action: ReturnType<typeof errorMessage>) {
  const id = uuidv1();
  yield put(
    addNotification(
    id,
      action.payload.text,
      "ERROR",
    ),
  );
  yield delay(action.payload.timeout || 4000);
  yield put(clearNotification(id));
}

function* notificationSaga() {
  yield takeEvery(SUCCESS_MESSAGE, successMessageGenerator);
  yield takeEvery(ERROR_MESSAGE, errorMessageGenerator);
}

export default notificationSaga;
