import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { reduxStore } from "./reduxStore";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
