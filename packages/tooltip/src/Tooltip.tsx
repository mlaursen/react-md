import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { PortalInto, ConditionalPortal } from "@react-md/portal";
import {
  positionRelativeTo,
  getViewportSize,
  getViewportBounds,
  IPositionOptions,
  HorizontalPosition,
  VerticalPosition,
  unitToNumber,
} from "@react-md/utils";

import TooltipBase, { ITooltipBaseDefaultProps } from "./TooltipBase";

import { IBaseTooltipProps, TooltipPosition } from "./types.d";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface ITooltipProps extends IBaseTooltipProps {
  /**
   * An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
   */
  delay?: number;

  position?: "auto" | TooltipPosition;
  portal?: boolean;
  portalInto?: PortalInto;
  portalIntoId?: string;

  vwMargin?: number;
  vhMargin?: number;
  spacing?: number | string;
  denseSpacing?: number | string;
}

export interface ITooltipDefaultProps extends Omit<ITooltipBaseDefaultProps, "position"> {
  position: "auto" | TooltipPosition;
  delay: number;
  vwMargin: number;
  vhMargin: number;
  spacing: number | string;
  denseSpacing: number | string;
}

export type TooltipWithDefaultProps = ITooltipProps & ITooltipDefaultProps;

export interface ITooltipState {
  style?: React.CSSProperties;
  keyboard: boolean;
  position: TooltipPosition;
  visible: boolean;
}

