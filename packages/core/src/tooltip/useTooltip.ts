import { cnb } from "cnbuilder";
import type {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  Ref,
  TouchEventHandler,
} from "react";
import { useCallback, useEffect, useId, useRef } from "react";
import { useHoverMode } from "../hoverMode";
import type { UserInteractionMode } from "../interaction";
import { useUserInteractionMode } from "../interaction";
import type {
  FixedPositioningTransitionCallbacks,
  SimplePosition,
} from "../positioning";
import { useFixedPositioning } from "../positioning";
import type { UseStateSetter } from "../types";
import { usePageInactive } from "../usePageInactive";
import { parseCssLengthUnit } from "../utils";
import {
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_MARGIN,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_SPACING,
  DEFAULT_TOOLTIP_THRESHOLD,
  TOOLTIP_SPACING_VAR,
} from "./constants";
import { useTooltipHoverMode } from "./TooltipHoverModeProvider";
import type { TooltipPositionHookOptions } from "./useTooltipPosition";
import { useTooltipPosition } from "./useTooltipPosition";
import { getAnchor } from "./utils";

declare module "react" {
  interface CSSProperties {
    "--rmd-tooltip-background-color"?: string;
    "--rmd-tooltip-color"?: string;
    "--rmd-tooltip-spacing"?: string | number;
  }
}

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 2.8.0 */
export interface TooltipPositioningOptions {
  style?: CSSProperties;

  /**
   * @defaultValue `DEFAULT_TOOLTIP_MARGIN`
   * @see {@link DEFAULT_TOOLTIP_MARGIN}
   */
  vwMargin?: number;

  /**
   * @defaultValue `DEFAULT_TOOLTIP_MARGIN`
   * @see {@link DEFAULT_TOOLTIP_MARGIN}
   */
  vhMargin?: number;

  /**
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * @defaultValue `DEFAULT_TOOLTIP_SPACING`
   * @see {@link DEFAULT_TOOLTIP_SPACING}
   */
  spacing?: number | string;

  /**
   * @defaultValue `DEFAULT_TOOLTIP_DENSE_SPACING`
   * @see {@link DEFAULT_TOOLTIP_DENSE_SPACING}
   */
  denseSpacing?: number | string;

  /**
   * @defaultValue `false`
   */
  disableSwapping?: boolean;

