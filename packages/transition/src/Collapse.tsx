import { Children, cloneElement, ReactElement } from "react";
import cn from "classnames";

import {
  COLLAPSE_TIMEOUT,
  DEFAULT_COLLAPSE_MIN_HEIGHT,
  DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM,
  DEFAULT_COLLAPSE_MIN_PADDING_TOP,
} from "./constants";
import { CollapseOptions } from "./types";
import { useCollapse } from "./useCollapse";

export interface CollapseProps extends CollapseOptions<HTMLElement> {
  /**
   * Boolean if the the child is currently collapsed.
   */
  collapsed: boolean;

  /**
   * The child element to trigger an animation for. This child **must**
   * either be an HTMLElement or a component that:
   *
   * - forwards the ref to a DOM element
   * - applies the `style`, `className`, and `hidden` attributes correctly.
   */
  children: ReactElement;
}

/**
 * The `Collapse` component is used to transition a child element in and
 * out of view by animating it's `max-height`. This means that the child must
 * either be an HTMLElement or a component that forwards the `ref` to an
 * HTMLElement and applies the `style`, `className`, and `hidden` props to an
 * HTMLElement.
 *
 * Note: This component **should not be used for `position: absolute` or
 * `position: fixed` elements**. Instead, the `ScaleTransition` or just a simple
 * `transform` transition should be used instead. Animating `max-height`,
 * `padding-top`, and `padding-bottom` is much less performant than `transform`
 * transition since it forces DOM repaints.
 */
export function Collapse({
  children,
  collapsed,
  className,
  appear = false,
  timeout = COLLAPSE_TIMEOUT,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  minHeight = DEFAULT_COLLAPSE_MIN_HEIGHT,
  minPaddingTop = DEFAULT_COLLAPSE_MIN_PADDING_TOP,
  minPaddingBottom = DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM,
  temporary = minHeight === 0 && minPaddingTop === 0 && minPaddingBottom === 0,
}: CollapseProps): ReactElement | null {
  const [rendered, transitionProps] = useCollapse<HTMLElement>(collapsed, {
    appear,
    temporary,
    className,
    timeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    minHeight,
    minPaddingBottom,
    minPaddingTop,
  });

  if (!rendered) {
    return null;
  }

  const child = Children.only(children);
  const transitionStyle = transitionProps.style;
  const childStyle = child.props.style;
  return cloneElement(child, {
    ...transitionProps,
    style: transitionStyle ? { ...transitionStyle, ...childStyle } : childStyle,
    className: cn(transitionProps.className, child.props.className),
  });
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Collapse.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      collapsed: PropTypes.bool.isRequired,
      minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingBottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      temporary: PropTypes.bool,
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
    };
  } catch (e) {}
}
