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
import ruleReducer from "./reducers/ruleReducer";
import sessionReducer from "./reducers/sessionReducer";
import studentUnionReducer from "./reducers/studentUnionReducer";
import userReducer from "./reducers/userReducer";
import rootSaga from "./sagas/RootSaga";

const reducerObj = {
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

const middleware =
  process.env.NODE_ENV !== "production" ? [thunk, sagaMiddleware, logger] : [thunk, sagaMiddleware];

// Create store
const reduxStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export { reduxStore };
