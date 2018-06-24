import * as React from "react";
import { shallow } from "enzyme";

import { default as Tooltip } from "../Tooltip";

describe("<Tooltip />", () => {
  it("should default to setting the tooltip position to bottom", () => {
    const tooltip = shallow(<Tooltip id="tooltip-1" visible={true}>This is a tooltip</Tooltip>);
    expect(tooltip.hasClass("rmd-tooltip--top")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--bottom")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);
  });

  it("should correctly apply the position suffix", () => {
    const tooltip = shallow(<Tooltip id="tooltip-1" position="top" visible={true}>This is a tooltip</Tooltip>);
    expect(tooltip.hasClass("rmd-tooltip--top")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--bottom")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    tooltip.setProps({ position: "right" });
    expect(tooltip.hasClass("rmd-tooltip--top")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--bottom")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    tooltip.setProps({ position: "bottom" });
    expect(tooltip.hasClass("rmd-tooltip--top")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--bottom")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    tooltip.setProps({ position: "left" });
    expect(tooltip.hasClass("rmd-tooltip--top")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--bottom")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(true);
  });

  it("should render correctly", () => {
    const tooltip = shallow(<Tooltip id="tooltip-1" visible={false}>This is some content</Tooltip>);
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.setProps({ visible: true });
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.setProps({ dense: true });
    expect(tooltip.render()).toMatchSnapshot();
  })
})
