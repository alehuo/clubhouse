import { shallow } from "enzyme";
import React from "react";
import { Container } from "./Container";

it("Container matches snapshot", () => {
  const cmpnt = shallow(<Container />);
  expect(cmpnt).toMatchSnapshot();
});
