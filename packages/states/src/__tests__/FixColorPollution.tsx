import React from "react";
import { mount } from "enzyme";

import FixColorPollution from "../FixColorPollution";
import PreventColorPollution from "../PreventColorPollution";

describe("FixColorPollution", () => {
  it("should render the children as normal when the color pollution context is diabled", () => {
    expect(
      mount(
        <button type="button">
          <FixColorPollution>
            <span>Hello</span>
          </FixColorPollution>
        </button>
      ).render()
    ).toMatchSnapshot();
    expect(
      mount(
        <button type="button">
          <FixColorPollution enabled={false}>
            <span>Hello</span>
          </FixColorPollution>
        </button>
      ).render()
    ).toMatchSnapshot();
  });

  it("should render correctly when the fix is enabled", () => {
    // have to wrap with an additional element since enzyme can't render fragments yet
    // it also won't really be a real problem since these color fixes should always
    // be children of an element
    expect(
      mount(
        <PreventColorPollution>
          <button type="button">
            <FixColorPollution>
              <span>Hello</span>
            </FixColorPollution>
          </button>
        </PreventColorPollution>
      ).render()
    ).toMatchSnapshot();
    expect(
      mount(
        <button type="button">
          <FixColorPollution enabled>
            <span>Hello</span>
          </FixColorPollution>
        </button>
      ).render()
    ).toMatchSnapshot();
  });
});
