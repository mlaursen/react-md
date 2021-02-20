import React, {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
} from "react";
import cn from "classnames";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

import { TransitionTimeout } from "./types";
import { CrossFadeOptions, useCrossFade } from "./useCrossFade";

export interface CrossFadeProps
  extends CrossFadeOptions<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  /**
   * The default behavior for the `CrossFade` is to clone a `ref` and
   * `className` into the `children` if it is a single element to keep unneeded
   * `<div>`s from being rendered in the DOM just for transition purposes.
   * However, this means that the `children` must be a single element that
   * forwards the `ref` correctly to a DOM node which might be a hassle.
   *
   * Enabling this prop will just update the `CrossFade` to wrap the `children`
   * in a `<div>` and apply that transition to that instead.
   *
   * Note: The `HTMLAttributes` for the `HTMLDivElement` other than the
   * `className` are only valid for this component when this prop is set to
   * `true`.
   */
  wrap?: boolean;

  /**
   * The timeout to use for the cross fade animation. This should not be
   * changed unless the `classNames` prop is also changed.
   */
  timeout?: TransitionTimeout;

  /**
   * The transition class names to use for the cross fade animation.
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * The `Collapse` is really just a convenience wrapper for the `useCrossFade`
 * hook that triggers the transition by cloning the `ref` and `className` into
 * the `children` of this component.
 *
 * This transition will only fire on mount and when the `appear` prop is set to
 * `true`, so the way to trigger new animations is by changing the `key` for
 * this component so it re-mounts. However it is generally not recommended to
 * fire this transition on first page load especially when dealing with server
 * side rendering. A simple way to work around this is have the `CrossFade` near
 * the root of the app and just disable the `appear` prop until the first
 * render.
 *
 * If you want more fine-grain control over the transition, it is recommended to
 * use the `useCrossFade` hook instead.
 */
export const CrossFade = forwardRef<HTMLDivElement, CrossFadeProps>(
  function CrossFade(
    {
      wrap = false,
      appear = true,
      temporary = false,
      className: propClassName,
      transitionIn = true,
      children,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    },
    forwardedRef
  ) {
    const [rendered, { ref, className }] = useCrossFade({
      ref: forwardedRef,
      appear,
      className: propClassName,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary,
      transitionIn,
    });

    if (!rendered) {
      return null;
    }

    if (!wrap && isValidElement(children)) {
      const child = Children.only(children);
      return cloneElement(child, {
        ref,
        className: cn(child.props.className, className),
      });
    }

    return (
      <div {...props} className={className} ref={ref}>
        {children}
      </div>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    CrossFade.propTypes = {
      wrap: PropTypes.bool,
      appear: PropTypes.bool,
      temporary: PropTypes.bool,
      style: PropTypes.object,
      className: PropTypes.string,
      transitionIn: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    };
  } catch (e) {}
}
