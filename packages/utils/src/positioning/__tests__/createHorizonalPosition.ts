import {
  createAnchoredCenter,
  createAnchoredInnerLeft,
  createAnchoredInnerRight,
  createAnchoredLeft,
  createAnchoredRight,
  createEqualWidth,
  FixConfig,
} from "../createHorizontalPosition";
import {
  getCenterXCoord,
  getInnerLeftCoord,
  getInnerRightCoord,
  getLeftCoord,
  getRightCoord,
} from "../getCoord";
import { HorizontalPosition } from "../types";

const containerRect1: ClientRect = {
  left: 100,
  right: 50,
  top: 25,
  bottom: 75,
  height: 200,
  width: 100,
};

const containerRect2: ClientRect = {
  left: 50,
  right: 100,
  top: 75,
  bottom: 25,
  height: 100,
  width: 200,
};
const config1: FixConfig = {
  xMargin: 0,
  vwMargin: 0,
  elWidth: 50,
  screenRight: 1000,
  disableSwapping: false,
  containerRect: containerRect1,
};

const config2: FixConfig = { ...config1, xMargin: 8 };
const config3: FixConfig = { ...config1, vwMargin: 8 };
const config4: FixConfig = { ...config1, xMargin: 16, vwMargin: 8 };

const config5: FixConfig = {
  ...config1,
  elWidth: 100,
  containerRect: containerRect2,
};
const config6: FixConfig = {
  ...config2,
  elWidth: 100,
  containerRect: containerRect2,
};
const config7: FixConfig = {
  ...config3,
  elWidth: 100,
  containerRect: containerRect2,
};
const config8: FixConfig = {
  ...config4,
  elWidth: 100,
  containerRect: containerRect2,
};

const vw = 500;
const leftBoundsConfig1: FixConfig = {
  xMargin: 0,
  vwMargin: 0,
  elWidth: 475,
  screenRight: vw,
  disableSwapping: false,
  // position this element as if it's near the left edge of the screen
  containerRect: {
    top: 0,
    bottom: 0,
    left: 0,
    right: vw - 40,
    // pretending an icon button
    height: 40,
    width: 40,
  },
};
const leftBoundsConfig2: FixConfig = { ...leftBoundsConfig1, vwMargin: 8 };
const rightBoundsConfig1 = {
  xMargin: 0,
  vwMargin: 0,
  elWidth: 475,
  screenRight: vw,
  disableSwapping: false,
  // position this element as if it's near the right edge of the screen
  containerRect: {
    top: 0,
    bottom: 0,
    left: vw - 40,
    right: 0,
    // pretending an icon button
    height: 40,
    width: 40,
  },
};
const rightBoundsConfig2 = { ...rightBoundsConfig1, vwMargin: 8 };

describe("createAnchoredLeft", () => {
  it("should return the calcualted left coord and an actualX value of left", () => {
    expect(createAnchoredLeft(config1)).toEqual({
      left: getLeftCoord(config1),
      actualX: "left",
    });
    expect(createAnchoredLeft(config2)).toEqual({
      left: getLeftCoord(config2),
      actualX: "left",
    });
    expect(createAnchoredLeft(config3)).toEqual({
      left: getLeftCoord(config3),
      actualX: "left",
    });
    expect(createAnchoredLeft(config4)).toEqual({
      left: getLeftCoord(config4),
      actualX: "left",
    });
  });

  it("should ignore the disableSwapping argument", () => {
    const updatedConfig1 = { ...config1, disableSwapping: true };
    const updatedConfig2 = { ...config2, disableSwapping: true };
    const updatedConfig3 = { ...config3, disableSwapping: true };
    const updatedConfig4 = { ...config4, disableSwapping: true };

    expect(createAnchoredLeft(updatedConfig1)).toEqual({
      left: getLeftCoord(updatedConfig1),
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig2)).toEqual({
      left: getLeftCoord(updatedConfig2),
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig3)).toEqual({
      left: getLeftCoord(updatedConfig3),
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig4)).toEqual({
      left: getLeftCoord(updatedConfig4),
      actualX: "left",
    });
  });

  it("should return the vwMargin value as the left value if swapping is disabled", () => {
    const updatedConfig5 = { ...config5, disableSwapping: true };
    const updatedConfig6 = { ...config6, disableSwapping: true };
    const updatedConfig7 = { ...config7, disableSwapping: true };
    const updatedConfig8 = { ...config8, disableSwapping: true };
    expect(createAnchoredLeft(updatedConfig5)).toEqual({
      left: 0,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig6)).toEqual({
      left: 0,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig7)).toEqual({
      left: 8,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig8)).toEqual({
      left: 8,
      actualX: "left",
    });
  });

  it("should return the vwMargin value as the left value if swapping to the right will force it out of the viewport right bounds", () => {
    const updatedConfig5 = { ...config5, screenRight: 200 };
    const updatedConfig6 = { ...config6, screenRight: 200 };
    const updatedConfig7 = { ...config7, screenRight: 200 };
    const updatedConfig8 = { ...config8, screenRight: 200 };
    expect(createAnchoredLeft(updatedConfig5)).toEqual({
      left: 0,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig6)).toEqual({
      left: 0,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig7)).toEqual({
      left: 8,
      actualX: "left",
    });
    expect(createAnchoredLeft(updatedConfig8)).toEqual({
      left: 8,
      actualX: "left",
    });
  });

  it("should return the right coord as the left value if the position can be swapped within the viewport", () => {
    expect(createAnchoredLeft(config5)).toEqual({
      left: getRightCoord(config5),
      actualX: "right",
    });
    expect(createAnchoredLeft(config6)).toEqual({
      left: getRightCoord(config6),
      actualX: "right",
    });
    expect(createAnchoredLeft(config7)).toEqual({
      left: getRightCoord(config7),
      actualX: "right",
    });
    expect(createAnchoredLeft(config8)).toEqual({
      left: getRightCoord(config8),
      actualX: "right",
    });
  });
});

