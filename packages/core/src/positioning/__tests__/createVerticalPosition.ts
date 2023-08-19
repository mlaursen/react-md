import { describe, expect, it } from "@jest/globals";
import type {
  CreateVerticalPositionOptions,
  FixConfig,
} from "../createVerticalPosition.js";
import {
  createAnchoredAbove,
  createVerticalPosition,
} from "../createVerticalPosition.js";

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
const outOfBoundsConfig: FixConfig = {
  ...config1,
  initialY: -400,
};

const vh = 500;
const topBoundsConfig1: FixConfig = {
  yMargin: 0,
  vhMargin: 0,
  elHeight: 100,
  screenBottom: vh,
  preventOverlap: false,
  disableSwapping: false,
  disableVHBounds: false,
  // position this element as if it's near the right edge of the screen
  containerRect: {
    top: 0,
    bottom: 40,
    left: 0,
    right: 0,
    // pretending an icon button
    height: 40,
    width: 40,
    x: 0,
    y: 0,
    toJSON() {},
  },
};
const topBoundsConfig2: FixConfig = { ...topBoundsConfig1, vhMargin: 8 };
// const bottomBoundsConfig1: FixConfig = {
//   yMargin: 0,
//   vhMargin: 0,
//   elHeight: 100,
//   screenBottom: vh,
//   preventOverlap: false,
//   disableSwapping: false,
//   disableVHBounds: false,
//   // position this element as if it's near the bottom edge of the screen
//   containerRect: {
//     top: vh - 40,
//     bottom: vh,
//     left: 0,
//     right: 0,
//     // pretending an icon button
//     height: 40,
//     width: 40,
//     x: 0,
//     y: 0,
//     toJSON() {},
//   },
// };
// const bottomBoundsConfig2: FixConfig = { ...bottomBoundsConfig1, vhMargin: 8 };
const largerThanViewportOptions1: CreateVerticalPositionOptions = {
  y: "above",
  vh,
  vhMargin: 16,
  yMargin: 0,
  elHeight: vh + 400,
  containerRect: containerRect1,
  disableSwapping: false,
  preventOverlap: false,
  disableVHBounds: false,
};
const largerThanViewportOptions22: CreateVerticalPositionOptions = {
  ...largerThanViewportOptions1,
  vhMargin: 0,
};

describe("createAnchoredAbove", () => {
  it("should return the top value if it is within the viewport", () => {
    expect(createAnchoredAbove(config1)).toEqual({
      top: 350,
      actualY: "above",
    });
    expect(createAnchoredAbove(config2)).toEqual({
      top: 342,
      actualY: "above",
    });
    expect(createAnchoredAbove(config3)).toEqual({
      top: 350,
      actualY: "above",
    });
    expect(createAnchoredAbove(config4)).toEqual({
      top: 334,
      actualY: "above",
    });
  });

  it("should swap to the below position if the element would appear out of the viewport", () => {
    expect(createAnchoredAbove(topBoundsConfig1)).toEqual({
      top: 40,
      actualY: "below",
    });
    expect(createAnchoredAbove(topBoundsConfig2)).toEqual({
      top: 40,
      actualY: "below",
    });
  });

  describe("disableVHBounds option", () => {
    it("should return a top value greater than or equal to zero since browsers won't scroll upwards past the normal page top", () => {
      const updatedConfig1: FixConfig = { ...config1, disableVHBounds: true };
      const updatedConfig2: FixConfig = { ...config2, disableVHBounds: true };
      const updatedConfig3: FixConfig = { ...config3, disableVHBounds: true };
      const updatedConfig4: FixConfig = { ...config4, disableVHBounds: true };

      expect(createAnchoredAbove(updatedConfig1)).toEqual({
        top: 350,
        actualY: "above",
      });
      expect(createAnchoredAbove(updatedConfig2)).toEqual({
        top: 342,
        actualY: "above",
      });
      expect(createAnchoredAbove(updatedConfig3)).toEqual({
        top: 350,
        actualY: "above",
      });
      expect(createAnchoredAbove(updatedConfig4)).toEqual({
        top: 334,
        actualY: "above",
      });
      expect(
        createAnchoredAbove({ ...outOfBoundsConfig, disableVHBounds: true })
      ).toEqual({
        top: 0,
        actualY: "above",
      });
    });
  });
});

