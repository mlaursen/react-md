import { CSSProperties, Ref, RefCallback } from "react";
import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import {
  TransitionActions,
  TransitionProps,
} from "react-transition-group/Transition";

// Convenience Types since I reuse the react-transition-group package a decent
// amount in other `react-md` packages

export type TransitionTimeout = Required<TransitionProps>["timeout"];

// Don't want the children stuff when overriding/reusing in react-md components
// as well as the [prop: string]: any, so pick the reusable ones
type TransitionKeys =
  | "in"
  | "mountOnEnter"
  | "unmountOnExit"
  | "onEnter"
  | "onEntering"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited";

// timeout is required in the Transition props, but 99% of the time it'll be
// added with defaultProps in overrides
export interface OverridableTransitionProps
  extends TransitionActions,
    Pick<TransitionProps, TransitionKeys> {
  timeout?: TransitionTimeout;
}

export type OverridableCSSTransitionProps = OverridableTransitionProps &
  Pick<CSSTransitionProps, "classNames">;

// ============================================================================
// `react-md` specific types below

/**
 * This is basically the same as the `EnterHandler` from
 * `react-transition-group` except that this allows for the element type to be
 * provided.
 */
export type EnterHandler<E extends HTMLElement = HTMLDivElement> = (
  node: E,
  isAppearing: boolean
) => void;

/**
 * This is basically the same as the `ExitHandler` from `react-transition-group`
 * except that this allows for the element type to be provided.
 */
export type ExitHandler<E extends HTMLElement = HTMLDivElement> = (
  node: E
) => void;

export interface TransitionCallbacks<E extends HTMLElement = HTMLDivElement> {
  /**
   * An optional enter handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired right after the `transitionIn` is set to `true`.
   */
  onEnter?: EnterHandler<E>;

  /**
   * An optional entering handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired almost immediately after the `onEnter` callback.
   * However, if the `repaint` option was enabled, it will ensure the DOM as
   * been repainted before firing to help with CSS transitions.
   */
  onEntering?: EnterHandler<E>;

  /**
   * An optional entered handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired once the transition has finished.
   */
  onEntered?: EnterHandler<E>;

  /**
   * An optional exit handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles.
   *
   * This will be fired right after the `transitionIn` is set to `false`.
   */
  onExit?: ExitHandler<E>;

  /**
   * An optional exit handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles.
   *
   * This will be fired almost immdiately after the `onExit` callback. However,
   * if the `repaint` option was enabled, it will ensure the DOM as been
   * repainted before firing to help with CSS transitions.
   */
  onExiting?: ExitHandler<E>;

  /**
   * An optional entered handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired once the transition has finished.
   *
   * Note: If the `temporary` option was enabled, the `rendered` result will be
   * `false` and the node actually won't exist in the DOM anymore.
   */
  onExited?: ExitHandler<E>;
}

/**
 * The options availabe for the `useTransition` hook. This was once again
 * heavily inspired by the `Transition` and `CSSTransition` components from
 * `react-transition-group`.
 */
export interface TransitionOptions<E extends HTMLElement = HTMLDivElement>
  extends TransitionCallbacks<E> {
  /**
   * Changing this boolean will trigger a transition between the six stagees:
   *
   * - `ENTER`
   * - `ENTERING`
   * - `ENTERED`
   * - `EXIT`
   * - `EXITING`
   * - `EXITED`
   *
   * Changing from `false` to `true`, the stagees will change in this order:
   * `EXITED -> ENTER -> ENTERING -> ENTERED`
   *
   * Changing from `true` to `false`, the stagees will change in this order:
   * `ENTERED -> EXIT -> EXITING -> EXITED`
   */
  transitionIn: boolean;

  /**
   * Boolean if the transition should also be triggered immediately once the
   * component mounts. This is generally not recommended for server side
   * rendering/initial page load so it is set to `false` by default.
   */
  appear?: boolean;

  /**
   * Boolean if the transition should allow for an enter animation once the
   * `transitionIn` booleanis set to `true`.
   */
  enter?: boolean;

  /**
   * Boolean if the transition should allow for an exit animation once the
   * `transitionIn` booleanis set to `false`.
   */
  exit?: boolean;

  /**
   * Boolean if the component should mount and unmount based on the current
   * `transitionIn` stage with a default value of `false`. When this is
   * `false`, the first result (`rendered`) in the return value array will
   * always be `true`.
   *
   * When this is set to `true`, the first result (`rendered`) in the return
   * value array will be `true` only while the `transitionIn` option is `true`
   * or the transition is still happening.
   *
   * Note: **Changing this option while the hook/component is mounted will not
   * do anything**. If you want to dynamically change the component's temporary
   * state, you will need to also change the `key` to get the component to
   * re-mount.
   */
  temporary?: boolean;

  /**
   * Boolean if the transition should force a DOM repaint before triggering the
   * next stage. Defaults to `false` since it's only really recommended for DOM
   * and CSS transitions.
   */
  repaint?: boolean;

  /**
   * The transition timeout to use for each stage. Just like in
   * `react-transition-group`, this can either be a `number` which will a static
   * duration to use for each stage. Otherwise, this can be an object of
   * timeouts for the `appear`, `enter`, and `exit` stages which default to `0`
   * if omitted.
   *
   * Note: If any of the timeout values are set to `0`, the transition will be
   * considered disabled and skip the `ENTERING`/`EXITING` stages.
   *
   * Note: If the `appear` stage is omitted in the timeout object but the
   * `appear` option was enabled for the transition, it will instead default to
   * the `enter` duration.
   */
  timeout: TransitionTimeout;

  /**
   * An optional ref that will get merged with the required ref for the
   * transition to work.
   */
  ref?: Ref<E>;
}

