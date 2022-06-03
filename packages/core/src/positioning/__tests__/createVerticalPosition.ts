import type { FixConfig } from "../createVerticalPosition";
import {
  createAnchoredAbove,
  createVerticalPosition,
} from "../createVerticalPosition";
import { getAboveCoord } from "../utils";

const containerRect1: DOMRect = {
  left: 100,
  right: 50,
  top: 400,
  bottom: 75,
  height: 200,
  width: 100,
  x: 100,
  y: 25,
  toJSON() {},
};

const containerRect2: DOMRect = {
  left: 50,
  right: 100,
  top: 75,
  bottom: 25,
  height: 100,
  width: 200,
  x: 200,
  y: 75,
  toJSON() {},
};
const config1: FixConfig = {
  yMargin: 0,
  vhMargin: 0,
  elHeight: 50,
  screenBottom: 1000,
  disableSwapping: false,
  containerRect: containerRect1,
  disableVHBounds: false,
  preventOverlap: false,
};

const config2: FixConfig = { ...config1, yMargin: 8 };
const config3: FixConfig = { ...config1, vhMargin: 8 };
const config4: FixConfig = { ...config1, yMargin: 16, vhMargin: 8 };

const config5: FixConfig = {
  ...config1,
  elHeight: 100,
  containerRect: containerRect2,
};
const config6: FixConfig = {
  ...config2,
  elHeight: 100,
  containerRect: containerRect2,
};
const config7: FixConfig = {
  ...config3,
  elHeight: 100,
  containerRect: containerRect2,
};
const config8: FixConfig = {
  ...config4,
  elHeight: 100,
  containerRect: containerRect2,
};

const vw = 500;
const vh = 500;
const leftBoundsConfig1: FixConfig = {
  yMargin: 0,
  vhMargin: 0,
  elHeight: 475,
  screenBottom: vw,
  preventOverlap: false,
  disableSwapping: false,
  disableVHBounds: false,
  // position this element as if it's near the left edge of the screen
  containerRect: {
    top: 0,
    bottom: vh - 40,
    left: 0,
    right: vw - 40,
    // pretending an icon button
    height: 40,
    width: 40,
    x: 0,
    y: 0,
    toJSON() {},
  },
};
const leftBoundsConfig2: FixConfig = { ...leftBoundsConfig1, vhMargin: 8 };
const rightBoundsConfig1: FixConfig = {
  yMargin: 0,
  vhMargin: 0,
  elHeight: 475,
  screenBottom: vw,
  preventOverlap: false,
  disableSwapping: false,
  disableVHBounds: false,
  // position this element as if it's near the right edge of the screen
  containerRect: {
    top: 0,
    bottom: 0,
    left: vw - 40,
    right: 0,
    // pretending an icon button
    height: 40,
    width: 40,
    x: vw - 40,
    y: 0,
    toJSON() {},
  },
};
const rightBoundsConfig2: FixConfig = { ...rightBoundsConfig1, vhMargin: 8 };
describe("createAnchoredAbove", () => {
  it("should return the calculated above coord and an actualY value of above when it fits within the viewport", () => {
    expect(createAnchoredAbove(config1)).toEqual({
      top: getAboveCoord(config1),
      actualY: "above",
    });
    expect(createAnchoredAbove(config2)).toEqual({
      top: getAboveCoord(config2),
      actualY: "above",
    });
    expect(createAnchoredAbove(config3)).toEqual({
      top: getAboveCoord(config3),
      actualY: "above",
    });
  });

  it("should return the calculated above (greater than 0) coord and an actualY value of above if the vh bounds are disabled", () => {
    const containerRect: DOMRect = {
      ...containerRect1,
      top: 0,
    };
    const config: FixConfig = {
      ...config1,
      containerRect,
      disableVHBounds: true,
    };

    expect(createAnchoredAbove(config)).toEqual({
      top: 0,
      actualY: "above",
    });
  });

  it.todo(
    "should return the vhMargin value as the top value if swapping is disabled"
  );

  it.todo(
    "should return the vhMargin value as the top value if swapping below will force it out of the viewport bottom"
  );
  it.todo(
    "should return the bottom coord as the top value if the position can be swapped below"
  );
  it.todo(
    "should set the bottom value to the container's top minus the yMargin if overlap is prevented and it's still positioned above and would overlap"
  );
});

describe("createAnchoredTop", () => {
  it.todo(
    "should return the calculated top coord and an actualY value of top when it fits within the viewport"
  );
  it.todo(
    "should return the calculated top coord and an actualY value of top when the vh bounds are disabled"
  );
  it.todo(
    "should return the vhMargin as the top value if swapping is disabled"
  );
  it.todo(
    "should return the vhMargin as the top value if swapping to the bottom causes top viewport issues"
  );
  it.todo(
    "should return the bottom coord as the top value and an actualY of bottom if it can be swapped"
  );
});

describe("createAnchoredCenter", () => {
  it.todo(
    "should return the calculated center coord and an actualY value of center when it fits within the viewport"
  );
  it.todo(
    "should return the calculated top (greater than 0) coord and an actualY value of center if the vh bounds are disabled"
  );
  it.todo(
    "should ensure the top value is >= vhMargin when near the top of the viewport"
  );
  it.todo(
    "should return the top value as the screen bottom minus the element's height if it expands past the viewport bottom"
  );
});

describe("createAnchoredBottom", () => {
  it.todo(
    "should return the calculated bottom coord and an actualY value of bottom when it fits within the viewport"
  );
  it.todo(
    "should return the calculated bottom coord and an actualY value of bottom when the vh bounds are disabled"
  );
  it.todo(
    "should return the screen bottom minus the element height as the top value if swapping is disabled"
  );
  it.todo(
    "should return the screen bottom minus the element height as the top value if swapping to the top causes top viewport issues"
  );
  it.todo(
    "should return the top coord as the top value and an actualY of top if it can be swapped"
  );
});

describe("createAnchoredBelow", () => {
  it.todo(
    "should return the calculated below coord and an actualY value of below when it fits within the viewport"
  );
  it.todo(
    "should return the calculated below coord and an actualY value of below if the vh bounds are disabled"
  );
  it.todo(
    "should return the screen bottom minus the element's height as the top value if swapping is disabled"
  );
  it.todo(
    "should return the vhMargin value as the top value if swapping below will force it out of the viewport bottom"
  );
  it.todo(
    "should return the bottom coord as the top value if the position can be swapped below"
  );
  it.todo(
    "should set the bottom value to the container's top minus the yMargin if overlap is prevented and it's still positioned above and would overlap"
  );
});
