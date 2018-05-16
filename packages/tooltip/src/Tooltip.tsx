import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

declare const process: any;
export type TooltipPositions = "top" | "right" | "bottom" | "left";

export interface ITooltipProps {
  /**
   * An id for the tooltip. This is required for accessibility and finding an element to attach
   * event listeners to show and hide the tooltip.
   */
  id: string;

  /**
   * An optional style to apply to the tooltip.
   */
  style?: React.CSSProperties;

  /**
   * An optional class name to apply to the tooltip.
   */
  className?: string;

  /**
   * The contents of the tooltip to display. This can be any renderable element, but this is normally
   * just text.
   */
  children?: React.ReactNode;

  /**
   * An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
   */
  delay?: number;

  /**
   * Boolean if the dense styles for tooltips should be displayed.
   */
  dense?: boolean;

  /**
   * The position of the tooltip to use.
   */
  position?: TooltipPositions;
}

export interface ITooltipDefaultProps {
  delay: number;
  position: string;
  dense: boolean;
}

export type TooltipWithDefaultProps = ITooltipProps & ITooltipDefaultProps;

export interface ITooltipState {
  keyboard: boolean;
  visible: boolean;
  animatingIn: boolean;
  animatingOut: boolean;
}

export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    dense: PropTypes.bool,
    position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  };

  public static defaultProps: ITooltipDefaultProps = {
    dense: false,
    delay: 0,
    position: "bottom",
  };

  /**
   * The tooltip's container element. This should be a focusable element so that keyboard users will be able
   * to view the tooltip when focusing the element.
   */
  private container: HTMLElement | null;

  /**
   * The current timeout for showing the tooltip if there is a delay.
   */
  private timeout: number | null;

  constructor(props: TooltipWithDefaultProps) {
    super(props);

    this.container = null;
    this.timeout = null;
    this.state = {
      keyboard: false,
      visible: false,
      animatingIn: false,
      animatingOut: false,
    };
  }

  public componentDidMount() {
    this.init();
  }

  public componentWillUnmount() {
    this.deinit();
  }

  public render() {
    const { visible, animatingIn, animatingOut } = this.state;
    const {
      id,
      style,
      className,
      dense,
      position,
      children,
    } = this.props;

    // The tooltip is rendered in a span instead of a div since it is invalid html to have divs within a button
    // element and tooltips can appear in buttons
    return (
      <span
        id={id}
        role="tooltip"
        style={style}
        className={cn("md-tooltip", {
          "md-tooltip--visible": visible,
          "md-tooltip--active": visible || animatingIn || animatingOut,
          "md-tooltip--enter": animatingIn,
          "md-tooltip--leave": animatingOut,
          "md-tooltip--dense": dense,
        }, `md-tooltip--${position}`, className)}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {children}
      </span>
    );
  }

  /**
   * Initializes the tooltip by attempting to find its container element and then attaching the event listeners
   * for showing and hiding the tooltip.
   */
  private init = () => {
    const { id } = this.props;
    const container: null | HTMLElement = document.querySelector(`[aria-describedby="${id}"]`);
    if (!container) {
      throw new Error((
        "A tooltip's container must have the attribute `aria-describedby=\"TOOLTIP_ID\"` for accessibility " +
        `but none were found for a tooltip with id: \`${id}\``
      ));
    }

    container.addEventListener("mouseenter", this.handleMouseEnter);
    container.addEventListener("mouseleave", this.handleMouseLeave);
    container.addEventListener("keydown", this.handleKeyDown);
    container.addEventListener("keyup", this.handleKeyUp);
    container.addEventListener("blur", this.handleBlur);
    this.container = container;
  }

  /**
   * This is normally just called when the component unmounts. It will remove all the event listeners
   * from the container element if it exists.
   */
  private deinit = () => {
    if (!this.container) {
      return;
    }

    this.container.removeEventListener("mouseenter", this.handleMouseEnter);
    this.container.removeEventListener("mouseleave", this.handleMouseLeave);
    this.container.removeEventListener("keydown", this.handleKeyDown);
    this.container.removeEventListener("keyup", this.handleKeyUp);
    this.container.removeEventListener("blur", this.handleBlur);
  }

  private clearTimeout = () => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * This will conditionally show the tooltip from one of the container's event listeners. If there is a delay, it
   * will create a timeout for the delay duration and then start showing the tooltip. If there is no delay, the tooltip
   * will immediately be shown.
   */
  private show = (keyboard: boolean) => {
    if (this.timeout || !this.container || (this.state.visible && this.state.keyboard !== keyboard)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      // when in dev mode, make sure that the container element has a relative position so that the tooltip
      // will appear "fixed" to the container element. This will have to be updated when I implement
      // tooltip portal support
      const { position } = window.getComputedStyle(this.container);
      if (position !== "relative") {
        // tslint:disable-next-line:no-console
        console.error((
          "A tooltip's container must have `position: relative` as a style for a tooltip to appear but its position " +
          `is: \`${position}\`. An inline style has been applied, but your container must be updated before going ` +
          "into production as this functionality will be removed. Tooltip Container: "
        ), this.container);

        this.container.style.position = "relative";
      }
    }

    const { delay } = this.props as TooltipWithDefaultProps;
    if (delay > 0) {
      this.timeout = window.setTimeout(() => {
        this.timeout = null;
        this.setState({ visible: true, animatingIn: true });
      }, delay);

      this.setState({ keyboard, animatingOut: false, animatingIn: false, visible: false });
    } else {
      this.setState({
        keyboard,
        visible: true,
        animatingIn: true,
        animatingOut: false,
      });
    }
  }

  private hide = (keyboard: boolean) => {
    this.clearTimeout();
    if (this.state.visible && this.state.keyboard === keyboard) {
      this.setState({ animatingOut: true, animatingIn: false, visible: false, keyboard: false });
    }
  }

  private handleMouseEnter = () => {
    this.show(false);
  }

  private handleMouseLeave = () => {
    this.hide(false);
  }

  /**
   * This is way to capture focus events on the tooltip's container element. When the container is
   * focused by keyboard navigation, the tooltip should be shown.
   */
  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      this.show(true);
    }
  }

  /**
   * The user has the ability to immediately hide the tooltip if they previously focused the tooltip's container
   * with keyboard navigation and press the escape key.
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.hide(true);
    }
  }

  private handleBlur = () => {
    this.hide(true);
  }

  private handleTransitionEnd = (e: React.TransitionEvent<HTMLSpanElement>) => {
    const { animatingIn, animatingOut, visible } = this.state;
    if (visible === animatingIn && animatingOut) {
      this.setState({ animatingOut: false });
    } else if (visible === animatingOut && animatingIn) {
      this.setState({ animatingIn: false });
    }
  }
}
