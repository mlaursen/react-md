import {
  TransitionStage,
  ENTER,
  ENTERING,
  ENTERED,
  EXIT,
  EXITING,
  EXITED,
} from "./constants";

/**
 *
 * @private
 */
export default function getNextStage(stage: TransitionStage): TransitionStage {
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
