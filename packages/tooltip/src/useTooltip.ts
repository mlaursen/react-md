import type {
  FixedPositioningTransitionCallbacks,
  UserInteractionMode,
  UseStateSetter,
} from "@react-md/core";
import {
  parseCssLengthUnit,
  useFixedPositioning,
  useHoverMode,
  useUserInteractionMode,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import type {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  Ref,
  TouchEventHandler,
} from "react";
import { useEffect, useId, useRef } from "react";

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

export interface TooltippedElementEventHandlers<E extends HTMLElement> {
  onBlur?: FocusEventHandler<E>;
  onFocus?: FocusEventHandler<E>;
  onMouseEnter?: MouseEventHandler<E>;
  onMouseLeave?: MouseEventHandler<E>;
  onTouchStart?: TouchEventHandler<E>;
  onContextMenu?: MouseEventHandler<E>;
}

export interface ProvidedTooltippedElementProps<E extends HTMLElement>
  extends Required<TooltippedElementEventHandlers<E>> {
  "aria-describedby": string | undefined;
  id: string;
}

export interface TooltipHookOptions<E extends HTMLElement>
  extends FixedPositioningTransitionCallbacks,
    TooltippedElementEventHandlers<E>,
    TooltipPositioningOptions,
    TooltipPositionHookOptions {
  id?: string;
  describedBy?: string;
  style?: CSSProperties;
  disabled?: boolean;
  hoverTime?: number;
  leaveTime?: number;
}

export interface ProvidedTooltipProps
  extends Required<FixedPositioningTransitionCallbacks> {
  id: string;
  ref: Ref<HTMLSpanElement>;
  dense: boolean;
  style: CSSProperties;
  visible: boolean;
}

export interface TooltipHookReturnValue<E extends HTMLElement> {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
  animatedOnce: boolean;
  elementProps: Readonly<ProvidedTooltippedElementProps<E>>;
  tooltipProps: Readonly<ProvidedTooltipProps>;
}

/**
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
  const { visible, setVisible, startShowFlow, startHideFlow } = useHoverMode({
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
  const documentHidden = useRef(false);
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

      return {
        vwMargin,
        vhMargin,
        xMargin: currentSpacing,
        yMargin: currentSpacing,
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

  useEffect(() => {
    if (!visible) {
      return;
    }

    const hide = (): void => {
      disableHoverMode();
      initiatedBy.current = null;
      setVisible(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        hide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("touchend", hide, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("touchend", hide, true);
    };
  }, [disableHoverMode, setVisible, visible]);
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        documentHidden.current = true;
        disableHoverMode();
        initiatedBy.current = null;
        setVisible(false);
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [disableHoverMode, disabled, setVisible]);

  return {
    visible,
    setVisible,
    animatedOnce: animatedOnceRef.current,
    tooltipProps: {
      id: tooltipId,
      ref,
      dense,
      style,
      visible,
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
        if (
          disabled ||
          mode !== "keyboard" ||
          initiatedBy.current !== null ||
          documentHidden.current
        ) {
          documentHidden.current = false;
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
