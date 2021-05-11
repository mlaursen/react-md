import {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { TransitionHooks, useFixedPositioning } from "@react-md/transition";
import {
  ABOVE_CENTER_ANCHOR,
  BELOW_CENTER_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  HoverModeEventHandlers,
  HoverModeOnlyReturnValue,
  PositionAnchor,
  SimplePosition,
  unitToNumber,
  useHoverMode,
  useOnUnmount,
  UserInteractionMode,
  useUserInteractionMode,
} from "@react-md/utils";

import {
  DEFAULT_TOOLTIP_DELAY,
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_MARGIN,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_SPACING,
  DEFAULT_TOOLTIP_THRESHOLD,
  TOOLTIP_SPACING_VAR,
} from "./constants";
import { TooltipProps } from "./Tooltip";
import {
  TooltipPositionHookOptions,
  useTooltipPosition,
} from "./useTooltipPosition";

/** @internal */
function getAnchor(position: SimplePosition): PositionAnchor {
  switch (position) {
    case "above":
      return ABOVE_CENTER_ANCHOR;
    case "below":
      return BELOW_CENTER_ANCHOR;
    case "left":
      return CENTER_LEFT_ANCHOR;
    case "right":
      return CENTER_RIGHT_ANCHOR;
    default:
      throw new Error(`Invalid position: ${position}`);
  }
}

/**
 * @internal
 * @remarks \@since 2.8.0
 */
export type TooltipInitiatedBy = UserInteractionMode | null;

/** @remarks \@since 2.8.0 */
export type TooltipTouchEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onTouchStart" | "onContextMenu"
>;

/** @remarks \@since 2.8.0 */
export type TooltipKeyboardEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onBlur" | "onFocus" | "onKeyDown"
>;

/**
 * These are all the event handlers that are required to control the visibility
 * of a tooltip-like element.
 *
 * @remarks \@since 2.8.0
 */
export type TooltippedElementEventHandlers<E extends HTMLElement> =
  HoverModeEventHandlers<E> &
    TooltipTouchEventHandlers<E> &
    TooltipKeyboardEventHandlers<E>;

/** @remarks \@since 2.8.0 */
export interface TooltipHookProvidedElementProps<E extends HTMLElement>
  extends Required<TooltippedElementEventHandlers<E>> {
  /**
   * The DOM `id` required for a11y that is based off of the
   * {@link TooltipHookOptions.baseId}.
   */
  id: string;

  /**
   * An optional `aria-describedby` that will be provided only while the tooltip
   * is visible or the {@link TooltipHookOptions.describedBy} is provided.
   */
  "aria-describedby"?: string;
}

/** @remarks \@since 2.8.0 */
export interface TooltipPositioningOptions {
  /**
   * An optional style object to merge and override the generated fixed
   * positioning styles.
   */
  style?: CSSProperties;

  /**
   * This is the viewport width margin to use in the positioning calculation.
   * This is just used so that the tooltip can be placed with some spacing
   * between the left and right edges of the viewport if desired.
   */
  vwMargin?: number;

  /**
   * This is the viewport height margin to use in the positioning calculation.
   * This is just used so that the tooltip can be placed with some spacing
   * between the top and bottom edges of the viewport if desired.
   */
  vhMargin?: number;

  /**
   * Boolean if the tooltip is using the dense spec. This will reduce the
   * padding, margin and font size for the tooltip and is usually used for
   * desktop displays.
   */
  dense?: boolean;

  /**
   * The amount of spacing to use for a non-dense tooltip. This is the distance
   * between the container element and the tooltip.
   */
  spacing?: number | string;

  /**
   * The amount of spacing to use for a dense tooltip. This is the distance
   * between the container element and the tooltip.
   */
  denseSpacing?: number | string;

  /**
   * Boolean if the auto-swapping behavior should be disabled. When this value
   * is `undefined`, it'll be treated as `true` when the `position` prop is
   * defined, otherwise `false`.
   */
  disableSwapping?: boolean;

  /**
   * Since `react-md` provides mixins to automatically apply a dense spec
   * through mixins via media queries, the dense spec might be applied in css
   * instead of in JS. This component will actually check the current spacing
   * amount that has been applied when the tooltip becomes visible.
   *
   * If this behavior is not desired, you can enable this prop and it will only
   * use the provided `spacing` or `denseSpacing` props based on the `dense`
   * prop.
   *
   * Note: This will be defaulted to `true` when the
   * `process.env.NODE_ENV === 'test'` since test environments normally don't
   * have a default `window.getComgetComputedStyle` value that is not `NaN`
   * which will display errors in your tests.
   */
  disableAutoSpacing?: boolean;
}

/** @remarks \@since 2.8.0 */
export interface BaseTooltipHookOptions<E extends HTMLElement>
  extends TransitionHooks,
    TooltipPositionHookOptions,
    TooltipPositioningOptions,
    TooltippedElementEventHandlers<E> {
  /**
   * The amount of time to wait (in ms) before showing the tooltip after
   * triggering a `touchstart` event. You _probably_ won't ever need to change
   * this value.
   *
   * The default time is about the same it takes to display the context menu
   * with a "long touch" and cancel displaying the context menu.
   */
  touchTime?: number;

  /**
   * The amount of time to wait (in ms) before showing the tooltip after a
   * keyboard user has triggered a `focus` event. You _probably_ won't ever need
   * to change this value.
   */
  focusTime?: number;

  /**
   * Boolean if the hover mode functionality should be disabled for this
   * instance instead of inheriting the value from the
   * {@link HoverModeProvider}.
   */
  disableHoverMode?: boolean;
}

/** @remarks \@since 2.8.0 */
export interface TooltipHookOptions<E extends HTMLElement>
  extends BaseTooltipHookOptions<E> {
  /**
   * This is the DOM `id` to use for the tooltipped element and is used to
   * generate an `id` for the `Tooltip` component as:
   *
   * ```ts
   * const tooltipId = `${baseId}-tooltip`
   * ```
   */
  baseId: string;

  /**
   * An optional `aria-describedby` DOM `id` string to merge with the returned
   * `aria-describedby` string since it only exists when the tooltip is visible.
   */
  describedBy?: string;
}

/**
 * The props that will be created from the {@link useTooltip} hook that should
 * be passed to the {@link Tooltip} component to work correctly.
 *
 * @remarks \@since 2.8.0
 */
export type TooltipHookProvidedTooltipProps = Pick<TooltipProps, "style"> &
  Required<
    Pick<
      TooltipProps,
      | "id"
      | "dense"
      | "position"
      | "visible"
      | "onEnter"
      | "onEntering"
      | "onEntered"
      | "onExited"
    >
  >;

/**
 * Note: This is _really_ an internal type since this is handled automatically
 * from the {@link Tooltipped} component.
 *
 * @remarks \@since 2.8.0
 */
export interface TooltipHookReturnValue<E extends HTMLElement>
  extends Omit<HoverModeOnlyReturnValue<E>, "handlers"> {
  /** {@inheritDoc TooltippedElementEventHandlers} */
  handlers: Required<TooltippedElementEventHandlers<E>>;

  /**
   * These are the props that should be provided to the element the tooltip is
   * attached to.
   */
  elementProps: TooltipHookProvidedElementProps<E>;

  /**
   * These props should be provided to the {@link Tooltip} component.
   */
  tooltipProps: TooltipHookProvidedTooltipProps;
}

/**
 * This hook is used to handle the positioning and visibility of the tooltip
 * component mostly within the {@link Tooltipped} component.
 *
 * @example
 * Simple Usage
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { useTooltip, Tooltip } from "@react-md/tooltip";
 *
 * function Example() {
 *   const { tooltipProps, elementProps } = useTooltip({
 *     baseId: 'my-element',
 *   });
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
 * @remarks \@since 2.8.0
 * @param options - All the {@link TooltipHookOptions} to configure the tooltip behavior.
 * @returns The {@link TooltipHookReturnValue}
 */
export function useTooltip<E extends HTMLElement>({
  baseId,
  style,
  describedBy,
  dense = false,
  spacing = DEFAULT_TOOLTIP_SPACING,
  denseSpacing = DEFAULT_TOOLTIP_DENSE_SPACING,
  position: determinedPosition,
  defaultPosition = DEFAULT_TOOLTIP_POSITION,
  vwMargin = DEFAULT_TOOLTIP_MARGIN,
  vhMargin = DEFAULT_TOOLTIP_MARGIN,
  threshold = DEFAULT_TOOLTIP_THRESHOLD,
  touchTime = DEFAULT_TOOLTIP_DELAY,
  focusTime = DEFAULT_TOOLTIP_DELAY,
  onFocus: propOnFocus,
  onBlur: propOnBlur,
  onKeyDown: propOnKeyDown,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchStart: propOnTouchStart,
  onContextMenu: propOnContextMenu,
  onEnter,
  onEntering,
  onEntered,
  onExited,
  disableSwapping,
  disableHoverMode: disabled,
  disableAutoSpacing = process.env.NODE_ENV === "test",
}: TooltipHookOptions<E>): TooltipHookReturnValue<E> {
  const containerRef = useRef<E | null>(null);
  const [position, updatePosition] = useTooltipPosition({
    position: determinedPosition,
    defaultPosition,
    threshold,
  });
  const mode = useUserInteractionMode();
  const [initiatedBy, setInitiatedBy] = useState<TooltipInitiatedBy>(null);
  const windowFocusEvent = useRef(false);
  const timeout = useRef<number | undefined>(undefined);
  const {
    visible,
    setVisible,
    handlers: mouseHandlers,
    disableHoverMode,
    ...others
  } = useHoverMode<E>({
    disabled,
    onClick: (event) => {
      onClick?.(event);
      if (event.isPropagationStopped()) {
        return;
      }

      setVisible(false);
      setInitiatedBy(null);
    },
    onMouseEnter: (event) => {
      onMouseEnter?.(event);
      if (initiatedBy !== null) {
        event.stopPropagation();
        return;
      }

      containerRef.current = event.currentTarget;
      updatePosition(event.currentTarget);
      setInitiatedBy("mouse");
    },
    onMouseLeave: (event) => {
      onMouseLeave?.(event);
      if (initiatedBy !== "mouse") {
        event.stopPropagation();
        return;
      }

      setInitiatedBy(null);
    },
  });
  const hide = useCallback(() => {
    window.clearTimeout(timeout.current);
    setVisible(false);
    setInitiatedBy(null);
  }, [setVisible]);

  const onBlur = (event: FocusEvent<E>): void => {
    propOnBlur?.(event);

    if (initiatedBy !== "keyboard") {
      return;
    }

    hide();
  };
  const onFocus = (event: FocusEvent<E>): void => {
    propOnFocus?.(event);

    // if the element gained focus immediately after the browser window gains
    // focus, do not start timer and ignore this event instead
    if (windowFocusEvent.current) {
      windowFocusEvent.current = false;
      return;
    }

    if (mode !== "keyboard" || initiatedBy !== null) {
      return;
    }

    setInitiatedBy("keyboard");
    window.clearTimeout(timeout.current);
    containerRef.current = event.currentTarget;
    updatePosition(event.currentTarget);
    timeout.current = window.setTimeout(() => {
      setVisible(true);
    }, focusTime);
  };

  const onKeyDown = (event: KeyboardEvent<E>): void => {
    propOnKeyDown?.(event);

    if (initiatedBy !== "keyboard" || event.key !== "Escape") {
      return;
    }

    hide();
  };

  const onTouchStart = (event: TouchEvent<E>): void => {
    propOnTouchStart?.(event);

    if (event.isPropagationStopped() || mode !== "touch") {
      return;
    }

    setInitiatedBy("touch");
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      setVisible(true);
    }, touchTime);
    containerRef.current = event.currentTarget;
    updatePosition(event.currentTarget);
  };

  const onContextMenu = (event: MouseEvent<E>): void => {
    propOnContextMenu?.(event);

    if (event.isPropagationStopped() || mode !== "touch") {
      return;
    }

    // Need to prevent the context menu from displaying and display the tooltip
    // instead.
    event.preventDefault();

    const selection = window.getSelection();
    const node = selection?.anchorNode?.parentElement;
    /* istanbul ignore next */
    if (selection && node && event.currentTarget.contains(node)) {
      selection.empty();
    }

    setVisible(true);
  };

  useEffect(() => {
    if (mode !== "keyboard") {
      windowFocusEvent.current = false;
      return;
    }

    const handler = (): void => {
      if (document.hidden) {
        hide();
        windowFocusEvent.current =
          document.activeElement === containerRef.current;
      }
    };

    window.addEventListener("visibilitychange", handler);
    return () => {
      window.removeEventListener("visibilitychange", handler);
    };
  }, [hide, mode]);
  useEffect(() => {
    if (initiatedBy !== "touch") {
      return;
    }

    window.addEventListener("touchmove", hide, true);
    window.addEventListener("touchend", hide, true);
    return () => {
      window.removeEventListener("touchmove", hide, true);
      window.removeEventListener("touchend", hide, true);
    };
  }, [hide, initiatedBy, setVisible]);

  useOnUnmount(() => {
    window.clearTimeout(timeout.current);
  });

  const { updateStyle: _u, ...positionProps } = useFixedPositioning({
    style,
    anchor: getAnchor(position),
    disableSwapping: disableSwapping ?? !!determinedPosition,
    fixedTo: containerRef,
    getOptions: (node) => {
      let tooltipSpacing = dense ? denseSpacing : spacing;
      /* istanbul ignore next */
      if (!disableAutoSpacing) {
        tooltipSpacing = window
          .getComputedStyle(node)
          .getPropertyValue(TOOLTIP_SPACING_VAR);
      }

      const currentSpacing = unitToNumber(tooltipSpacing);

      return {
        vwMargin,
        vhMargin,
        xMargin: currentSpacing,
        yMargin: currentSpacing,
      };
    },
    onResize: hide,
    onScroll: hide,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  });

  const tooltipHandlers: Required<TooltippedElementEventHandlers<E>> = {
    ...mouseHandlers,
    onFocus,
    onBlur,
    onKeyDown,
    onTouchStart,
    onContextMenu,
  };

  const tooltipId = `${baseId}-tooltip`;
  const elementProps: TooltipHookProvidedElementProps<E> = {
    id: baseId,
    "aria-describedby": cn(visible && tooltipId, describedBy) || undefined,
    ...tooltipHandlers,
  };
  const tooltipProps: TooltipHookProvidedTooltipProps = {
    id: tooltipId,
    dense,
    visible,
    position,
    ...positionProps,
  };

  return {
    ...others,
    visible,
    setVisible,
    handlers: tooltipHandlers,
    elementProps,
    tooltipProps,
    disableHoverMode,
  };
}
