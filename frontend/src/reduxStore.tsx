import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { StateType } from "typesafe-actions";
import authenticationReducer from "./reducers/authenticationReducer";
import calendarReducer from "./reducers/calendarReducer";
import keyReducer from "./reducers/keyReducer";
import { logger } from "./reducers/middleware";
import newsReducer from "./reducers/newsReducer";
import notificationReducer from "./reducers/notificationReducer";
import rootReducer from "./reducers/rootReducer";
import ruleReducer from "./reducers/ruleReducer";
import sessionReducer from "./reducers/sessionReducer";
import studentUnionReducer from "./reducers/studentUnionReducer";
import userReducer from "./reducers/userReducer";
import notificationSaga from "./sagas/NotificationSaga";
import rootSaga from "./sagas/RootSaga";
import sessionSaga from "./sagas/SessionSaga";
import userSaga from "./sagas/UserSaga";

const reducerObj = {
  root: rootReducer,
  calendar: calendarReducer,
  auth: authenticationReducer,
  user: userReducer,
  notification: notificationReducer,
  key: keyReducer,
  studentUnion: studentUnionReducer,
  session: sessionReducer,
  form: formReducer,
  rule: ruleReducer,
  news: newsReducer,
};

// Combine reducers
const reducer = combineReducers(reducerObj);

export type RootState = StateType<typeof reducer>;

const sagaMiddleware = createSagaMiddleware();

// Middlewares for different environments
const middleware = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return [thunk, sagaMiddleware];
    case "development":
      return [thunk, sagaMiddleware, logger];
    case "test":
      return [thunk, sagaMiddleware];
    default:
      return [thunk, sagaMiddleware];
  }
};
// Create store
const reduxStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware())),
);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(notificationSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(sessionSaga);

export { reduxStore };
