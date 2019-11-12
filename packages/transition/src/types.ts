import { TransitionProps } from "react-transition-group/Transition";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type TransitionTimeout = TransitionProps["timeout"];

// Don't want the children stuff when overriding/reusing in react-md components
// as well as the [prop: string]: any, so pick the reusable ones
type TransitionKeys =
  | "in"
  | "appear"
  | "enter"
  | "exit"
  | "mountOnEnter"
  | "unmountOnExit"
  | "onEnter"
  | "onEntering"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited";

// timeout is required in the Transition props, but 99% of the time it'll be added
// with defaultProps in overrides
export interface OverridableTransitionProps
  extends Pick<TransitionProps, TransitionKeys> {
  timeout?: TransitionTimeout;
}

export type OverridableCSSTransitionProps = OverridableTransitionProps &
  Pick<CSSTransitionProps, "classNames">;