describe("createAnchoredInnerLeft", () => {
  it("should return the inner left coord left value", () => {
    expect(createAnchoredInnerLeft(config1)).toEqual({
      left: getInnerLeftCoord(config1),
      actualX: "inner-left",
    });
    expect(createAnchoredInnerLeft(config2)).toEqual({
      left: getInnerLeftCoord(config2),
      actualX: "inner-left",
    });
    expect(createAnchoredInnerLeft(config3)).toEqual({
      left: getInnerLeftCoord(config3),
      actualX: "inner-left",
    });
    expect(createAnchoredInnerLeft(config4)).toEqual({
      left: getInnerLeftCoord(config4),
      actualX: "inner-left",
    });
  });

  it("should return the vwMargin if swapping is disabled", () => {
    const updatedConfig1 = { ...rightBoundsConfig1, disableSwapping: true };
    const updatedConfig2 = { ...rightBoundsConfig2, disableSwapping: true };

    expect(createAnchoredInnerLeft(updatedConfig1)).toEqual({
      left: 0,
      actualX: "inner-left",
    });
    expect(createAnchoredInnerLeft(updatedConfig2)).toEqual({
      left: 8,
      actualX: "inner-left",
    });
  });

  it("should return the vwMargin if the swapped inner right values are less than the vwMargin", () => {
    // need to move the container rect a bit more into the page so that the fixed element will
    // no longer be within the viewport
    const updatedConfig1 = {
      ...leftBoundsConfig1,
      containerRect: {
        ...leftBoundsConfig1.containerRect,
        left: 40,
      },
    };
    const updatedConfig2 = {
      ...leftBoundsConfig2,
      containerRect: {
        ...leftBoundsConfig2.containerRect,
        left: 40,
      },
    };
    expect(createAnchoredInnerLeft(updatedConfig1)).toEqual({
      left: 0,
      actualX: "inner-left",
    });
    expect(createAnchoredInnerLeft(updatedConfig2)).toEqual({
      left: 8,
      actualX: "inner-left",
    });
  });

  it("should swap to the inner-right if swapping is enabled and there is enough room from the inner left to display", () => {
    expect(createAnchoredInnerLeft(rightBoundsConfig1)).toEqual({
      left: getInnerRightCoord(rightBoundsConfig1),
      actualX: "inner-right",
    });
    expect(createAnchoredInnerLeft(rightBoundsConfig2)).toEqual({
      left: getInnerRightCoord(rightBoundsConfig2),
      actualX: "inner-right",
    });
  });
});

