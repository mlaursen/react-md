import React from "react";
import { mount } from "enzyme";

import MediaOverlay from "../MediaOverlay";

describe("MediaOverlay", () => {
  it("should apply the correct class names", () => {
    const overlay = mount(<MediaOverlay />);

    let div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "top" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "right" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "left" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "center" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "middle" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(false);

    overlay.setProps({ position: "absolute-center" });
    div = overlay.find("div");
    expect(div.hasClass("rmd-media-overlay")).toBe(true);
    expect(div.hasClass("rmd-media-overlay--top")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--right")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--bottom")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--left")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--center")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--middle")).toBe(false);
    expect(div.hasClass("rmd-media-overlay--absolute-center")).toBe(true);
  });
});
