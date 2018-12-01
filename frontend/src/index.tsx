import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
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
import * as serviceWorker from "./serviceWorker";

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
  news: newsReducer,
});

const middleware = [thunk, logger];

// Create store
const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