describe("createAnchoredCenter", () => {
  it("should return the center x coord as the left value if it can fit within the viewport", () => {
    expect(createAnchoredCenter(config1)).toEqual({
      left: getCenterXCoord(config1),
      actualX: "center",
    });
    expect(createAnchoredCenter(config2)).toEqual({
      left: getCenterXCoord(config2),
      actualX: "center",
    });
    expect(createAnchoredCenter(config3)).toEqual({
      left: getCenterXCoord(config3),
      actualX: "center",
    });
    expect(createAnchoredCenter(config4)).toEqual({
      left: getCenterXCoord(config4),
      actualX: "center",
    });
  });

  it("should set the left value to the vwMargin when it can't fit due to the left bounds of the viewport", () => {
    expect(createAnchoredCenter(leftBoundsConfig1)).toEqual({
      left: 0,
      actualX: "center",
    });
    expect(createAnchoredCenter(leftBoundsConfig1)).not.toEqual({
      left: getCenterXCoord(leftBoundsConfig1),
      actualX: "center",
    });
    expect(createAnchoredCenter(leftBoundsConfig2)).toEqual({
      left: 8,
      actualX: "center",
    });
    expect(createAnchoredCenter(leftBoundsConfig2)).not.toEqual({
      left: getCenterXCoord(leftBoundsConfig2),
      actualX: "center",
    });
  });

  it("should set the left value as the screen right value minus the element width if it can't fit within the viewport", () => {
    expect(createAnchoredCenter(rightBoundsConfig1)).toEqual({
      left: 25,
      actualX: "center",
    });
    expect(createAnchoredCenter(rightBoundsConfig1)).not.toEqual({
      left: getCenterXCoord(rightBoundsConfig1),
      actualX: "center",
    });
    expect(createAnchoredCenter(rightBoundsConfig2)).toEqual({
      left: 25,
      actualX: "center",
    });
    expect(createAnchoredCenter(rightBoundsConfig2)).not.toEqual({
      left: getCenterXCoord(rightBoundsConfig2),
      actualX: "center",
    });
  });
});

describe("createAnchoredInnerRight", () => {
  it("should return the inner left coord left value", () => {
    expect(createAnchoredInnerRight(config1)).toEqual({
      left: getInnerRightCoord(config1),
      actualX: "inner-right",
    });
    expect(createAnchoredInnerRight(config2)).toEqual({
      left: getInnerRightCoord(config2),
      actualX: "inner-right",
    });
    expect(createAnchoredInnerRight(config3)).toEqual({
      left: getInnerRightCoord(config3),
      actualX: "inner-right",
    });
    expect(createAnchoredInnerRight(config4)).toEqual({
      left: getInnerRightCoord(config4),
      actualX: "inner-right",
    });
  });

  it("should return the screenRight minus the element's width as the left value if swapping is disabled", () => {
    const updatedConfig1 = { ...leftBoundsConfig1, disableSwapping: true };
    const updatedConfig2 = { ...leftBoundsConfig2, disableSwapping: true };

    expect(createAnchoredInnerRight(updatedConfig1)).toEqual({
      left: 25,
      actualX: "inner-right",
    });
    expect(createAnchoredInnerRight(updatedConfig2)).toEqual({
      left: 25,
      actualX: "inner-right",
    });
  });

  it("should return the screenRight minus the element's width as the left value if the swapped inner left values are less than the vwMargin", () => {
    // need to move the container rect a bit more into the page so that the fixed element will
    // no longer be within the viewport
    const updatedConfig1 = {
      ...leftBoundsConfig1,
      containerRect: {
        ...leftBoundsConfig1.containerRect,
        left: 40,
      },
    };
    const updatedConfig2 = {
      ...leftBoundsConfig2,
      containerRect: {
        ...leftBoundsConfig2.containerRect,
        left: 40,
      },
    };
    expect(createAnchoredInnerRight(updatedConfig1)).toEqual({
      left: 25,
      actualX: "inner-right",
    });
    expect(createAnchoredInnerRight(updatedConfig2)).toEqual({
      left: 25,
      actualX: "inner-right",
    });
  });

  it("should swap to the inner-right if swapping is enabled and there is enough room from the inner left to display", () => {
    expect(createAnchoredInnerRight(leftBoundsConfig1)).toEqual({
      left: getInnerLeftCoord(leftBoundsConfig1),
      actualX: "inner-left",
    });
    expect(createAnchoredInnerRight(leftBoundsConfig2)).toEqual({
      left: getInnerLeftCoord(leftBoundsConfig2),
      actualX: "inner-left",
    });
  });
});

