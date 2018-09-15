import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { logger } from "./reducers/middleware";
import calendarReducer from "./reducers/calendarReducer";
import authenticationReducer from "./reducers/authenticationReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import keyReducer from "./reducers/keyReducer";
import studentUnionReducer from "./reducers/studentUnionReducer";
import permissionReducer from "./reducers/permissionReducer";
import { reducer as formReducer } from "redux-form";
import sessionReducer from "./reducers/sessionReducer";
import ruleReducer from "./reducers/ruleReducer";
import newsReducer from "./reducers/newsReducer";

// Combine reducers
const reducer = combineReducers({
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
  news: newsReducer
});

const middleware =
  process.env.NODE_ENV !== "production"
    ? [require("redux-immutable-state-invariant").default(), thunk, logger]
    : [thunk];

// Create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
