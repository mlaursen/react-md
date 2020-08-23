import React, { CSSProperties, HTMLAttributes } from "react";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import { TransitionTimeout } from "@react-md/transition";

export type RippleType = "mouse" | "touch" | "keyboard" | "programmatic";
export type RippleEvent<E extends HTMLElement> = Pick<
  React.MouseEvent<E>,
  "target" | "currentTarget" | "type"
> &
  Partial<Pick<React.MouseEvent<E>, "pageX" | "pageY" | "button">> &
  Partial<Pick<React.KeyboardEvent<E>, "key">> &
  Partial<Pick<React.TouchEvent<E>, "touches">>;

export interface RippleState {
  startTime: number;
  style: CSSProperties & {
    left: number;
    top: number;
    height: number;
    width: number;
  };
  type: RippleType;
  holding: boolean;
  exiting: boolean;
  entered: boolean;
}
export type RipplesState = RippleState[];

export type MergableRippleHandlerNames =
  | "onKeyDown"
  | "onKeyUp"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onClick"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd";
export type MergableRippleHandlers<E extends HTMLElement = HTMLElement> = Pick<
  HTMLAttributes<E>,
  MergableRippleHandlerNames
>;

export interface RipplesOptions<E extends HTMLElement = HTMLElement> {
  /**
   * An optional object of event handlers to merge with the required
   * ripple trigger event handlers.
   */
  handlers?: MergableRippleHandlers<E>;

  /**
   * An optional boolean if the element is currently disabled. This will ensure
   * that the ripple states are not applied during these times.
   */
  disabled?: boolean;

  /**
   * Boolean if the ripple effeect should be disabled. This will make the `useRipples`
   * hook not provide any additional logic for the provided handlers.
   */
  disableRipple?: boolean;

  /**
   * Boolean if the spacebar click effect should be disabled. This should normally
   * state disabled unless dealing with links.
   */
  disableSpacebarClick?: boolean;

  /**
   * Boolean if the ripple effect should not occur after a programmatic trigger
   * of a click event. This would normally happen if using `aria-activedescendat`
   * movement and the user "presses" the current active element.
   */
  disableProgrammaticRipple?: boolean;

  /**
   * An optional className to apply to the ripple element.
   */
  rippleClassName?: string;

  /**
   * An optional className to apply to the ripple's container element.
   */
  rippleContainerClassName?: string;

  /**
   * An optional timeout duration for the ripple effect. If this is undefined, its value
   * will be extracted from the current `StatesContext` instead.
   */
  rippleTimeout?: TransitionTimeout;

  /**
   * An optional object containing the different transition class names for the ripple
   * effect. If this is undefined, it will be extracted from the current `StatesContext`
   * instead.
   */
  rippleClassNames?: CSSTransitionClassNames;
}
