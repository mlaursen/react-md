import { createContext } from "react";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";
import { RIPPLE_CLASS_NAMES, RIPPLE_TIMEOUT } from "./contants";

/**
 * This is the current mode for how your user is interacting with your app. This
 * will be used to determine which type of state styles should be applied at
 * the time of interacting with an element on your page.
 */
export type UserInteractionMode = "keyboard" | "mouse" | "touch";

/**
 * Contains all teh values in the `StatesConfig` component.
 */
export interface StatesContextType {
  /**
   * The amount of time before a ripple finishes its animation. You probably
   * don't want to change this value unless you updated the duration in scss
   * or chnaged the different class names for the ripple animation.
   */
  rippleTimeout: TransitionTimeout;

  /**
   * The class names to apply during hte different stages for the ripple animation.
   * You probably don't want to use this.
   */
  rippleClassNames: CSSTransitionClassNames;

  /**
   * Boolean if the ripple effect should be disabled for all child components
   * that use the Ripple states.
   */
  disableRipple: boolean;

  /**
   * Boolean if the ripple component should not be triggered after a "programmatic"
   * ripple effect. This would be if  the `.click()` function is called on an element
   * through javascript or some other means.
   */
  disableProgrammaticRipple: boolean;

  /**
   * The user's current interaction mode with your app.
   */
  mode: UserInteractionMode;
}

export const StatesContext = createContext<StatesContextType>({
  rippleTimeout: RIPPLE_TIMEOUT,
  rippleClassNames: RIPPLE_CLASS_NAMES,
  disableRipple: false,
  disableProgrammaticRipple: false,
  mode: "keyboard",
});
