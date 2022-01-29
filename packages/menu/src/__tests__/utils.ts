import {
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/utils";
import { getDefaultAnchor } from "../utils";

describe("getDefaultAnchor", () => {
  it("should return a default anchor based on the menubar, menuitem, and horizontal flags", () => {
    expect(
      getDefaultAnchor({ menubar: true, menuitem: false, horizontal: false })
    ).toBe(BELOW_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({ menubar: true, menuitem: false, horizontal: true })
    ).toBe(BELOW_INNER_LEFT_ANCHOR);
    expect(
      getDefaultAnchor({ menubar: true, menuitem: true, horizontal: false })
    ).toBe(CENTER_RIGHT_ANCHOR);
    expect(
      getDefaultAnchor({ menubar: true, menuitem: true, horizontal: true })
    ).toBe(CENTER_RIGHT_ANCHOR);

    expect(
      getDefaultAnchor({ menubar: false, menuitem: false, horizontal: true })
    ).toBe(BELOW_CENTER_ANCHOR);

    expect(
      getDefaultAnchor({ menubar: false, menuitem: true, horizontal: false })
    ).toBe(TOP_RIGHT_ANCHOR);

    expect(
      getDefaultAnchor({ menubar: false, menuitem: false, horizontal: false })
    ).toBe(TOP_INNER_RIGHT_ANCHOR);
  });
});
