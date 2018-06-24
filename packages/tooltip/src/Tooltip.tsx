import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export enum TooltipPosition {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left"
};

export type TransitionEvent = React.TransitionEvent<HTMLElement | React.ReactHTMLElement<any>>;

export interface ITooltipProps {
  /**
   * An id for the tooltip. This is required for accessibility and finding an element to attach
   * event listeners to show and hide the tooltip.
   */
  id: string;

  /**
   * An optional style to apply to the tooltip.
   */
  style?: React.CSSProperties;

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
  children?: React.ReactNode;

  /**
   * Boolean if the dense styles for tooltips should be displayed.
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
   * The position of the tooltip to use.
   */
  position?: TooltipPosition;

  /**
   * An optional function to call when the transition event has finished when animating in or out of visibility.
   */
  onTransitionEnd?: (e: TransitionEvent) => void;
}

export interface ITooltipPropsWithVisibility extends ITooltipProps {
  /**
   * Boolean if the tooltip is currently visible to the user. For a11y, the tooltip should always be rendered
   * on the page, so this flag will increase the opacity so it is actually visible to the user.
   */
  visible: boolean;
}

export interface ITooltipDefaultProps {
  dense: boolean;
  position: TooltipPosition.BOTTOM;
  lineWrap: false;
}

export type TooltipWithDefaultProps = ITooltipPropsWithVisibility & ITooltipDefaultProps;

const Tooltip: React.SFC<ITooltipPropsWithVisibility> = ({
  className,
  dense,
  lineWrap,
  position,
  visible,
  children,
  ...props
}) => (
  <span
    {...props}
    role="tooltip"
    className={cn("rmd-tooltip", {
      "rmd-tooltip--visible": visible,
      "rmd-tooltip--dense": dense,
      "rmd-tooltip--line-wrap": lineWrap,
    }, `rmd-tooltip--${position}`, className)}
  >
    {children}
  </span>
);

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  dense: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
};

Tooltip.defaultProps = {
  dense: false,
  position: TooltipPosition.BOTTOM,
  lineWrap: false,
} as ITooltipDefaultProps;

export default Tooltip;
