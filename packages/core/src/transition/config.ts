/**
 * @since 6.0.0
 */
export interface TransitionConfig {
  /**
   * Set this to `true` to disable all transitions from `react-md`.
   *
   * Note: It is recommended to set this to `true` in testing to keep things
   * simple and will automatically be set when using:
   *
   * ```ts
   * import "@react-md/core/test-utils/jest-globals/setup";
   *
   * // or
   * import "@react-md/core/test-utils/vitest/setup";
   * ```
   *
   * @defaultValue `false`
   */
  disabled: boolean;
}

// NOTE: Uses get/set for test mocking

let disabled = false;

/**
 * @since 6.0.0
 */
export const TRANSITION_CONFIG: TransitionConfig = {
  get disabled() {
    return disabled;
  },
  set disabled(nextDisabled: boolean) {
    disabled = nextDisabled;
  },
};
