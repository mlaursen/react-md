import type {
  DragEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
} from "react";

declare module "react" {
  interface CSSProperties {
    "--rmd-ripple-background-color"?: string;
    "--rmd-interaction-background-color"?: string;
    "--rmd-hover-background-color"?: string;
    "--rmd-focus-background-color"?: string;
    "--rmd-press-background-color"?: string;
    "--rmd-selected-background-color"?: string;
    "--rmd-focus-color"?: string;
    "--rmd-focus-width"?: string | number;
  }
}

/**
 * This is used to provide feedback to the user that they are interacting with
 * elements on the page. It is recommended to not set this to `"none"` unless
 * you will implement your own version.
 *
 * When this is set to `"press"`, the `background-color` for the element will
 * become slightly darker while the user:
 * - is holding the mouse down on the element
 * - holding the enter or space key on the element
 * - holding their finger on the element for touch devices
 *
 * The `background-color` will transition in and out based on the pressed state.
 *
 * When this is set to `"ripple"`, a water droplet type of animation will appear
 * from the current coordinates of the mouse or touch event within the element.
 * Keyboard events will just trigger the animation from the center of the
 * element. Once the user stops pressing the element, the animation will start
 * to fade out.
 *
 * Note: this should match the `$interaction-mode` SCSS variable.
 *
 * @defaultValue `"ripple"`
 * @remarks \@since 6.0.0
 */
export type ElementInteractionMode = "ripple" | "press" | "none";

/** @remarks \@since 6.0.0 */
export interface ElementInteractionHandlers<E extends HTMLElement> {
  onBlur: FocusEventHandler<E>;

  /**
   * The click event handler is is only used to display a ripple for
   * `<button type="submit" />` since pressing enter on form elements should
   * submit the form. This ripple is really just to help show that the form has
   * been submitted.
   */
  onClick: MouseEventHandler<E>;

  /**
   * The keydown event handler is used to either activate the `pressed` state
   * for the element or start the ripple animation when the `enter` or `space`
   * keys are pressed. It will also trigger a click event for elements that do
   * not support this natively (`<button>`, `<a>`).
   *
   * When the space key is pressed, `event.preventDefault()` will also be called
   * to prevent the page from scrolling.
   */
  onKeyDown: KeyboardEventHandler<E>;

  /**
   * The keyup event handler is used to either deactivate the `pressed` state
   * for the element or start the exit animation for the ripple if the ripple
   * was activated by the keydown event.
   */
  onKeyUp: KeyboardEventHandler<E>;

  /**
   * The mousedown event handler is used to either activate the `pressed` state
   * for the element or start the ripple animation.
   */
  onMouseDown: MouseEventHandler<E>;

  /**
   * The mouseup event handler is used to either deactivate the `pressed` state
   * for the element or start the exit animation for the ripple if the ripple
   * was activated by the mousedown event.
   */
  onMouseUp: MouseEventHandler<E>;

  /**
   * The mouseleave event handler will remove all ripples and prevent any other
   * interactions if the current {@link UserInteractionMode} is `"mouse"`.
   *
   * The ripples have to be cancelled since the user might release the mouse
   * outside of the element which would never trigger the `onMouseUp` flow.
   */
  onMouseLeave: MouseEventHandler<E>;

  /**
   * The dragstart event handler will remove the ripples and prevent any other
   * interactions.
   */
  onDragStart: DragEventHandler<E>;

  /**
   * The touchstart event handler is used to either activate the `pressed` state
   * for the element or start the ripple animation.
   */
  onTouchStart: TouchEventHandler<E>;

  /**
   * The touchend event handler is used to either deactivate the `pressed`
   * state for the element or start the exit animation for the ripple if the
   * ripple was activated by the touchstart event.
   */
  onTouchEnd: TouchEventHandler<E>;

  /**
   * The touchmove event handler will remove all ripples and prevent any other
   * interactions if the current {@link UserInteractionMode} is `"touch"`.
   */
  onTouchMove: TouchEventHandler<E>;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface RippleStyle {
  readonly left: number;
  readonly top: number;
  readonly height: number;
  readonly width: number;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface RippleState {
  readonly style: RippleStyle;
  readonly exiting: boolean;
  readonly entered: boolean;
  readonly startTime: number;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export type RippleStateList = readonly RippleState[];

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface RippleTransitionCallbacks {
  onEntered(ripple: RippleState): void;
  onExited(ripple: RippleState): void;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface ProvidedRippleContainerProps
  extends RippleTransitionCallbacks {
  ripples: RippleStateList;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface ElementInteractionState {
  pressed: boolean;
  ripples: RippleStateList;
}