describe("createAnchoredRight", () => {
  it("should return the calcualted left coord and an actualX value of left", () => {
    expect(createAnchoredRight(config1)).toEqual({
      left: getRightCoord(config1),
      actualX: "right",
    });
    expect(createAnchoredRight(config2)).toEqual({
      left: getRightCoord(config2),
      actualX: "right",
    });
    expect(createAnchoredRight(config3)).toEqual({
      left: getRightCoord(config3),
      actualX: "right",
    });
    expect(createAnchoredRight(config4)).toEqual({
      left: getRightCoord(config4),
      actualX: "right",
    });
  });

  it("should ignore the disableSwapping argument", () => {
    const updatedConfig1 = { ...config1, disableSwapping: true };
    const updatedConfig2 = { ...config2, disableSwapping: true };
    const updatedConfig3 = { ...config3, disableSwapping: true };
    const updatedConfig4 = { ...config4, disableSwapping: true };

    expect(createAnchoredRight(updatedConfig1)).toEqual({
      left: getRightCoord(updatedConfig1),
      actualX: "right",
    });
    expect(createAnchoredRight(updatedConfig2)).toEqual({
      left: getRightCoord(updatedConfig2),
      actualX: "right",
    });
    expect(createAnchoredRight(updatedConfig3)).toEqual({
      left: getRightCoord(updatedConfig3),
      actualX: "right",
    });
    expect(createAnchoredRight(updatedConfig4)).toEqual({
      left: getRightCoord(updatedConfig4),
      actualX: "right",
    });
  });

  it("should return the screenRight minus the element's width as the left value if swapping is disabled", () => {
    expect(
      createAnchoredRight({ ...rightBoundsConfig1, disableSwapping: true })
    ).toEqual({
      left: 25,
      actualX: "right",
    });
  });

  it("should return the screenRight minus the element's width as the left value if swapping to the right will force it out of the viewport right bounds", () => {
    expect(createAnchoredRight(rightBoundsConfig1)).toEqual({
      left: 25,
      actualX: "right",
    });
  });

  it("should return the left coord as the left value if the position can be swapped within the viewport", () => {
    const config1 = {
      xMargin: 0,
      vwMargin: 0,
      elWidth: 50,
      screenRight: 200,
      disableSwapping: false,
      containerRect: {
        top: 0,
        bottom: 0,
        left: 160,
        right: 0,
        height: 40,
        width: 40,
      },
    };
    const config2 = { ...config1, xMargin: 8 };

    expect(createAnchoredRight(config2)).toEqual({
      left: getLeftCoord(config2),
      actualX: "left",
    });
  });
});

describe("createEqualWidth", () => {
  const options1 = {
    x: "center" as HorizontalPosition,
    vw: 1000,
    vwMargin: 0,
    xMargin: 0,
    elWidth: 200,
    containerRect: {
      left: 300,
      right: 300,
      top: 0,
      bottom: 200,
      height: 200,
      width: 400,
    },
    isMinWidth: false,
  };
  const options2 = { ...options1, vwMargin: 16 };
  const options3 = { ...options1, xMargin: 5 };
  const options4 = { ...options2, xMargin: 5 };

  it("should return the width of the container element along with the left value", () => {
    expect(createEqualWidth(options1)).toEqual({
      left: 300,
      width: 400,
      actualX: "center",
    });
    expect(createEqualWidth(options2)).toEqual({
      left: 300,
      width: 400,
      actualX: "center",
    });
    expect(createEqualWidth(options3)).toEqual({
      left: 305,
      width: 390,
      actualX: "center",
    });
    expect(createEqualWidth(options4)).toEqual({
      left: 305,
      width: 390,
      actualX: "center",
    });
  });

  it("should set the minWidth to the container's width instead of right if the isMinWidth option is enabled", () => {
    expect(createEqualWidth({ ...options1, isMinWidth: true })).toEqual({
      left: 300,
      minWidth: 400,
      actualX: "center",
    });
    expect(createEqualWidth({ ...options1, isMinWidth: true })).toEqual({
      left: 300,
      minWidth: 400,
      actualX: "center",
    });
    expect(createEqualWidth({ ...options3, isMinWidth: true })).toEqual({
      left: 305,
      minWidth: 390,
      actualX: "center",
    });
    expect(createEqualWidth({ ...options4, isMinWidth: true })).toEqual({
      left: 305,
      minWidth: 390,
      actualX: "center",
    });
  });

  it("should set the minWidth to the containers width and set the right to the vwMargin if the element's width is bigger than the screens right edge", () => {
    const opt1 = {
      ...options1,
      isMinWidth: true,
      elWidth: 1200,
    };
    const opt2 = { ...opt1, vwMargin: 16 };
    const opt3 = { ...opt1, xMargin: 5 };
    const opt4 = { ...opt2, xMargin: 5 };

    expect(createEqualWidth(opt1)).toEqual({
      left: 300,
      minWidth: 400,
      right: 0,
      actualX: "center",
    });
    expect(createEqualWidth(opt2)).toEqual({
      left: 300,
      minWidth: 400,
      right: 16,
      actualX: "center",
    });
    expect(createEqualWidth(opt3)).toEqual({
      left: 305,
      minWidth: 390,
      right: 0,
      actualX: "center",
    });
    expect(createEqualWidth(opt4)).toEqual({
      left: 305,
      minWidth: 390,
      right: 16,
      actualX: "center",
    });
  });
});
