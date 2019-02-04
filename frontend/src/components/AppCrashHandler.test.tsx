import { shallow } from "enzyme";
import React from "react";
import { AppCrashHandler, AppCrashScreenWrapper } from "./AppCrashHandler";

it("AppCrashHandler matches snapshot", () => {
  const cmpnt = shallow(<AppCrashHandler />);
  expect(cmpnt).toMatchSnapshot();
});

it("AppCrashScreenWrapper matches snapshot", () => {
  const cmpnt = shallow(<AppCrashScreenWrapper />);
  expect(cmpnt).toMatchSnapshot();
});
