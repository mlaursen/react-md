/* eslint-env jest*/
export const getOffset = jest.fn(() => ({ left: 0, top: 0 }));

export const animate = jest.fn();
export const isBetween = jest.fn(() => true);
export const isTouchDevice = jest.fn();
export const getTouchOffset = jest.fn(e => {
  if (!e) {
    // position at 12 o'clock
    return { offsetX: 136, offsetY: 12 };
  } else {
    return { offsetX: e.offsetX, offsetY: e.offsetY };
  }
});

/* eslint-disable arrow-body-style */
export const getField = jest.fn((props, state, field = 'value') => {
  return typeof props[field] !== 'undefined' ? props[field] : state[field];
});
