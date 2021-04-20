import React, {
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { UserInteractionMode } from "@react-md/utils";

import {
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_MARGIN,
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_SPACING,
  DEFAULT_TOOLTIP_THRESHOLD,
} from "./constants";
import { Tooltip, TooltipProps } from "./Tooltip";
import {
  TooltippedElementEventHandlers,
  BaseTooltipHookOptions,
  useTooltip,
} from "./useTooltip";

interface TooltippedProvidedProps
  extends TooltippedElementEventHandlers<HTMLElement> {
  id: string;
  "aria-describedby"?: string;
  tooltip: ReactNode;
}

export type ChildrenRenderer = (props: TooltippedProvidedProps) => ReactElement;

type R = Record<string, unknown>;
type ChildProps = Partial<Omit<TooltippedProvidedProps, "tooltip">>;
type ChildElement = ReactElement<ChildProps>;

const MERGABLE_PROPS: (keyof TooltippedElementEventHandlers<HTMLElement>)[] = [
  "onClick",
  "onMouseEnter",
  "onMouseLeave",
  "onTouchStart",
  "onFocus",
  "onKeyDown",
  "onContextMenu",
];

export interface TooltippedProps
  extends RenderConditionalPortalProps,
    BaseTooltipHookOptions<HTMLElement>,
    Pick<
      TooltipProps,
      "dense" | "lineWrap" | "mountOnEnter" | "unmountOnExit"
    > {
  /**
   * The id for the element that has a tooltip. This is always required since it
   * will be passed down to the `containerProps` in the children renderer
   * function. It is also used to generate a `tooltipId` when there is a
   * tooltip.
   */
  id: string;

  /**
   * The tooltip to display. When this is false-ish, the children renderer will
   * always return `null` for the `tooltip` prop.
   */
  tooltip?: ReactNode;

  /**
   * An optional additional `aria-describedby` id or ids to merge with the
   * tooltip id. This is really used for things like notifications or when
   * multiple elements describe your tooltipped element.
   */
  "aria-describedby"?: string;

  /**
   * An optional style for the tooltip.
   */
  style?: CSSProperties;

  /**
   * An optional className for the tooltip
   */
  className?: string;

  /**
   * The children for this component should either be a function or a single
   * element. When the children is a single React element, this component will
   * clone in an `id`, `aria-describedby`, and all the event handlers required
   * to show and hide a tooltip relative to that element. This means that you
   * will need to ensure that the child component accepts and passes down the
   * `on*` event handlers to a DOM node as well as the `id` and
   * `aria-describedby` for accessibility. Every component within react-md
   * should do this by default.
   *
   * If the children is a function, the `id`, `aria-describedby`, and event
   * handlers will be provided as well as a new `tooltip` prop so that you have
   * more control over rendering the tooltip.
   *
   * If the tooltip prop was not provided to this component, the
   * `aria-describedby` and the event handlers will be omitted.
   */
  children: ChildElement | ChildrenRenderer;

  /** @deprecated \@since 2.8.0 Use `threshold` instead.  */
  positionThreshold?: number;
  /** @deprecated \@since 2.8.0 */
  tooltipId?: string;
  /** @deprecated \@since 2.8.0 */
  hoverDelay?: number;
  /** @deprecated \@since 2.8.0 */
  focusDelay?: number;
  /** @deprecated \@since 2.8.0 */
  touchTimeout?: number;
  /** @deprecated \@since 2.8.0 */
  onShow?(mode: UserInteractionMode): void;
  /** @deprecated \@since 2.8.0 */
  onHide?(): void;
}

/**
 * The `Tooltipped` component can be used to dynamically add a tooltip to child
 * element by cloning the required event handlers and accessibility props into
 * the child with `React.cloneChild`.
 *
 * Note: This component is _kind of_ deprecated in favor of using the
 * `useTooltip` hook and `Tooltip` component instead.
 *
 * @see {@link Tooltip} for an example
 */
export function Tooltipped({
  id,
  style,
  children,
  tooltip: tooltipChildren,
  dense = false,
  vhMargin = DEFAULT_TOOLTIP_MARGIN,
  vwMargin = DEFAULT_TOOLTIP_MARGIN,
  spacing = DEFAULT_TOOLTIP_SPACING,
  denseSpacing = DEFAULT_TOOLTIP_DENSE_SPACING,
  position: propPosition,
  positionThreshold,
  threshold = positionThreshold ?? DEFAULT_TOOLTIP_THRESHOLD,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onContextMenu,
  onBlur,
  onFocus,
  onKeyDown,
  "aria-describedby": describedBy,
  defaultPosition = DEFAULT_TOOLTIP_POSITION,
  mountOnEnter = true,
  unmountOnExit = true,
  disableSwapping,
  disableHoverMode,
  disableAutoSpacing = process.env.NODE_ENV === "test",
  tooltipId: _tooltipId,
  hoverDelay: _hoverDelay,
  focusDelay: _focusDelay,
  touchTimeout: _touchTimeout,
  onShow: _onShow,
  onHide: _onHide,
  ...props
}: TooltippedProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
    style,
    dense,
    spacing,
    denseSpacing,
    vwMargin,
    vhMargin,
    position: propPosition,
    defaultPosition,
    disableSwapping,
    disableHoverMode,
    disableAutoSpacing,
    onFocus,
    onBlur,
    onKeyDown,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onContextMenu,
    threshold,
  });

  if (!tooltipChildren) {
    if (typeof children === "function") {
      return children({ id, tooltip: null, "aria-describedby": describedBy });
    }

    const child = Children.only(children);
    return cloneElement(child, { id, "aria-describedby": describedBy });
  }

  const tooltip = (
    <Tooltip
      {...tooltipProps}
      {...props}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      {tooltipChildren}
    </Tooltip>
  );

  if (typeof children === "function") {
    return children({ ...elementProps, tooltip });
  }

  const child = Children.only(children);
  // TODO: remove this mess since you should provide handlers to the
  // `Tooltipped` component instead of the child element.
  /* istanbul ignore next */
  const merged = MERGABLE_PROPS.reduce(
    (result, propName) => {
      const propHandler = child.props[propName];
      const configHandler = elementProps[propName];
      if (!propHandler) {
        (result as R)[propName] = configHandler;
      } else if (!configHandler) {
        (result as R)[propName] = propHandler;
      } else {
        // not sure of a way to actually strongly type this nicely.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[propName] = (event: any) => {
          propHandler(event);
          configHandler(event);
        };
      }

      return result;
    },
    { ...elementProps }
  );

  return (
    <>
      {cloneElement(child, merged)}
      {tooltip}
    </>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Tooltipped.propTypes = {
      tooltipId: PropTypes.string,
      dense: PropTypes.bool,
      spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      denseSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      positionThreshold: PropTypes.number,
      disableAutoSpacing: PropTypes.bool,
      vwMargin: PropTypes.number,
      vhMargin: PropTypes.number,
      portal: PropTypes.bool,
      lineWrap: PropTypes.bool,
      focusDelay: PropTypes.number,
      hoverDelay: PropTypes.number,
      touchTimeout: PropTypes.number,
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      defaultPosition: PropTypes.oneOf(["above", "below", "left", "right"]),
    };
  } catch (e) {}
}
