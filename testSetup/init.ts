import "@testing-library/jest-dom/extend-expect";
import {
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from "@react-md/utils";

// window will be undefined for the one test I force to be run in node instead
// of jsdom
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    media: query,
    matches:
      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
