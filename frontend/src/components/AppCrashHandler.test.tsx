import { shallow } from "enzyme";
import React from "react";
import { AppCrashHandler, AppCrashScreenWrapper } from "./AppCrashHandler";

it("AppCrashHandler renders without crashing", () => {
  const cmpnt = shallow(<AppCrashHandler />);
  expect(cmpnt).toMatchSnapshot();
});

it("AppCrashScreenWrapper renders without crashing", () => {
  const cmpnt = shallow(<AppCrashScreenWrapper />);
  expect(cmpnt).toMatchSnapshot();
});
