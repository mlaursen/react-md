import { beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { INTERACTION_CONFIG } from "../../interaction/config.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";

beforeEach(() => {
  // set the mode to `none` in tests since ripples require
  // `getBoundingClientRect()` to create correct CSS. You'll either see warnings
  // in the console around invalid css values or `NaN`.
  INTERACTION_CONFIG.mode = "none";

  // disable transitions in tests since it just makes it more difficult
  TRANSITION_CONFIG.disabled = true;
});
