import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
} from "../packages/core/src/AppSizeProvider";
import "@testing-library/jest-dom/extend-expect";

// window will be undefined for the one test I force to be run in node instead
// of jsdom
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  const noop = (): void => {
    // do nothing
  };
  window.matchMedia = (query) => ({
    media: query,
    matches:
      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
    onchange: noop,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
  });
}
