import * as React from "react";
import { mount } from "enzyme";

import TooltipBase from "../TooltipBase";

describe("<Tooltip />", () => {
  it("should default to setting the tooltip position to below", () => {
    const tooltip = mount(
      <TooltipBase id="tooltip-1" visible={true}>
        This is a tooltip
      </TooltipBase>
    )
      .find("span")
      .first();

    expect(tooltip.hasClass("rmd-tooltip--above")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--below")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);
  });

  it("should correctly apply the position suffix", () => {
    const wrapper = mount(
      <TooltipBase id="tooltip-1" position="above" visible={true}>
        This is a tooltip
      </TooltipBase>
    );

    let tooltip = wrapper.find("span").first();
    expect(tooltip.hasClass("rmd-tooltip--above")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--below")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    wrapper.setProps({ position: "right" });
    tooltip = wrapper.find("span").first();
    expect(tooltip.hasClass("rmd-tooltip--above")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--below")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    wrapper.setProps({ position: "below" });
    tooltip = wrapper.find("span").first();
    expect(tooltip.hasClass("rmd-tooltip--above")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--below")).toBe(true);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(false);

    wrapper.setProps({ position: "left" });
    tooltip = wrapper.find("span").first();
    expect(tooltip.hasClass("rmd-tooltip--above")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--right")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--below")).toBe(false);
    expect(tooltip.hasClass("rmd-tooltip--left")).toBe(true);
  });

  it("should render correctly", () => {
    const tooltip = mount(
      <TooltipBase id="tooltip-1" visible={false}>
        This is some content
      </TooltipBase>
    );
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.setProps({ visible: true });
    expect(tooltip.render()).toMatchSnapshot();

    tooltip.setProps({ dense: true });
    expect(tooltip.render()).toMatchSnapshot();
  });
});
