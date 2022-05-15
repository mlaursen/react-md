import {
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/utils";

import { getDefaultAnchor } from "../utils";

describe("getDefaultAnchor", () => {
  it("should return a default anchor based on the menubar, menuitem, and horizontal flags", () => {
    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: "bottom-left",
        horizontal: false,
      })
    ).toBe(BOTTOM_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: "bottom-right",
        horizontal: false,
      })
    ).toBe(BOTTOM_INNER_RIGHT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: "top-left",
        horizontal: false,
      })
    ).toBe(TOP_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: "top-right",
        horizontal: false,
      })
    ).toBe(TOP_INNER_RIGHT_ANCHOR);

    expect(
      getDefaultAnchor({
        menubar: true,
        menuitem: false,
        floating: null,
        horizontal: false,
      })
    ).toBe(BELOW_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: true,
        menuitem: false,
        floating: null,
        horizontal: true,
      })
    ).toBe(BELOW_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: true,
        menuitem: true,
        floating: null,
        horizontal: false,
      })
    ).toBe(CENTER_RIGHT_ANCHOR);
    expect(
      getDefaultAnchor({
        menubar: true,
        menuitem: true,
        floating: null,
        horizontal: true,
      })
    ).toBe(CENTER_RIGHT_ANCHOR);

    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: null,
        horizontal: true,
      })
    ).toBe(BELOW_CENTER_ANCHOR);

    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: true,
        floating: null,
        horizontal: false,
      })
    ).toBe(TOP_RIGHT_ANCHOR);

    expect(
      getDefaultAnchor({
        menubar: false,
        menuitem: false,
        floating: null,
        horizontal: false,
      })
    ).toBe(TOP_INNER_RIGHT_ANCHOR);
  });
});
