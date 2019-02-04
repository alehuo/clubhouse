import { shallow } from "enzyme";
import React from "react";
import Notification from "./Notification";

it("Notification matches snapshot", () => {
  const cmpnt = shallow(<Notification text="Hello World" type="error" />);
  expect(cmpnt).toMatchSnapshot();
});
