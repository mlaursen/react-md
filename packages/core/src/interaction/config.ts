import { type ElementInteractionMode } from "./types.js";

/**
 * @remarks \@since 6.0.0
 */
export interface ElementInteractionConfiguration {
  mode: ElementInteractionMode;
  higherContrast: boolean;
}

// NOTE: Uses get/set for test mocking

let mode: ElementInteractionMode = "ripple";
let higherContrast = true;

/**
 * @remarks \@since 6.0.0
 */
export const INTERACTION_CONFIG: ElementInteractionConfiguration = {
  get mode() {
    return mode;
  },
  set mode(nextMode: ElementInteractionMode) {
    mode = nextMode;
  },
  get higherContrast() {
    return higherContrast;
  },
  set higherContrast(nextHigherContrast) {
    higherContrast = nextHigherContrast;
  },
};
