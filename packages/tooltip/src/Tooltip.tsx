import React, {
  forwardRef,
  FunctionComponent,
  ReactNode,
  CSSProperties,
  HTMLAttributes,
} from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  CSSTransitionClassNames,
  TransitionTimeout,
  TransitionProps,
} from "@react-md/transition";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import { TOOLTIP_CLASS_NAMES, TOOLTIP_TRANSITION_TIMEOUT } from "./constants";

type TooltipPosition = "above" | "below";

/**
 * The base props for the `Tooltip` component. This can be extended when creating custom tooltip implementations.
 */
export interface TooltipProps
  extends Pick<
      TransitionProps,
      | "onEnter"
      | "onEntering"
      | "onEntered"
      | "onExit"
      | "onExiting"
      | "onExited"
      | "mountOnEnter"
      | "unmountOnExit"
    >,
    HTMLAttributes<HTMLSpanElement> {
  /**
   * An id for the tooltip. This is required for accessibility and finding an element to attach
   * event listeners to show and hide the tooltip.
   */
  id: string;

  /**
   * An optional style to apply to the tooltip.
   */
  style?: CSSProperties;

  /**
   * An optional class name to apply to the tooltip.
   */
  className?: string;

  /**
   * The contents of the tooltip to display. This can be any renderable element, but this is normally
   * just text.
   *
   * If this is placed within a `<button>` element, make sure that there are no `<div>` since it is invalid html
   * to have a `<div>` as a child of a `<button>`.
   */
  children?: ReactNode;

  /**
   * Boolean if the tooltip is using the dense spec. This will reduce the padding, margin and
   * font size for the tooltip and is usually used for desktop displays.
   */
  dense?: boolean;

  /**
   * Boolean if the tooltip should allow line wrapping. This is disabled by default since the tooltip
   * will display weirdly when its container element is small in size. It is advised to only enable
   * line wrapping when there are long tooltips or the tooltips are bigger than the container element.
   *
   * Once line wrapping is enabled, you will most likely need to set some additional padding and widths.
   */
  lineWrap?: boolean;

  /**
   * This ties directly into the CSSTransition `classNames` prop and is used to generate and apply the correct
   * class names during the tooltip's transition.
   */
  classNames?: CSSTransitionClassNames;

  /**
   * The enter duration in milliseconds for the tooltip to fully animate into view. This should match whatever value is
   * set for `$rmd-tooltip-enter-duration`. A manual timeout is used instead of `onTransitionEnd` to handle cancel
   * animations easier.
   */
  timeout?: TransitionTimeout;

  /**
   * This is the position that the tooltip should appear related to its container element as well as
   * updating the animation direction.
   */
  position?: TooltipPosition;

  /**
   * Boolean if the tooltip is visible. This value changing will trigger the different animations.
   */
  visible: boolean;
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<
  Pick<
    TooltipProps,
    "dense" | "position" | "lineWrap" | "classNames" | "timeout"
  >
>;
type WithDefaultProps = TooltipProps & DefaultProps & WithRef;

const block = bem("rmd-tooltip");

/**
 * This is the base tooltip component that can only be used to render a tooltip with an animation
 * when the visibility changes. If this component is used, you will need to manually add all the
 * event listeners and triggers to change the `visible` prop.
 */
const Tooltip: FunctionComponent<TooltipProps & WithRef> = providedProps => {
  const {
    className,
    classNames,
    visible,
    timeout,
    dense,
    lineWrap,
    position,
    children,
    forwardedRef,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <CSSTransition
      classNames={classNames}
      in={visible}
      timeout={timeout}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <span
        {...props}
        ref={forwardedRef}
        role="tooltip"
        className={cn(
          block({
            dense,
            "line-wrap": lineWrap,
            "dense-line-wrap": dense && lineWrap,
            [position]: true,
          }),
          className
        )}
      >
        {children}
      </span>
    </CSSTransition>
  );
};

const defaultProps: DefaultProps = {
  dense: false,
  position: "below",
  lineWrap: true,
  classNames: TOOLTIP_CLASS_NAMES,
  timeout: TOOLTIP_TRANSITION_TIMEOUT,
};

Tooltip.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Tooltip.displayName = "Tooltip";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Tooltip.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      children: PropTypes.node.isRequired,
      dense: PropTypes.bool,
      lineWrap: PropTypes.bool,
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      position: PropTypes.oneOf(["above", "below"]),
      visible: PropTypes.bool.isRequired,
    };
  }
}

export default forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => (
  <Tooltip {...props} forwardedRef={ref} />
));
