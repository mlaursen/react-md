import {
  CSSTransitionClassNames,
  TransitionTimeout,
  ITransitionProps,
} from "@react-md/transition";
import { HTMLAttributes } from "react";
import { Maybe } from "@react-md/utils";

/**
 * This type is used for verifying that one of the correct tooltip positions are used.
 */
export type TooltipPosition = "above" | "below" | "left" | "right";

export type TooltipPositionOrAuto = TooltipPosition | "auto";

/**
 * A simple type that is used to get the base Transition props from the react-transition-group
 * that are related to the tooltip's animation.
 */
export type BaseTooltipTransitionProps = Pick<
  ITransitionProps,
  "onEnter" | "onEntering" | "onEntered" | "onExit" | "onExiting" | "onExited"
>;

/**
 * The base props for the `TooltipBase` component. This can be extended when creating custom tooltip implementations.
 */
export interface IBaseTooltipProps
  extends BaseTooltipTransitionProps,
    React.HTMLAttributes<HTMLSpanElement> {
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
   * Boolean if the tooltip should be "lazily mounted" into the dom. When this is set to true, the tooltip element won't
   * be rendered until the visible prop is set to true or during the exit transition.
   */
  lazyMount?: boolean;
}

export type TooltipableEvent =
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
export type MergableTooltipHandlers<E extends HTMLElement = HTMLElement> = Pick<
  HTMLAttributes<E>,
  | "onMouseEnter"
  | "onMouseLeave"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
  | "onBlur"
  | "onContextMenu"
>;

export interface ISpacingConfig {
  dense: boolean;
  spacing: number | string;
  denseSpacing: number | string;
  vwMargin: number;
  vhMargin: number;
}

export interface IDeterminePositionConfig extends ISpacingConfig {
  id: string;
  position: TooltipPositionOrAuto;
}

export type TooltipEventType = "mouse" | "touch" | "keyboard";

export interface ITooltipConfig<E extends HTMLElement = HTMLElement>
  extends MergableTooltipHandlers<E>,
    ISpacingConfig {
  id: string;
  focusDelay: number;
  hoverDelay: number;
  defaultVisible: boolean;
  defaultPosition: TooltipPositionOrAuto;
}

export interface ITooltipState {
  visible: boolean;
  position: TooltipPosition;
}
