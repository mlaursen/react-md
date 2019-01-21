import React from "react";
import { create } from "react-test-renderer";

import FixColorPollution from "../FixColorPollution";

describe("FixColorPollution", () => {
  it("should render the children as normal when the color pollution context is diabled", () => {
    expect(
      create(
        <FixColorPollution>
          <span>Hello</span>
        </FixColorPollution>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