export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    dense: PropTypes.bool,
    position: PropTypes.oneOf(["auto", "left", "above", "right", "below"]),
  };

  public static defaultProps: ITooltipDefaultProps = {
    dense: false,
    position: "auto",
    lineWrap: false,
    classNames: {
      appear: "rmd-tooltip--enter",
      appearActive: "rmd-tooltip--visible",
      enter: "rmd-tooltip--enter",
      enterActive: "rmd-tooltip--visible",
      enterDone: "rmd-tooltip--visible",
      exit: "rmd-tooltip--visible rmd-tooltip--exit",
      exitActive: "rmd-tooltip--exit-active",
    },
    duration: {
      enter: 200,
      exit: 150,
    },
    lazyMount: true,
    delay: 1000,
    vhMargin: 0.32,
    vwMargin: 0.32,
    spacing: "1.5rem",
    denseSpacing: "0.875rem",
  };

  public static getDerivedStateFromProps(nextProps: ITooltipProps, prevState: ITooltipState) {
    if (nextProps.position !== "auto" && prevState.position !== nextProps.position) {
      return { position: nextProps.position };
    }

    return null;
  }

  /**
   * The tooltip's container element. This should be a focusable element so that keyboard users will be able
   * to view the tooltip when focusing the element.
   */
  private container: HTMLElement | null;

  /**
   * The current timeout for showing the tooltip if there is a delay.
   */
  private timeout?: number;

  /**
   * Boolean if the mouseenter event was triggered previously by a touch event. Enabling this will skip the
   * mouseenter logic since the tooltip was shown instead of the touch context menu.
   */
  private touched: boolean;

  constructor(props: ITooltipProps) {
    super(props);

    this.container = null;
    this.touched = false;
    this.state = {
      keyboard: false,
      position: props.position === "auto" ? "below" : (props.position as TooltipPosition),
      visible: false,
    };
  }

  public componentDidMount() {
    const { id } = this.props;
    const container = document.querySelector(`[aria-describedby="${id}"]`);
    if (!container) {
      if (process.env.NODE_ENV !== "production") {
        // tslint:disable-next-line
        console.error(
          `Unable to render a tooltip with the provided id: \`${id}\` A tooltip can only be rendered ` +
            `if there is an element on the page with the \`aria-describedby="${id}" attribute, but none were found.`
        );
      }
      this.container = null;
      return;
    }

    this.container = container as HTMLElement;
    this.container.addEventListener("mouseenter", this.handleMouseEnter);
    this.container.addEventListener("keyup", this.handleKeyUp);
    this.container.addEventListener("touchstart", this.handleTouchStart);
  }

  public componentWillUnmount() {
    this.clearTimeout();
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.hide);
    if (!this.container) {
      return;
    }

    this.container.removeEventListener("mouseenter", this.handleMouseEnter);
    this.container.removeEventListener("keyup", this.handleKeyUp);
    this.container.removeEventListener("mouseleave", this.hide);
    this.container.removeEventListener("touchstart", this.handleTouchStart);
    this.container.removeEventListener("contextmenu", this.handleTouchContextMenu);
    this.container.removeEventListener("touchend", this.cancelTouch);
    this.container.removeEventListener("touchmove", this.cancelTouch);
    this.container = null;
  }

  public render() {
    const { style, visible, position } = this.state;
    const {
      className,
      children,
      delay,
      position: propPosition,
      vwMargin,
      vhMargin,
      portal,
      portalInto,
      portalIntoId,
      spacing,
      denseSpacing,
      ...props
    } = this.props as TooltipWithDefaultProps;

    return (
      <ConditionalPortal
        visible={visible}
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
      >
        <TooltipBase
          {...props}
          style={style}
          className={cn({ "rmd-tooltip--portal": portal || portalInto || portalIntoId }, className)}
          position={position}
          visible={visible}
          onEnter={this.handleEnter}
        >
          {children}
        </TooltipBase>
      </ConditionalPortal>
    );
  }

  private clearTimeout = () => {
    window.clearTimeout(this.timeout);
    this.timeout = undefined;
  };

  private getSpacing = () => {
    const { spacing, denseSpacing, dense } = this.props as TooltipWithDefaultProps;
    return `${dense ? denseSpacing : spacing}`;
  };

  private handleEnter = (node: HTMLSpanElement, isAppearing: boolean) => {
    const { onEnter, portal, portalInto, portalIntoId } = this.props as TooltipWithDefaultProps;
    if (onEnter) {
      onEnter(node, isAppearing);
    }

    this.updatePosition(node);
  };

  private show = (isKeyboard: boolean, isTouch: boolean) => {
    const { delay } = this.props as TooltipWithDefaultProps;
    const { visible, keyboard } = this.state;

    if (!this.container || this.timeout) {
      return;
    } else if (visible && keyboard !== isKeyboard) {
      this.setState({ keyboard: isKeyboard });
      return;
    }

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.hide);
    this.container.addEventListener("blur", this.hide);
    if (!isKeyboard && !isTouch) {
      this.container.addEventListener("mouseleave", this.hide);
    }

    this.timeout = window.setTimeout(() => {
      if (this.container && process.env.NODE_ENV !== "production") {
        const tooltip = document.getElementById(this.props.id);

        // when in dev mode, make sure that the container element has a relative position so that the tooltip
        // will appear "fixed" to the container element. This will have to be updated when I implement
        // tooltip portal support
        const { position } = window.getComputedStyle(this.container);
        if (tooltip && this.container.contains(tooltip) && position !== "relative") {
          // tslint:disable-next-line:no-console
          console.error(
            "A tooltip's container must have `position: relative` as a style for a tooltip to appear but " +
              `its position is: \`${position}\`. An inline style has been applied, but your container must ` +
              "be updated before going into production as this functionality will be removed. Tooltip Container: ",
            this.container
          );

          this.container.style.position = "relative";
        }
      }

      this.timeout = undefined;
      this.setState({
        visible: true,
        keyboard: isKeyboard,
        position: this.determineBestPosition(),
      });
    }, isTouch ? 0 : delay);
  };

  private hide = () => {
    this.touched = false;
    this.clearTimeout();
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("click", this.hide);
    if (this.container) {
      this.container.removeEventListener("mouseleave", this.hide);
      this.container.removeEventListener("blur", this.hide);
    }

    this.setState(() => ({ visible: false, keyboard: false }));
  };

  private handleMouseEnter = () => {
    if (this.touched) {
      this.clearTimeout();
      this.touched = false;

      return;
    }

    this.show(false, false);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      this.show(true, false);
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.hide();
    }
  };

  private handleTouchStart = (event: TouchEvent) => {
    if (!this.container) {
      return;
    }

    this.touched = true;
    this.container.addEventListener("contextmenu", this.handleTouchContextMenu);
    this.container.addEventListener("touchend", this.cancelTouch);
    this.container.addEventListener("touchmove", this.cancelTouch);
  };

  private cancelTouch = (event: TouchEvent) => {
    this.touched = false;
    if (!this.container) {
      return;
    }

    this.container.removeEventListener("contextmenu", this.handleTouchContextMenu);
    this.container.removeEventListener("touchend", this.cancelTouch);
    this.container.removeEventListener("touchmove", this.cancelTouch);
  };

  private handleTouchContextMenu = (event: MouseEvent) => {
    if (!this.container || !event.target) {
      return;
    }

    event.preventDefault();
    this.container.removeEventListener("contextmenu", this.handleTouchContextMenu);
    this.show(false, true);
  };

  private updatePosition = (node: HTMLSpanElement | null) => {
    const { id, portal, portalInto, portalIntoId } = this.props;
    if (!node) {
      node = document.getElementById(id);
    }

    const position = this.determineBestPosition();
    if (!node || (!portal && !portalInto && !portalIntoId)) {
      if (this.state.position !== position) {
        this.setState({ position });
      }

      return;
    }

    const style = positionRelativeTo(this.container, node, this.createPositionOptions(position));
    this.setState({ style, position });
  };

  private determineBestPosition = (): TooltipPosition => {
    const { id, position, vwMargin, vhMargin } = this.props;
    if (position !== "auto" || !this.container) {
      return position as TooltipPosition;
    }

    const rect = this.container.getBoundingClientRect();
    if (rect.top > getViewportBounds("height", vhMargin)) {
      return "above";
    }

    let { left, right } = rect;
    const tooltip = document.getElementById(id);
    if (tooltip) {
      const { offsetWidth } = tooltip;
      const spacing = unitToNumber(this.getSpacing());
      const vw = getViewportSize("width");
      if (left + offsetWidth + spacing > vw && right - offsetWidth - spacing < 0) {
        return "below";
      }

      const halvedWidth = (tooltip as HTMLSpanElement).offsetWidth / 2;
      left -= halvedWidth;
      right += halvedWidth;
    }

    if (left < getViewportBounds("width", vwMargin)) {
      return "right";
    } else if (right > getViewportBounds("width", vwMargin, false)) {
      return "left";
    }

    return "below";
  };

  private createPositionOptions = (position: TooltipPosition): IPositionOptions => {
    const spacing = this.getSpacing();
    let horizontalSpacing: string = "";
    let verticalSpacing: string = "";
    let horizontalPosition: HorizontalPosition = "center";
    let verticalPosition: VerticalPosition = "center";
    switch (position) {
      case "left":
        horizontalPosition = position;
        horizontalSpacing = spacing;
        break;
      case "right":
        horizontalPosition = position;
        horizontalSpacing = spacing;
        break;
      default:
        verticalPosition = position;
        verticalSpacing = spacing;
    }

    return {
      horizontalPosition,
      horizontalSpacing,
      verticalPosition,
      verticalSpacing,
      isPortalFixed: true,
    };
  };
}