  /**
   * @defaultValue `false`
   */
  disableAutoSpacing?: boolean;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Removed the `TooltipTouchEventHandlers` and
 * `TooltipKeyboardEventHandlers` types. Also removed the need for the
 * `onKeyDown` event.
 */
export interface TooltippedElementEventHandlers<E extends HTMLElement> {
  onBlur?: FocusEventHandler<E>;
  onFocus?: FocusEventHandler<E>;
  onMouseEnter?: MouseEventHandler<E>;
  onMouseLeave?: MouseEventHandler<E>;
  onTouchStart?: TouchEventHandler<E>;
  onTouchEnd?: TouchEventHandler<E>;
  onContextMenu?: MouseEventHandler<E>;
}

/** @remarks \@since 2.8.0 */
export interface ProvidedTooltippedElementProps<E extends HTMLElement>
  extends Required<TooltippedElementEventHandlers<E>> {
  "aria-describedby": string | undefined;
  id: string;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 A major API change for the hover mode behavior and no longer
 * requires a `baseId`/`id` for the tooltip.
 */
export interface TooltipHookOptions<E extends HTMLElement>
  extends FixedPositioningTransitionCallbacks,
    TooltippedElementEventHandlers<E>,
    TooltipPositioningOptions,
    TooltipPositionHookOptions {
  /**
   * @defaultValue `"tooltip-" + useId()`
   */
  id?: string;

  /**
   * An optional override for the `aria-describedby`
   */
  describedBy?: string;

  /**
   * Any styles to be merged with the fixed positioning styles for the tooltip.
   */
  style?: CSSProperties;

  /**
   * Boolean if the event handlers should no longer attempt to show a tooltip. This
   * should be set to `true` when your component might not have a tooltip associated
   * with it.
   *
   * @example
   * Real World Example
   * ```tsx
   * import { Button, ButtonProps, Tooltip, useTooltip  } from "@react-md/core";
   * import type { ReactElement, ReactNode } from "react";
   *
   * export interface TooltippedButtonProps extends ButtonProps {
   *   tooltip?: ReactNode;
   * }
   *
   * export function TooltippedButton({
   *   id,
   *   tooltip,
   *   children,
   *   onBlur,
   *   onFocus,
   *   onMouseEnter,
   *   onMouseLeave,
   *   onTouchStart,
   *   onTouchEnd,
   *   onContextMenu,
   *   ...props
   * }: TooltippedButtonProps): ReactElement {
   *   const { elementProps, tooltipProps } = useTooltip({
   *     id,
   *     disabled: !tooltip,
   *     onBlur,
   *     onFocus,
   *     onMouseEnter,
   *     onMouseLeave,
   *     onTouchStart,
   *     onTouchEnd,
   *     onContextMenu,
   *   });
   *
   *   return (
   *     <>
   *       <Button {...props} {...elementProps}>
   *         {children}
   *       </Button>
   *       <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
   *     </>
   *   );
   * }
   * ```
   *
   * @defaultValue `false`
   * @remarks \@since 5.1.0
   */
  disabled?: boolean;

  /**
   * The amount of time (in ms) to hover an element before the tooltip becomes
   * visible.
   *
   * The default value is really the current hover timeout from the
   * `TooltipHoverModeProvider`.
   *
   * @defaultValue `DEFAULT_TOOLTIP_DELAY`
   */
  hoverTime?: number;

  /**
   * The amount of time to wait before triggering the exit animation for the
   * tooltip.
   *
   * The default value is really the current leaveTimeout timeout from the
   * `TooltipHoverModeProvider`.
   *
   * @defaultValue `0`
   */
  leaveTime?: number;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 This was renamed from `TooltipHookProvidedTooltipProps`
 */
export interface ProvidedTooltipProps
  extends Required<FixedPositioningTransitionCallbacks> {
  id: string;
  ref: Ref<HTMLSpanElement>;
  dense: boolean;
  style: CSSProperties;
  visible: boolean;
  position: SimplePosition;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 No longer returns any properties from the hover mode provider
 * because of the major API change to hover mode.
 */
export interface TooltipHookReturnValue<E extends HTMLElement> {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
  animatedOnce: boolean;
  elementProps: Readonly<ProvidedTooltippedElementProps<E>>;
  tooltipProps: Readonly<ProvidedTooltipProps>;

  /**
   * This is a wrapper around the {@link setVisible} behavior that will also
   * clear any pending timeouts.
   */
  hideTooltip(): void;
}

/**
 * @example
 * Simple Usage
 * ```tsx
 * import { Button, useTooltip, Tooltip } from "@react-md/core";
 *
 * function Example() {
 *   const { elementProps, tooltipProps } = useTooltip();
 *
 *   return (
 *     <>
 *       <Button {...elementProps}>Button</Button>
 *       <Tooltip {...tooltipProps}>
 *         Tooltip Content
 *       </Tooltip>
 *     </>
 *   );
 * }
 * ```
 *
 * ## Inspecting Tooltip Styles
 *
 * Since tooltips will disappear on blur, mouseleave, etc, it is a bit hard to
 * inspect the tooltip styles. In dev mode, you can manually set the visibility
 * to `true` through the dev tools.
 * - find your tooltip implementation
 * - expand the Tooltip hook
 * - expand the HoverMode hook
 * - set the first boolean state to `true`
 *
 * The tooltip will now remain visible allowing you to find it within the
 * "Inspector" tab in the dev tools.
 *
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Uses a separate `TooltipHoverModeProvider`.
 *
 * TODO: I need to fix the tooltip for click events and history changes since
 * the mouseleave event will not be correctly bubbled if hovering a child
 * element when the click or history update happens. this causes the tooltip to
 * stay visible
 */
export function useTooltip<E extends HTMLElement>(
  options: TooltipHookOptions<E> = {}
): TooltipHookReturnValue<E> {
  const {
    id: propId,
    style: propStyle,
    disabled = false,
    describedBy,
    dense = false,
    hoverTime,
    leaveTime,
    vwMargin = DEFAULT_TOOLTIP_MARGIN,
    vhMargin = DEFAULT_TOOLTIP_MARGIN,
    spacing = DEFAULT_TOOLTIP_SPACING,
    denseSpacing = DEFAULT_TOOLTIP_DENSE_SPACING,
    disableSwapping,
    disableAutoSpacing,
    position: determinedPosition,
    defaultPosition = DEFAULT_TOOLTIP_POSITION,
    threshold = DEFAULT_TOOLTIP_THRESHOLD,
    onBlur = noop,
    onFocus = noop,
    onMouseEnter = noop,
    onMouseLeave = noop,
    onTouchStart = noop,
    onTouchEnd = noop,
    onContextMenu = noop,
    onEnter = noop,
    onEntering,
    onEntered = noop,
    onExited,
  } = options;

  const fallbackId = useId();
  const id = propId || fallbackId;
  const tooltipId = `${id}-tooltip`;
  const {
    animatedOnceRef,
    hoverTimeoutRef,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
  } = useTooltipHoverMode();
  const {
    visible,
    setVisible,
    startShowFlow,
    startHideFlow,
    clearVisibilityTimeout,
  } = useHoverMode({
    hoverTime,
    hoverTimeoutRef,
    leaveTime,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
  });
  const [position, updatePosition] = useTooltipPosition({
    position: determinedPosition,
    defaultPosition,
    threshold,
  });

  const mode = useUserInteractionMode();
  const elementRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const initiatedBy = useRef<UserInteractionMode | null>(null);
  const { ref, style, callbacks } = useFixedPositioning({
    nodeRef: tooltipRef,
    style: propStyle,
    fixedTo: elementRef,
    anchor: getAnchor(position),
    disableSwapping: disableSwapping ?? !!determinedPosition,
    getFixedPositionOptions() {
      let tooltipSpacing = dense ? denseSpacing : spacing;
      const tooltip = tooltipRef.current;
      if (!disableAutoSpacing && tooltip) {
        tooltipSpacing =
          window
            .getComputedStyle(tooltip)
            .getPropertyValue(TOOLTIP_SPACING_VAR) || spacing;
      }

      const currentSpacing = parseCssLengthUnit({
        value: tooltipSpacing,
      });
      const horizontal = position === "left" || position === "right";

      return {
        vwMargin,
        vhMargin,
        xMargin: horizontal ? currentSpacing : undefined,
        yMargin: horizontal ? undefined : currentSpacing,
      };
    },
    onEnter(appearing) {
      onEnter(appearing);

      // This allows you to inspect the tooltip styles through the element
      // inspector without first hovering or focusing the tooltipped element
      // beforehand by setting the `HoverMode` hook to `true`
      if (process.env.NODE_ENV !== "production" && !elementRef.current) {
        elementRef.current = document.getElementById(id) as E | null;
      }
    },
    onEntering,
    onEntered(appearing) {
      onEntered(appearing);

      animatedOnceRef.current = true;
    },
    onExited,
  });

  const hideTooltip = useCallback(() => {
    initiatedBy.current = null;
    disableHoverMode();
    clearVisibilityTimeout();
    setVisible(false);
  }, [clearVisibilityTimeout, disableHoverMode, setVisible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        hideTooltip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", hideTooltip, true);
    window.addEventListener("touchend", hideTooltip, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", hideTooltip, true);
      window.removeEventListener("touchend", hideTooltip, true);
    };
  }, [hideTooltip, visible]);

  const refocusFrame = useRef(0);
  const pageInactive = useRef(false);
  usePageInactive({
    disabled,
    onDisabledCleanup: hideTooltip,
    onChange(active) {
      if (active) {
        refocusFrame.current = window.requestAnimationFrame(() => {
          pageInactive.current = false;
        });
        return;
      }

      pageInactive.current = true;
      hideTooltip();
    },
  });

  return {
    visible,
    setVisible,
    hideTooltip,
    animatedOnce: animatedOnceRef.current,
    tooltipProps: {
      id: tooltipId,
      ref,
      dense,
      style,
      visible,
      position,
      ...callbacks,
    },
    elementProps: {
      "aria-describedby": cnb(visible && tooltipId, describedBy) || undefined,
      id,
      onMouseEnter(event) {
        onMouseEnter(event);
        if (disabled || mode === "touch" || initiatedBy.current !== null) {
          return;
        }

        initiatedBy.current = "mouse";
        elementRef.current = event.currentTarget;
        updatePosition(event.currentTarget);
        startShowFlow(id);
      },
      onMouseLeave(event) {
        onMouseLeave(event);
        if (disabled || initiatedBy.current !== "mouse") {
          return;
        }

        startHideFlow();
        initiatedBy.current = null;
      },
      onBlur(event) {
        onBlur(event);
        if (disabled) {
          return;
        }

        initiatedBy.current = null;
        startHideFlow();
      },
      onFocus(event) {
        onFocus(event);
        // skip the focus events when the browser is re-focused if the user
        // pressed alt-tab, minimized the browser, etc
        if (
          disabled ||
          mode !== "keyboard" ||
          initiatedBy.current !== null ||
          pageInactive.current
        ) {
          pageInactive.current = false;
          return;
        }

        initiatedBy.current = "keyboard";
        elementRef.current = event.currentTarget;
        updatePosition(event.currentTarget);
        startShowFlow(id);
      },
      onTouchStart(event) {
        onTouchStart(event);
        if (disabled || initiatedBy.current !== null) {
          return;
        }

        initiatedBy.current = "touch";
        elementRef.current = event.currentTarget;
        updatePosition(event.currentTarget);
        startShowFlow(id);
      },
      onTouchEnd(event) {
        onTouchEnd(event);

        if (disabled) {
          return;
        }

        disableHoverMode();
        clearVisibilityTimeout();
        initiatedBy.current = null;
        setVisible(false);
      },
      onContextMenu(event) {
        onContextMenu(event);
        if (disabled || initiatedBy.current !== "touch") {
          return;
        }

        event.preventDefault();
        const selection = window.getSelection();
        const node = selection?.anchorNode?.parentElement;
        if (node && event.currentTarget.contains(node)) {
          selection.empty();
        }
      },
    },
  };
}
