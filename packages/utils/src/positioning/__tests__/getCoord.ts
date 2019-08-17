import {
  getLeftCoord,
  getInnerLeftCoord,
  getCenterXCoord,
  getInnerRightCoord,
  getRightCoord,
  getAboveCoord,
  getTopCoord,
  getCenterYCoord,
  getBottomCoord,
  getBelowCoord,
} from "../getCoord";

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

describe("getLeftCoord", () => {
  it("should return a left style value that allows the element to be fixed to the outer left of a container element", () => {
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(0);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(-8);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        containerRect: containerRect1,
      })
    ).toBe(50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        containerRect: containerRect1,
      })
    ).toBe(42);

    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(-50);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(-58);
    expect(
      getLeftCoord({
        xMargin: 0,
        elWidth: 50,
        containerRect: containerRect2,
      })
    ).toBe(0);
    expect(
      getLeftCoord({
        xMargin: 8,
        elWidth: 50,
        containerRect: containerRect2,
      })
    ).toBe(-8);
  });
});

describe("getInnerLeftCoord", () => {
  it("should return a left style value that allows the element to be fixed to the inner left of a container element", () => {
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        containerRect: containerRect1,
      })
    ).toBe(108);

    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(50);
    expect(
      getInnerLeftCoord({
        xMargin: 0,
        elWidth: 40,
        containerRect: containerRect2,
      })
    ).toBe(50);
    expect(
      getInnerLeftCoord({
        xMargin: 8,
        elWidth: 40,
        containerRect: containerRect2,
      })
    ).toBe(58);
  });
});

describe("getCenterXCoord", () => {
  it("should return a left style value that allows the element to be fixed to the horizontal center of a container element", () => {
    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterXCoord({
        xMargin: 0,
        elWidth: 200,
        containerRect: containerRect1,
      })
    ).toBe(50);
  });

  it("should ignore any margins in the calculation", () => {
    expect(
      getCenterXCoord({
        xMargin: 20,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterXCoord({
        xMargin: 20,
        elWidth: 200,
        containerRect: containerRect1,
      })
    ).toBe(50);
  });
});

describe("getInnerRightCoord", () => {
  it("should return a left style value that allows the element to be fixed to the inner-right of a container element", () => {
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(92);
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(175);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(167);

    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(150);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(142);
    expect(
      getInnerRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(225);
    expect(
      getInnerRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(217);
  });
});

describe("getRightCoord", () => {
  it("should return a left style value that allows the element to be fixed to the outer-right of a container element", () => {
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(200);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect1,
      })
    ).toBe(208);
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(200);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect1,
      })
    ).toBe(208);

    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(250);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 100,
        containerRect: containerRect2,
      })
    ).toBe(258);
    expect(
      getRightCoord({
        xMargin: 0,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(250);
    expect(
      getRightCoord({
        xMargin: 8,
        elWidth: 25,
        containerRect: containerRect2,
      })
    ).toBe(258);
  });
});

describe("getAboveCoord", () => {
  it("should create a top style value that allows an element to be fixed completely above a container element", () => {
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(-75);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(-83);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(-25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(-33);

    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(-25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(-33);
    expect(
      getAboveCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(25);
    expect(
      getAboveCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(17);
  });
});

describe("getTopCoord", () => {
  it("should create a top style value that allows an element to fixed to the top of a container element", () => {
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(25);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(33);
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(25);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(33);

    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(83);
    expect(
      getTopCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getTopCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(83);
  });
});

describe("getCenterYCoord", () => {
  it("should return a top style value that allows the element to be fixed to the vertical center of a container element", () => {
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(100);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(100);

    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(100);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getCenterYCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(100);
  });
});

describe("getBottomCoord", () => {
  it("should return a top style value that allows the element to be fixed to the bottom of a container element", () => {
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(125);
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(175);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(117);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(167);

    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(75);
    expect(
      getBottomCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(125);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(67);
    expect(
      getBottomCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(117);
  });
});

describe("getBelowCoord", () => {
  it("should return a top style value that allows the element to be fixed to the bottom of a container element", () => {
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(225);
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(225);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect1,
      })
    ).toBe(233);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect1,
      })
    ).toBe(233);

    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(175);
    expect(
      getBelowCoord({
        yMargin: 0,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(175);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 100,
        containerRect: containerRect2,
      })
    ).toBe(183);
    expect(
      getBelowCoord({
        yMargin: 8,
        elHeight: 50,
        containerRect: containerRect2,
      })
    ).toBe(183);
  });
});
