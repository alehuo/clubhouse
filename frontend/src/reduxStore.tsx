import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { StateType } from "typesafe-actions";
import authenticationReducer from "./reducers/authenticationReducer";
import calendarReducer from "./reducers/calendarReducer";
import keyReducer from "./reducers/keyReducer";
import { logger } from "./reducers/middleware";
import newsReducer from "./reducers/newsReducer";
import notificationReducer from "./reducers/notificationReducer";
import permissionReducer from "./reducers/permissionReducer";
import ruleReducer from "./reducers/ruleReducer";
import sessionReducer from "./reducers/sessionReducer";
import studentUnionReducer from "./reducers/studentUnionReducer";
import userReducer from "./reducers/userReducer";

const reducerObj = {
  calendar: calendarReducer,
  auth: authenticationReducer,
  user: userReducer,
  notification: notificationReducer,
  key: keyReducer,
  studentUnion: studentUnionReducer,
  permission: permissionReducer,
  watch: sessionReducer,
  form: formReducer,
  rule: ruleReducer,
  news: newsReducer,
};

// Combine reducers
const reducer = combineReducers(reducerObj);

export type RootState = StateType<typeof reducer>;

const middleware =
  process.env.NODE_ENV !== "production" ? [thunk, logger] : [thunk];

// Create store
export const reduxStore = createStore(reducer, applyMiddleware(...middleware));
