import {
  type FormConfiguration,
  type FormTheme,
  type FormUnderlineDirection,
} from "./types.js";

// NOTE: Uses get/set for test mocking

let theme: FormTheme = "outline";
let underlineDirection: FormUnderlineDirection = "left";
let uncontrolledToggles = true;

/**
 * @since 6.0.0
 */
export const FORM_CONFIG: FormConfiguration = {
  get theme() {
    return theme;
  },
  set theme(nextTheme: FormTheme) {
    theme = nextTheme;
  },
  get underlineDirection() {
    return underlineDirection;
  },
  set underlineDirection(nextUnderlineDirection: FormUnderlineDirection) {
    underlineDirection = nextUnderlineDirection;
  },
  get uncontrolledToggles() {
    return uncontrolledToggles;
  },
  set uncontrolledToggles(nextUncontrolledToggles: boolean) {
    uncontrolledToggles = nextUncontrolledToggles;
  },
};

/**
 * @since 6.0.0
 */
export function getFormConfig<N extends keyof FormConfiguration>(
  name: N,
  override?: FormConfiguration[N]
): FormConfiguration[N] {
  if (typeof override !== "undefined") {
    return override;
  }

  return FORM_CONFIG[name];
}
