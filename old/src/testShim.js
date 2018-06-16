/* eslint-env jest */

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
