"use client";

import { cnb } from "cnbuilder";
import {
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type MutableRefObject,
  type Ref,
  type RefObject,
  type TouchEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";

import {
  type ControlledHoverModeImplementation,
  useHoverMode,
} from "../hoverMode/useHoverMode.js";
import {
  type UserInteractionMode,
  useUserInteractionMode,
} from "../interaction/UserInteractionModeProvider.js";
import { type SimplePosition } from "../positioning/types.js";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type FixedPositioningOptions,
  type FixedPositioningTransitionCallbacks,
  useFixedPositioning,
} from "../positioning/useFixedPositioning.js";
import { type UseStateSetter } from "../types.js";
import { usePageInactive } from "../usePageInactive.js";
import { parseCssLengthUnit } from "../utils/parseCssLengthUnit.js";
import { useTooltipHoverMode } from "./TooltipHoverModeProvider.js";
import {
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_MARGIN,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_SPACING,
  DEFAULT_TOOLTIP_THRESHOLD,
  TOOLTIP_SPACING_VAR,
} from "./constants.js";
import {
  type TooltipPositionHookOptions,
  useTooltipPosition,
} from "./useTooltipPosition.js";
import { getAnchor } from "./utils.js";

const noop = (): void => {
  // do nothing
};

/** @since 2.8.0 */
export interface TooltipPositioningOptions {
  style?: CSSProperties;

  /**
   * @see {@link FixedPositioningOptions.vwMargin}
   * @defaultValue `16`
   */
  vwMargin?: number;

  /**
   * @see {@link FixedPositioningOptions.vhMargin}
   * @defaultValue `16`
   */
  vhMargin?: number;

  /**
   * Set this to `true` to reduce the font size and padding on the tooltip and
   * the amount of spacing between the tooltipped element and the tooltip.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * The amount of spacing to use between the tooltipped element and the tooltip
   * when {@link disableAutoSpacing} is `false`.
   *
   * @defaultValue `"1.5rem`
   */
  spacing?: number | string;

  /**
   * The amount of spacing to use between the tooltipped element and the tooltip
   * when {@link disableAutoSpacing} is `false` and {@link dense} is `true`.
   *
   * @defaultValue `"0.875rem`
   */
  denseSpacing?: number | string;

  /**
   * Set this to `true` to prevent the {@link defaultPosition} to swap to the
   * other side of the tooltipped element when it is too close to the viewport
   * edge. This will always be `true` if a {@link position} is provided.
   *
   * @defaultValue `false`
   */
  disableSwapping?: boolean;

  /**
   * @defaultValue `false`
   */
  disableAutoSpacing?: boolean;
}

/**
 * @since 2.8.0
 * @since 6.0.0 Removed the `TooltipTouchEventHandlers` and
 * `TooltipKeyboardEventHandlers` types, removed the need for the `onKeyDown`
 * event.
 */
export interface TooltippedElementEventHandlers<
  E extends HTMLElement = HTMLButtonElement,
> {
  onBlur?: (event: FocusEvent<E>) => void;
  onFocus?: (event: FocusEvent<E>) => void;
  onMouseEnter?: (event: MouseEvent<E>) => void;
  onMouseLeave?: (event: MouseEvent<E>) => void;
  onTouchStart?: (event: TouchEvent<E>) => void;
  onTouchEnd?: (event: TouchEvent<E>) => void;
  onContextMenu?: (event: MouseEvent<E>) => void;
}

/**
 * @since 2.8.0
 * @since 6.0.0 Renamed from `TooltipHookProvidedElementProps`
 */
export interface ProvidedTooltippedElementProps<
  E extends HTMLElement,
> extends Required<TooltippedElementEventHandlers<E>> {
  "aria-describedby": string | undefined;
  id: string;
}

/**
 * @since 2.8.0
 * @since 6.0.0 A major API change for the hover mode behavior and no longer
 * requires a `baseId`/`id` for the tooltip. Also renamed from
 * `TooltipHookOptions` to `TooltipOptions` to match other hook naming
 * conventions.
 */
export interface TooltipOptions<
  TooltippedElement extends HTMLElement = HTMLButtonElement,
