import React, {
  Children,
  cloneElement,
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { ResizeListener } from "@react-md/sizing";
import { useInteractionModeContext } from "@react-md/states";
import { useFixedPositioning } from "@react-md/transition";
import {
  getViewportSize,
  Omit,
  unitToNumber,
  useTimeout,
  useToggle,
} from "@react-md/utils";

import Tooltip, { TooltipProps } from "./Tooltip";

type MergableHandlers =
  | "onClick"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onTouchStart"
  | "onTouchMove"
  | "onFocus"
  | "onBlur"
  | "onKeyDown"
  | "onContextMenu";
type MergableTooltipHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  MergableHandlers
>;

interface ProvidedProps extends MergableTooltipHandlers {
  id: string;
  "aria-describedby"?: string;
  tooltip: ReactNode;
}

type ChildrenRenderer = (props: ProvidedProps) => ReactElement;
interface ChildProps extends Partial<Omit<ProvidedProps, "tooltip">> {}
type ChildElement = ReactElement<ChildProps>;

const MERGABLE_PROPS: MergableHandlers[] = [
  "onClick",
  "onMouseEnter",
  "onMouseLeave",
  "onTouchStart",
  "onTouchMove",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onContextMenu",
];

export interface TooltippedProps
  extends RenderConditionalPortalProps,
    MergableTooltipHandlers,
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
   * The amount of time in ms to wait before a tooltip should be shown after the user keyboard
   * focuses the container element.
   */
  focusDelay?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the user hovers
   * the container element.
   */
  hoverDelay?: number;

  /**
   * The amount of time in ms to wait before triggering the exit animation after the user stops
   * touching the container element on mobile devices.
   */
  touchTimeout?: number;

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
    portal,
    portalInto,
    portalIntoId,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onContextMenu,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    disableAutoSpacing,
    ...props
  } = providedProps as WithDefaultProps;
  const { dense } = props;
  const { toggled: visible, enable, disable } = useToggle();
  const [position, setPosition] = useState<"above" | "below">("below");
  const mode = useInteractionModeContext();
  const handlers = useRef({
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onContextMenu,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
  });
  useEffect(() => {
    handlers.current = {
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onContextMenu,
      onFocus,
      onBlur,
      onClick,
      onKeyDown,
    };
  });

  const { start: startMouseTimer, stop: stopMouseTimer } = useTimeout(
    enable,
    hoverDelay
  );
  const { start: startTouchTimer, stop: stopTouchTimer } = useTimeout(
    disable,
    touchTimeout
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseEnter } = handlers.current;
      if (onMouseEnter) {
        onMouseEnter(event);
      }

      startMouseTimer();
      const rect = event.currentTarget.getBoundingClientRect();
      const vh = getViewportSize("height");
      if (rect.top > vh * 0.75) {
        setPosition("above");
      } else {
        setPosition("below");
      }
    },
    []
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseLeave } = handlers.current;
      if (onMouseLeave) {
        onMouseLeave(event);
      }

      stopMouseTimer();
      disable();
    },
    []
  );

  const touched = useRef(false);
  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchStart } = handlers.current;
      if (onTouchStart) {
        onTouchStart(event);
      }

      touched.current = true;
      stopTouchTimer();
    },
    []
  );
  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchMove } = handlers.current;
      if (onTouchMove) {
        onTouchMove(event);
      }

      touched.current = false;
    },
    []
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onContextMenu } = handlers.current;
      if (onContextMenu) {
        onContextMenu(event);
      }

      if (!touched.current) {
        return;
      }

      event.preventDefault();
      const selection = window.getSelection();
      if (
        selection &&
        selection.anchorNode &&
        event.currentTarget.contains(selection.anchorNode.parentElement)
      ) {
        selection.empty();
      }

      enable();
    },
    []
  );

  useEffect(() => {
    if (!visible || mode !== "touch") {
      return;
    }

    const fn = () => {
      startTouchTimer();
      window.removeEventListener("touchend", fn, true);
    };

    window.addEventListener("touchend", fn, true);
    return () => {
      window.removeEventListener("touchend", fn, true);
    };
  }, [visible, mode]);
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const { onFocus } = handlers.current;
      if (onFocus) {
        onFocus(event);
      }

      if (mode === "keyboard") {
        enable();
      }
    },
    [mode]
  );
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const { onBlur } = handlers.current;
    if (onBlur) {
      onBlur(event);
    }

    disable();
  }, []);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const { onKeyDown } = handlers.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Escape") {
        disable();
      }
    },
    []
  );
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const { onClick } = handlers.current;
    if (onClick) {
      onClick(event);
    }

    stopMouseTimer();
    disable();
  }, []);

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
    getOptions: node => {
      let varSpacing;
      if (!disableAutoSpacing) {
        varSpacing = window
          .getComputedStyle(node)
          .getPropertyValue("--rmd-tooltip-spacing");
      }

      let currentSpacing = 0;
      if (varSpacing) {
        currentSpacing = unitToNumber(varSpacing);
      } else {
        currentSpacing = unitToNumber(dense ? denseSpacing : spacing);
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
        <ResizeListener
          immediate={false}
          onResize={() => {
            stopMouseTimer();
            stopTouchTimer();
            disable();
          }}
        />
      </Tooltip>
    </ConditionalPortal>
  );

  const config = {
    id,
    "aria-describedby": tooltipId,
    onClick: handleClick,
    onMouseEnter: mode === "mouse" ? handleMouseEnter : onMouseEnter,
    onMouseLeave: mode === "mouse" ? handleMouseLeave : onMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchMove: mode === "touch" ? handleTouchMove : onTouchMove,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: mode === "keyboard" ? handleKeyDown : onKeyDown,
    onContextMenu: handleContextMenu,
  };

  if (typeof children === "function") {
    return children({
      ...config,
      tooltip,
    });
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
  disableAutoSpacing: false,
  vhMargin: 16,
  vwMargin: 16,
  portal: true,
  lineWrap: true,
  focusDelay: 1000,
  hoverDelay: 100,
  touchTimeout: 1000,
  mountOnEnter: false,
  unmountOnExit: false,
};

Tooltipped.defaultProps = defaultProps;

export default Tooltipped;
