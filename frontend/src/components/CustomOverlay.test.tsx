import { shallow } from "enzyme";
import React from "react";
import CustomOverlay from "./CustomOverlay";

it("CustomOverlay matches snapshot", () => {
  const cmpnt = shallow(
    <CustomOverlay id="test" delay={250} key="HelloWorld" text="Testing">
      <>Overlay text</>
    </CustomOverlay>,
  );
  expect(cmpnt).toMatchSnapshot();
});
