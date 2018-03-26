import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { logger } from "./reducers/middleware";
import testReducer from "./reducers/testReducer";

// Combine reducers
const reducer = combineReducers({
  test: testReducer
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
