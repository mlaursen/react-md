import { ENTERING, EXITING, TransitionStage } from "./constants";

/**
 * Gets the `window.setTimeout` duration that should be used for a given stage.
 * This will return `0` for all stagees except for `ENTERING` and `EXITING`.
 *
 * @internal
 */
export function getTimeoutDuration(
  stage: TransitionStage,
  appear: number,
  enter: number,
  exit: number,
  appearing: boolean
): number {
  if (stage === ENTERING) {
    return appearing ? appear : enter;
  }

  if (stage === EXITING) {
    return exit;
  }

  return 0;
}
