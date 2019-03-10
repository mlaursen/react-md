import {
  CSSTransitionClassNames,
  TransitionTimeout,
  TransitionProps,
} from "@react-md/transition";
import { HTMLAttributes, CSSProperties } from "react";
import { Maybe } from "@react-md/utils";

/**
 * This type is used for verifying that one of the correct tooltip positions are used.
 */
export type TooltipPosition = "above" | "below" | "left" | "right";

export type TooltipPositionOrAuto = TooltipPosition | "auto";

export type TooltipableEvent =
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

export type MergableTooltipHandlers<E extends HTMLElement = HTMLElement> = Pick<
  HTMLAttributes<E>,
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
  | "onBlur"
  | "onContextMenu"
>;

export interface TooltipSpacingConfig {
  dense: boolean;
  spacing: number | string;
  denseSpacing: number | string;
  vwMargin: number;
  vhMargin: number;
}

export interface DeterminePositionConfig extends TooltipSpacingConfig {
  id: string;
  position: TooltipPositionOrAuto;
}

export type TooltipEventType = "mouse" | "touch" | "keyboard";

export interface TooltipConfig<E extends HTMLElement = HTMLElement>
  extends MergableTooltipHandlers<E>,
    TooltipSpacingConfig {
  id: string;
  style?: CSSProperties;
  portal: boolean;
  focusDelay: number;
  hoverDelay: number;
  defaultVisible: boolean;
  defaultPosition: TooltipPositionOrAuto;
}