>
  extends
    FixedPositioningTransitionCallbacks,
    TooltippedElementEventHandlers<TooltippedElement>,
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
   * @example Real World Example
   * ```tsx
   * // This is _almost_ the source code for the `TooltippedButton` provided by react-md
   * import { Button } from "@react-md/core/button/Button";
   * import { Tooltip } from "@react-md/core/tooltip/Tooltip";
   * import { useTooltip } from "@react-md/core/tooltip/useTooltip";
   * import { type ReactElement, type ReactNode } from "react";
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
   * @since 5.1.0
   */
  disabled?: boolean;

  /**
   * The amount of time (in ms) to hover an element before the tooltip becomes
   * visible.
   *
   * The default value is really the current hover timeout from the
   * `TooltipHoverModeProvider`.
   *
   * @defaultValue `1000`
   */
  hoverTimeout?: number;

  /**
   * The amount of time to wait before triggering the exit animation for the
   * tooltip.
   *
   * The default value is really the current leaveTimeout timeout from the
   * `TooltipHoverModeProvider`.
   *
   * @defaultValue `0`
   */
  leaveTimeout?: number;

  /**
   * Set this to `true` to only allow the tooltip to become visible when the
   * `event .currentTarget` or `overflowRef` has text overflow.
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  overflowOnly?: boolean;

  /**
   * @see {@link FixedPositioningOptions.disabled}
   * @defaultValue `false`
   */
  disableFixedPositioning?: boolean;
}

/**
 * @since 2.8.0
 * @since 6.0.0 This was renamed from `TooltipHookProvidedTooltipProps`
 */
export interface ProvidedTooltipProps<
  E extends HTMLElement = HTMLSpanElement,
> extends Required<FixedPositioningTransitionCallbacks> {
  id: string;
  ref: Ref<E>;
  dense: boolean;
  style: CSSProperties | undefined;
  visible: boolean;
  position: SimplePosition;
}

/**
 * @since 2.8.0
 * @since 6.0.0 No longer returns any properties from the hover mode provider
 * because of the major API change to hover mode.. Also renamed from
 * `TooltipHookReturnValue` to `TooltipImplementation` to match other hook
 * naming conventions.
 */
export interface TooltipImplementation<
  TooltippedElement extends HTMLElement = HTMLButtonElement,
  TooltipElement extends HTMLElement = HTMLSpanElement,
> extends ControlledHoverModeImplementation {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
  animatedOnce: boolean;
  initiatedBy: MutableRefObject<UserInteractionMode | null>;
  elementProps: ProvidedTooltippedElementProps<TooltippedElement>;
  tooltipProps: ProvidedTooltipProps<TooltipElement>;

  /**
   * This is a wrapper around the {@link setVisible} behavior that will also
   * clear any pending timeouts.
   */
  hideTooltip: () => void;

  /**
   * @since 6.0.0
   */
  overflowRef: RefObject<HTMLElement>;
}

/**
 * @example Simple Usage
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { Tooltip } from "@react-md/core/tooltip/Tooltip";
 * import { useTooltip } from "@react-md/core/tooltip/useTooltip";
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
 * @example Overflow-only Tooltips
 * ```tsx
 * import { cssUtils } from "@react-md/core/cssUtils";
 * import { Link, type LinkProps } from "@react-md/core/link/Link";
 * import { Tooltip } from "@react-md/core/tooltip/Tooltip";
 * import { useTooltip } from "@react-md/core/tooltip/useTooltip";
 * import { type ReactElement } from "react";
 *
 * function NavigationLink(props: LinkProps): ReactElement {
 *   const { children, ...remaining } = props;
 *
 *   // using the `overflowRef` is optional and will default to the
 *   // `event.currentTarget` when `null`
 *   const { overflowRef, elementProps, tooltipProps } = useOverflowTooltip({
 *     // just to pass any event handlers
 *     ...remaining,
 *     overflowOnly: true,
 *   });
 *
 *   return (
 *     <Link {...remaining} {...elementProps} style={{ width: "100%" }}>
 *       <span ref={overflowRef} className={cssUtils({ textOverflow: "ellipsis" })}>
 *         {children}
 *       </span>
 *       <Tooltip {...tooltipProps}>
 *         {children}
 *       </Tooltip>
 *     </Link>
 *   );
 * }
 *
 * function Example(): ReactElement {
 *   return (
 *     <div style={{ width: "10rem", overflow: "auto" }}>
 *       <NavigationLink href="/">Home</NavigationLink>
 *       <NavigationLink href="/some-path">
 *         Super long text that will be truncated with ellipsis and
 *         have a tooltip appear
 *       </NavigationLink>
 *     </div>
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
 * @see {@link https://react-md.dev/components/tooltip | Tooltip Demos}
 * @since 2.8.0
 * @since 6.0.0 Uses a separate `TooltipHoverModeProvider`.
 *
 * TODO: I need to fix the tooltip for click events and history changes since
 * the mouseleave event will not be correctly bubbled if hovering a child
 * element when the click or history update happens. this causes the tooltip to
 * stay visible
 */
export function useTooltip<
  TooltippedElement extends HTMLElement = HTMLButtonElement,
  TooltipElement extends HTMLElement = HTMLSpanElement,
>(
  options: TooltipOptions<TooltippedElement> = {}
): TooltipImplementation<TooltippedElement, TooltipElement> {
  const {
    id: propId,
    style: propStyle,
    disabled = false,
    describedBy,
    dense = false,
    hoverTimeout,
    leaveTimeout,
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
    overflowOnly,
    disableFixedPositioning,
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
    hoverTimeout,
    hoverTimeoutRef,
    leaveTimeout,
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
  const tooltipRef = useRef<TooltipElement>(null);
  const overflowRef = useRef<HTMLElement>(null);
  const initiatedBy = useRef<UserInteractionMode | null>(null);
  const { ref, style, callbacks } = useFixedPositioning({
    nodeRef: tooltipRef,
    style: propStyle,
    fixedTo: elementRef,
    anchor: getAnchor(position),
    disableSwapping: disableSwapping ?? !!determinedPosition,
    disabled: disableFixedPositioning,
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
        elementRef.current = document.getElementById(id);
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

  const isNotOverflown = (currentTarget: HTMLElement): boolean => {
    if (!overflowOnly) {
      return false;
    }

    const element = overflowRef.current || currentTarget;
    return !element || element.offsetWidth >= element.scrollWidth;
  };

  return {
    visible,
    setVisible,
    hideTooltip,
    animatedOnce: animatedOnceRef.current,
    initiatedBy,
    overflowRef,
    startShowFlow,
    startHideFlow,
    clearVisibilityTimeout,
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
        if (
          disabled ||
          mode === "touch" ||
          initiatedBy.current !== null ||
          isNotOverflown(event.currentTarget)
        ) {
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
          pageInactive.current ||
          isNotOverflown(event.currentTarget)
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
        if (
          disabled ||
          initiatedBy.current !== null ||
          isNotOverflown(event.currentTarget)
        ) {
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

        initiatedBy.current = null;
        startHideFlow();
      },
      onContextMenu(event) {
        onContextMenu(event);
        if (
          disabled ||
          initiatedBy.current !== "touch" ||
          isNotOverflown(event.currentTarget)
        ) {
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
