import { PortalInto } from "@react-md/portal";
import { ITooltipProps } from "./Tooltip";

export type InitMagicTooltip = (id: string) => void;
export type DeinitMagicTooltip = (id: string) => void;
export type TooltipSpacing = string | number;

export interface IMagicTooltipContext {
  dense: boolean;
  spacing: TooltipSpacing;
  denseSpacing: TooltipSpacing;
  visibleId: string | null;
  initMagicTooltip: InitMagicTooltip;
  deinitMagicTooltip: DeinitMagicTooltip;
  portalInto?: PortalInto;
  portalIntoId?: string;
}

export interface IMagicTooltipProps extends ITooltipProps {
  /**
   * The enter duration in milliseconds for the tooltip to fully animate into view. This should match whatever value is
   * set for `$rmd-tooltip-enter-duration`. A manual timeout is used instead of `onTransitionEnd` to handle cancel
   * animations easier.
   *
   * @docgen
   */
  enterDuration?: number;

  /**
   * The leave duration in milliseconds for the tooltip to fully animate into view. This should match whatever value is
   * set for `$rmd-tooltip-leave-duration`. A manual timeout is used instead of `onTransitionEnd` to handle cancel
   * animations easier.
   *
   * @docgen
   */
  leaveDuration?: number;

  /**
   *
   */
  vhMargin?: number;

  /**
   *
   */
  vwMargin?: number;

  /**
   *
   */
  spacing?: TooltipSpacing;

  /**
   *
   */
  denseSpacing?: TooltipSpacing;

  /**
   * A manual override for the `MagicTooltip`. This is automatically passed down
   * from
   */
  portalInto?: PortalInto;

  /**
   *
   */
  portalIntoId?: string;
}
