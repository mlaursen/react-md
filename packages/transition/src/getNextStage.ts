import {
  ENTER,
  ENTERED,
  ENTERING,
  EXIT,
  EXITED,
  EXITING,
  TransitionStage,
} from "./constants";

/**
 *
 * @internal
 */
export function getNextStage(stage: TransitionStage): TransitionStage {
  switch (stage) {
    case ENTER:
      return ENTERING;
    case ENTERING:
      return ENTERED;
    case EXIT:
      return EXITING;
    case EXITING:
      return EXITED;
    default:
      return stage;
  }
}
