/*eslint-env jest*/
export const getOffset = jest.genMockFunction().mockImplementation(() => {
  return {
    left: 0,
    top: 0,
  };
});

export const animate = jest.genMockFunction();
export const isBetween = jest.genMockFunction().mockImplementation(() => true);
export const isTouchDevice = jest.genMockFunction();
export const getTouchOffset = jest.fn(e => {
  if(!e) {
    // position at 12 o'clock
    return { offsetX: 136, offsetY: 12 };
  } else {
    return { offsetX: e.offsetX, offsetY: e.offsetY };
  }
});
export const isPointInCircle = jest.genMockFunction().mockImplementation(() => true);
