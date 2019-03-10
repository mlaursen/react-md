import React from "react";
import { mount } from "enzyme";

import MediaContainer from "../MediaContainer";

describe("MediaContainer", () => {
  it("should apply the correct class names", () => {
    const container = mount(<MediaContainer />);

    let div = container.find("div");
    expect(div.hasClass("rmd-media-container")).toBe(true);
    expect(div.hasClass("rmd-media-container--auto")).toBe(true);
    expect(div.hasClass("rmd-media-container--aspect-ratio")).toBe(false);

    container.setProps({ auto: false });
    div = container.find("div");
    expect(div.hasClass("rmd-media-container")).toBe(true);
    expect(div.hasClass("rmd-media-container--auto")).toBe(false);
    expect(div.hasClass("rmd-media-container--aspect-ratio")).toBe(false);

    container.setProps({ auto: true, height: 9, width: 16 });
    div = container.find("div");
    expect(div.hasClass("rmd-media-container")).toBe(true);
    expect(div.hasClass("rmd-media-container--auto")).toBe(true);
    expect(div.hasClass("rmd-media-container--aspect-ratio")).toBe(true);
    expect(div.hasClass("rmd-media-container--16-9")).toBe(true);

    container.setProps({ height: 1, width: 1 });
    div = container.find("div");
    expect(div.hasClass("rmd-media-container")).toBe(true);
    expect(div.hasClass("rmd-media-container--auto")).toBe(true);
    expect(div.hasClass("rmd-media-container--aspect-ratio")).toBe(true);
    expect(div.hasClass("rmd-media-container--1-1")).toBe(true);

    container.setProps({
      height: undefined,
      width: undefined,
      className: "this-is-a multiple-class-name test",
    });
    div = container.find("div");
    expect(div.hasClass("rmd-media-container")).toBe(true);
    expect(div.hasClass("rmd-media-container--auto")).toBe(true);
    expect(div.hasClass("rmd-media-container--aspect-ratio")).toBe(false);
    expect(div.hasClass("rmd-media-container--1-1")).toBe(false);
    expect(div.hasClass("this-is-a")).toBe(true);
    expect(div.hasClass("multiple-class-name")).toBe(true);
    expect(div.hasClass("test")).toBe(true);
  });
});