export interface CSSTransitionOptions<E extends HTMLElement>
  extends Omit<TransitionOptions<E>, "repaint"> {
  /**
   * An optional className that should ge merged with the CSS transition class
   * name based on the current transition stage.
   */
  className?: string;

  /**
   * The transition class names to apply. Unlike in `react-transition-group`, if
   * this is a `string` instead of an object, the different states will be
   * `--{state}` instead of `-{state}`.
   *
   * Example:
   *
   * ```ts
   * const options = {
   *   classNames: "scale"
   * }
   *
   * // creates
   * const classNames = {
   *   enter: "scale--enter",
   *   enterActive: "scale--enter-active",
   *   exit: "scale--exit",
   *   exitActive: "scale--exit-active",
   * }
   * ```
   *
   * ```ts
   * const options = {
   *   classNames: "scale"
   *   appear: true,
   * }
   *
   * // creates
   * const classNames = {
   *   appear: "scale--enter",
   *   appearActive: "scale--enter-active",
   *   enter: "scale--enter",
   *   enterActive: "scale--enter-active",
   *   exit: "scale--exit",
   *   exitActive: "scale--exit-active",
   * }
   * ```
   */
  classNames: CSSTransitionClassNames | string;
}

export interface CSSTransitionProvidedProps<E extends HTMLElement> {
  /**
   * A ref that **must** be passed to the element that is triggering a CSS
   * transition change. An error will be thrown if the transition starts, but
   * the ref is still `null` or the `ref` was passed to a component instance
   * instead of a DOM node.
   */
  ref: RefCallback<E>;

  /**
   * The current class name based on the provided `className` options and the
   * state in the transition.
   */
  className: string | undefined;
}

export interface CollapseOptions<E extends HTMLElement>
  extends Omit<TransitionOptions<E>, "repaint" | "transitionIn" | "timeout"> {
  /**
   * An optional className to merge with the current collapse transition
   * className.
   */
  className?: string;

  /**
   * The timeout for the collapse transition. This will default to 250ms enter
   * and 200ms exit.
   */
  timeout?: TransitionTimeout;

  /**
   * The minimum height that the collapsed element can be which defaults to `0`.
   * This can either be a number of pixels or a string CSS height value.
   *
   * Setting this value to any non-zero value will allow for the element to
   * shrink to the defined min-height, and then expand to the full height once
   * no longer collapsed.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minHeight?: number | string;

  /**
   * The minimum padding-top that the collapsed element can be which defaults to
   * `0`. This can either be a number of pixels or a string CSS `padding-top`
   * value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minPaddingTop?: number | string;

  /**
   * The minimum padding-bottom that the collapsed element can be which defaults
   * to `0`. This can either be a number of pixels or a string CSS
   * `padding-bottom` value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minPaddingBottom?: number | string;
}

export interface CollapseTransitionProvidedProps<
  E extends HTMLElement = HTMLDivElement
> {
  /**
   * A ref that **must** be passed to the element that is triggering a CSS
   * transition change. An error will be thrown if the transition starts, but
   * the ref is still `null` or the `ref` was passed to a component instance
   * instead of a DOM node.
   */
  ref: RefCallback<E>;

  /**
   * The `hidden` DOM attribute that will be enabled if the component is fully
   * collapsed with no height and padding but still rendered within the DOM.
   */
  hidden: boolean;

  /**
   * A conditional style that will provide the required `max-height`,
   * `padding-top`, `padding-bottom`, and `transition-duration` styles required
   * for the collapse transition.
   */
  style?: CSSProperties;

  /**
   * The class name to apply that will allow for the element to transition
   * between collapsed states.
   */
  className: string;
}
