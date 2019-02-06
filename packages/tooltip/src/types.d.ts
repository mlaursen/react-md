import {
  CSSTransitionClassNames,
  TransitionTimeout,
  ITransitionProps,
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

export interface ITooltipSpacingConfig {
  dense: boolean;
  spacing: number | string;
  denseSpacing: number | string;
  vwMargin: number;
  vhMargin: number;
}

export interface IDeterminePositionConfig extends ITooltipSpacingConfig {
  id: string;
  position: TooltipPositionOrAuto;
}

export type TooltipEventType = "mouse" | "touch" | "keyboard";

export interface ITooltipConfig<E extends HTMLElement = HTMLElement>
  extends MergableTooltipHandlers<E>,
    ITooltipSpacingConfig {
  id: string;
  style?: CSSProperties;
  portal: boolean;
  focusDelay: number;
  hoverDelay: number;
  defaultVisible: boolean;
  defaultPosition: TooltipPositionOrAuto;
}

export interface ITooltipState {
  visible: boolean;
  position: TooltipPosition;
}
