import React from "react";
import { mount } from "enzyme";

import PreventColorPollution from "../PreventColorPollution";

describe("PreventColorPollution", () => {
  it("should render without crashing", () => {
    mount(
      <PreventColorPollution>
        <span />
      </PreventColorPollution>
    ).render();
  });
});