describe("createVerticalPosition", () => {
  it("should force centered position for elements that cannot fit within the viewport when disableVHBounds is false and preventOverlap is false", () => {
    expect(createVerticalPosition(largerThanViewportOptions1)).toEqual({
      top: 16,
      bottom: 16,
      actualY: "center",
      transformOriginY: containerRect1.top,
    });
    expect(createVerticalPosition(largerThanViewportOptions22)).toEqual({
      top: 0,
      bottom: 0,
      actualY: "center",
      transformOriginY: containerRect1.top,
    });
  });

  it("should return the correct above position for elements that can fit within the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "above",
      vh,
      vhMargin: 16,
      yMargin: 0,
      elHeight: 100,
      containerRect: containerRect1,
      disableSwapping: false,
      preventOverlap: false,
      disableVHBounds: false,
    };
    const options2: CreateVerticalPositionOptions = {
      ...options1,
      disableVHBounds: true,
    };
    const options3: CreateVerticalPositionOptions = {
      ...options1,
      preventOverlap: true,
    };
    const options4: CreateVerticalPositionOptions = {
      ...options1,
      disableSwapping: true,
    };
    const options5: CreateVerticalPositionOptions = {
      ...options1,
      preventOverlap: true,
      disableVHBounds: true,
      disableSwapping: true,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 300,
      actualY: "above",
    });
    expect(createVerticalPosition(options2)).toEqual({
      top: 300,
      actualY: "above",
    });
    expect(createVerticalPosition(options3)).toEqual({
      top: 300,
      actualY: "above",
    });
    expect(createVerticalPosition(options4)).toEqual({
      top: 300,
      actualY: "above",
    });
    expect(createVerticalPosition(options5)).toEqual({
      top: 300,
      actualY: "above",
    });
  });

  it("should return the correct top position for elements that can fit within the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "top",
      vh,
      vhMargin: 16,
      yMargin: 0,
      elHeight: 100,
      containerRect: containerRect2,
      disableSwapping: false,
      preventOverlap: false,
      disableVHBounds: false,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 75,
      actualY: "top",
    });
  });

  it("should return the correct center position for elements that can fit within the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "center",
      vh,
      vhMargin: 16,
      yMargin: 0,
      elHeight: 100,
      containerRect: containerRect2,
      disableSwapping: false,
      preventOverlap: false,
      disableVHBounds: false,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 75,
      actualY: "center",
    });
  });

  it("should return the correct bottom position for elements that can fit within the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "bottom",
      vh,
      vhMargin: 16,
      yMargin: 0,
      elHeight: 100,
      containerRect: containerRect2,
      disableSwapping: false,
      preventOverlap: false,
      disableVHBounds: false,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 75,
      actualY: "bottom",
    });
  });

  it("should return the correct below position for elements that can fit within the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "below",
      vh,
      vhMargin: 16,
      yMargin: 0,
      elHeight: 100,
      containerRect: containerRect2,
      disableSwapping: false,
      preventOverlap: false,
      disableVHBounds: false,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 175,
      actualY: "below",
    });
  });

  it("should position the element to the top of the container element with any additional spacing", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "top",
      vh,
      yMargin: 0,
      vhMargin: 16,
      elHeight: 100,
      containerRect: containerRect2,
      disableSwapping: false,
      disableVHBounds: false,
      preventOverlap: false,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 75,
      actualY: "top",
    });

    expect(createVerticalPosition({ ...options1, yMargin: 8 })).toEqual({
      top: 83,
      actualY: "top",
    });
  });

  it("should position the element to the center of the container element", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "center",
      vh,
      yMargin: 0,
      vhMargin: 16,
      elHeight: 120,
      containerRect: containerRect2,
      disableSwapping: false,
      disableVHBounds: false,
      preventOverlap: false,
    };
    const options2: CreateVerticalPositionOptions = {
      ...options1,
      yMargin: 20,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 65,
      actualY: "center",
    });
    expect(createVerticalPosition(options2)).toEqual({
      top: 85,
      actualY: "center",
    });
  });

  it("should never allow the element to be positioned outside of the viewport", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "center",
      vh,
      yMargin: 0,
      vhMargin: 16,
      elHeight: 120,
      containerRect: {
        ...containerRect2,
        top: 40,
        height: 48,
      },
      disableSwapping: false,
      disableVHBounds: false,
      preventOverlap: false,
    };
    const options2: CreateVerticalPositionOptions = {
      ...options1,
      elHeight: vh - 40,
      containerRect: containerRect1,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 16,
      actualY: "center",
    });

    expect(createVerticalPosition(options2)).toEqual({
      top: 24,
      actualY: "center",
    });
  });

  it("should position the element to the bottom of the container element with any additional spacing", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "bottom",
      vh,
      yMargin: 0,
      vhMargin: 16,
      elHeight: 80,
      containerRect: containerRect2,
      disableSwapping: false,
      disableVHBounds: false,
      preventOverlap: false,
    };
    const options2: CreateVerticalPositionOptions = {
      ...options1,
      yMargin: 8,
      containerRect: containerRect1,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 95,
      actualY: "bottom",
    });

    expect(createVerticalPosition(options2)).toEqual({
      top: 512,
      actualY: "bottom",
    });
  });

  it("should position the element below the container element with any additional spacing", () => {
    const options1: CreateVerticalPositionOptions = {
      y: "below",
      vh,
      yMargin: 0,
      vhMargin: 16,
      elHeight: 80,
      containerRect: containerRect2,
      disableSwapping: false,
      disableVHBounds: false,
      preventOverlap: false,
    };
    const options2: CreateVerticalPositionOptions = {
      ...options1,
      yMargin: 8,
    };

    expect(createVerticalPosition(options1)).toEqual({
      top: 175,
      actualY: "below",
    });
    expect(createVerticalPosition(options2)).toEqual({
      top: 183,
      actualY: "below",
    });
  });
});
