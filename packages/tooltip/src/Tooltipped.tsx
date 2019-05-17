import React, {
  Children,
  cloneElement,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { useFixedPositioning } from "@react-md/transition";
import { Omit, unitToNumber } from "@react-md/utils";
import Tooltip, { TooltipProps } from "./Tooltip";
import useTooltipState, {
  MergableHandlers,
  TooltipStateOptions,
} from "./useTooltipState";
import { DEFAULT_DELAY, DEFAULT_THRESHOLD } from "./constants";

interface TooltippedProvidedProps extends MergableHandlers {
  id: string;
  "aria-describedby"?: string;
  tooltip: ReactNode;
}

export type ChildrenRenderer = (props: TooltippedProvidedProps) => ReactElement;

interface ChildProps
  extends Partial<Omit<TooltippedProvidedProps, "tooltip">> {}
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
    TooltipStateOptions,
    Pick<
      TooltipProps,
      "dense" | "lineWrap" | "mountOnEnter" | "unmountOnExit"
    > {
  /**
   * The id for the element that has a tooltip. This is always required since it will
   * be passed down to the `containerProps` in the children renderer function. It is
   * also used to generate a `tooltipId` when there is a tooltip.
   */
  id: string;

  /**
   * The tooltip to display. When this is false-ish, the children renderer will always
   * return `null` for the `tooltip` prop.
   */
  tooltip?: ReactNode;

  /**
   * An optional id for the tooltip. When this is omitted, it will be set as `${id}-tooltip`.
   */
  tooltipId?: string;

  /**
   * An optional className for the tooltip
   */
  className?: string;

  /**
   * The amount of spacing to use for a non-dense tooltip. This is the distance between the container
   * element and the tooltip.
   */
  spacing?: number | string;

  /**
   * The amount of spacing to use for a dense tooltip. This is the distance between the container
   * element and the tooltip.
   */
  denseSpacing?: number | string;

  /**
   * Since `react-md` provides mixins to automatically apply a dense spec through mixins via mexia queries,
   * the dense spec might be applied in css instead of in JS. This component will actually check the current
   * spacing amount that has been applied when the tooltip becomes visible.
   *
   * If this behavior is not desired, you can enable this prop and it will only use the provided `spacing`
   * or `denseSpacing` props based on the `dense` prop.
   */
  disableAutoSpacing?: boolean;

  /**
   * This is the viewwidth margin to use in the positioning calculation. This is just used so that the tooltip
   * can be placed with some spacing between the left and right edges of the viewport if desired.
   */
  vwMargin?: number;

  /**
   * This is the viewheight margin to use in the positioning calculation. This is just used so that the tooltip
   * can be placed with some spacing between the top and abottom edges of the viewport if desired.
   */
  vhMargin?: number;

  /**
   * The children for this component should either be a function or a single element. When the children is a single
   * React element, this component will clone in an `id`, `aria-describedby`, and all the event handlers required
   * to show and hide a tooltip relative to that element. This means that you will need to ensure that the child component
   * accepts and passes down the `on*` event handlers to a DOM node as well as the `id` and `aria-describedby` for
   * accessibility. Every component within react-md should do this by default.
   *
   * If the children is a function, the `id`, `aria-describedby`, and event handlers will be provided as well as a new `tooltip`
   * prop so that you have more control over rendering the tooltip.
   *
   * If the tooltip prop was not provided to this component, the `aria-describedby` and the event handlers will be omitted.
   */
  children: ChildElement | ChildrenRenderer;
}

type DefaultProps = Required<
  Pick<
    TooltippedProps,
    | "dense"
    | "spacing"
    | "denseSpacing"
    | "vwMargin"
    | "vhMargin"
    | "lineWrap"
    | "disableAutoSpacing"
    | "portal"
    | "mountOnEnter"
    | "unmountOnExit"
    | "focusDelay"
    | "hoverDelay"
    | "touchTimeout"
    | "positionThreshold"
  >
>;
type WithDefaultProps = TooltippedProps & DefaultProps;

const Tooltipped: FunctionComponent<TooltippedProps> = providedProps => {
  const {
    id,
    children,
    tooltip: tooltipChildren,
    vhMargin,
    vwMargin,
    hoverDelay,
    focusDelay,
    touchTimeout,
    spacing,
    denseSpacing,
    position: propPosition,
    positionThreshold,
    portal,
    portalInto,
    portalIntoId,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onContextMenu,
    onFocus,
    onKeyDown,
    disableAutoSpacing,
    ...props
  } = providedProps as WithDefaultProps;
  const { hide, visible, position, handlers } = useTooltipState({
    position: propPosition,
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
  });

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    fixedTo: () => document.getElementById(id),
    vhMargin,
    vwMargin,
    onResize: hide,
    onScroll: hide,
    getOptions: node => {
      let varSpacing;
      if (!disableAutoSpacing) {
        varSpacing = unitToNumber(
          window
            .getComputedStyle(node)
            .getPropertyValue("--rmd-tooltip-spacing")
        );
      }

      let currentSpacing = 0;
      if (varSpacing) {
        currentSpacing = varSpacing;
      } else {
        currentSpacing = unitToNumber(props.dense ? denseSpacing : spacing);
      }

      return {
        chMargin: currentSpacing,
        cwMargin: currentSpacing,
      };
    },
  });

  if (!tooltipChildren) {
    if (typeof children === "function") {
      return children({ id, tooltip: null });
    }

    const child = Children.only(children);
    return cloneElement(child, { id });
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
        position={position}
        style={style}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExited={onExited}
        visible={visible}
      >
        {tooltipChildren}
      </Tooltip>
    </ConditionalPortal>
  );

  const config = {
    id,
    "aria-describedby": tooltipId,
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
        result[propName] = configHandler;
      } else if (!configHandler) {
        result[propName] = propHandler;
      } else {
        // not sure of a way to actually strongly type this nicely.
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
    <Fragment>
      {cloneElement(child, merged)}
      {tooltip}
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  dense: false,
  spacing: "1.5rem",
  denseSpacing: "0.875rem",
  positionThreshold: DEFAULT_THRESHOLD,
  disableAutoSpacing: false,
  vhMargin: 16,
  vwMargin: 16,
  portal: true,
  lineWrap: true,
  focusDelay: DEFAULT_DELAY,
  hoverDelay: DEFAULT_DELAY,
  touchTimeout: DEFAULT_DELAY,
  mountOnEnter: true,
  unmountOnExit: true,
};

Tooltipped.defaultProps = defaultProps;

export default Tooltipped;
