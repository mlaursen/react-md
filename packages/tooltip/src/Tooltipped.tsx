import React, {
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
} from "react";
import cn from "classnames";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { useFixedPositioning } from "@react-md/transition";
import {
  HorizontalPosition,
  unitToNumber,
  VerticalPosition,
} from "@react-md/utils";

import { DEFAULT_TOOLTIP_DELAY, DEFAULT_TOOLTIP_THRESHOLD } from "./constants";
import Tooltip, { TooltipProps } from "./Tooltip";
import { MergableHandlers } from "./useHandlers";
import useTooltipState, { TooltipStateOptions } from "./useTooltipState";

interface TooltippedProvidedProps extends MergableHandlers {
  id: string;
  "aria-describedby"?: string;
  tooltip: ReactNode;
}

export type ChildrenRenderer = (props: TooltippedProvidedProps) => ReactElement;

type R = Record<string, unknown>;
type ChildProps = Partial<Omit<TooltippedProvidedProps, "tooltip">>;
type ChildElement = ReactElement<ChildProps>;

const MERGABLE_PROPS: (keyof MergableHandlers)[] = [
  "onMouseEnter",
  "onMouseLeave",
  "onTouchStart",
  "onTouchMove",
  "onFocus",
  "onKeyDown",
  "onContextMenu",
];

export interface TooltippedProps
  extends RenderConditionalPortalProps,
    Omit<TooltipStateOptions, "defaultPosition">,
    Partial<Pick<TooltipStateOptions, "defaultPosition">>,
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
   * An optional id for the tooltip. When this is omitted, it will be set as
   * `${id}-tooltip`.
   */
  tooltipId?: string;

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
   * Since `react-md` provides mixins to automatically apply a dense spec
   * through mixins via mexia queries, the dense spec might be applied in css
   * instead of in JS. This component will actually check the current spacing
   * amount that has been applied when the tooltip becomes visible.
   *
   * If this behavior is not desired, you can enable this prop and it will only
   * use the provided `spacing` or `denseSpacing` props based on the `dense`
   * prop.
   *
   * Note: This will be defaulted to `true` when the `process.env.NODE_ENV ===
   * 'test'` since test environments normally don't have a default
   * `window.getComgetComputedStyle` value that is not `NaN` which will display
   * errors in your tests.
   */
  disableAutoSpacing?: boolean;

  /**
   * Boolean if the auto-swapping behavior should be disabled. When this value
   * is `undefined`, it'll be treated as `true` when the `position` prop is
   * defined, otherwise `false`.
   */
  disableSwapping?: boolean;

  /**
   * This is the viewwidth margin to use in the positioning calculation. This is
   * just used so that the tooltip can be placed with some spacing between the
   * left and right edges of the viewport if desired.
   */
  vwMargin?: number;

  /**
   * This is the viewheight margin to use in the positioning calculation. This
   * is just used so that the tooltip can be placed with some spacing between
   * the top and abottom edges of the viewport if desired.
   */
  vhMargin?: number;

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
}

/**
 * The `Tooltipped` component can be used to dynamically add a tooltip to child
 * element by cloning the required event handlers and accessibility props into
 * the child with `React.cloneChild`.
 */
function Tooltipped({
  id,
  children,
  tooltip: tooltipChildren,
  dense = false,
  vhMargin = 16,
  vwMargin = 16,
  hoverDelay = DEFAULT_TOOLTIP_DELAY,
  focusDelay = DEFAULT_TOOLTIP_DELAY,
  touchTimeout = DEFAULT_TOOLTIP_DELAY,
  spacing = "1.5rem",
  denseSpacing = "0.875rem",
  position: propPosition,
  positionThreshold = DEFAULT_TOOLTIP_THRESHOLD,
  portal = true,
  portalInto,
  portalIntoId,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onContextMenu,
  onFocus,
  onKeyDown,
  onShow,
  onHide,
  disableHoverMode,
  "aria-describedby": describedBy,
  defaultPosition = "below",
  disableSwapping,
  mountOnEnter = true,
  unmountOnExit = true,
  disableAutoSpacing = process.env.NODE_ENV === "test",
  ...props
}: TooltippedProps): ReactElement {
  const { hide, visible, position, handlers } = useTooltipState({
    position: propPosition,
    disableHoverMode,
    defaultPosition,
    positionThreshold,
    hoverDelay,
    focusDelay,
    touchTimeout,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onContextMenu,
    onFocus,
    onKeyDown,
    onShow,
    onHide,
  });

  const labelledBy = useRef(visible);

  const currentSpacing = useMemo(
    () => unitToNumber(dense ? denseSpacing : spacing),
    [spacing, denseSpacing, dense]
  );
  let getOptions;
  if (!disableAutoSpacing) {
    getOptions = (node: HTMLElement) => {
      const spacing = unitToNumber(
        window.getComputedStyle(node).getPropertyValue("--rmd-tooltip-spacing")
      );

      return { xMargin: spacing, yMargin: spacing };
    };
  }

  const isHorizontal = position === "left" || position === "right";

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    anchor: {
      x: isHorizontal ? (position as HorizontalPosition) : "center",
      y: isHorizontal ? "center" : (position as VerticalPosition),
    },
    disableSwapping:
      typeof disableSwapping === "boolean" ? disableSwapping : !!propPosition,
    fixedTo: () => document.getElementById(id),
    vhMargin,
    vwMargin,
    yMargin: currentSpacing,
    xMargin: currentSpacing,
    onResize: hide,
    onScroll: hide,
    getOptions,
  });

  if (!tooltipChildren) {
    if (typeof children === "function") {
      return children({ id, tooltip: null, "aria-describedby": describedBy });
    }

    const child = Children.only(children);
    return cloneElement(child, { id, "aria-describedby": describedBy });
  }

  let { tooltipId } = props;
  if (!tooltipId) {
    tooltipId = `${id}-tooltip`;
  }

  const tooltip = (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Tooltip
        id={tooltipId}
        {...props}
        dense={dense}
        position={position}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        style={style}
        onEnter={(node, appear) => {
          if (onEnter) {
            onEnter(node, appear);
          }

          labelledBy.current = true;
        }}
        onEntering={onEntering}
        onEntered={onEntered}
        onExited={(node) => {
          if (onExited) {
            onExited(node);
          }

          labelledBy.current = false;
        }}
        visible={visible}
      >
        {tooltipChildren}
      </Tooltip>
    </ConditionalPortal>
  );

  const config = {
    id,
    "aria-describedby":
      cn(labelledBy.current && tooltipId, describedBy) || undefined,
    ...handlers,
  };

  if (typeof children === "function") {
    return children({ ...config, tooltip });
  }

  const child = Children.only(children);
  const merged = MERGABLE_PROPS.reduce(
    (result, propName) => {
      const propHandler = child.props[propName];
      const configHandler = config[propName];
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
    { ...config }
  );

  return (
    <>
      {cloneElement(child, merged)}
      {tooltip}
    </>
  );
}

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

export default Tooltipped;
