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
   * Boolean if the tooltip should allow line wrapping. This is disabled by default since the tooltip
   * will display weirdly when its container element is small in size. It is advised to only enable
   * line wrapping when there are long tooltips or the tooltips are bigger than the container element.
   *
   * Once line wrapping is enabled, you will most likely need to set some additional padding and widths.
   */
  lineWrap?: boolean;
}

export interface ITooltipWithPositionProps extends ITooltipProps {
  /**
   * The position of the tooltip to use.
   */
  position?: TooltipPositions;
}

export interface IBaseTooltipProps extends ITooltipWithPositionProps {
  /**
   * Boolean if the tooltip should be visible or not. When this prop changes state, the tooltip animation
   * for entering or leaving will start.
   */
  visible: boolean;

  /**
   * A function that will update the `visible` prop to `true`.
   */
  onShow: (container: HTMLElement) => void;

  /**
   * A function that will update the `visible` prop to be `false`.
   */
  onHide: () => void;
}

export interface IBaseTooltipDefaultProps {
  delay: number;
  position: string;
  dense: boolean;
  lineWrap: boolean;
}

export type BaseTooltipWithDefaultProps = IBaseTooltipProps & IBaseTooltipDefaultProps;

export interface IBaseTooltipState {
  keyboard: boolean;
  lastVisible: boolean;
  animatingIn: boolean;
  animatingOut: boolean;
}

/**
 * The `BaseTooltip` component is just used to display the tooltip whenever the visible prop is enabled.
 * It will add the event listeners to the tooltip's container and conditionally call the `onShow` and
 * `onHide` props when needed. This should really only be used internally, but can also be used for custom
 * tooltip implementations.
 */
export default class BaseTooltip extends React.Component<IBaseTooltipProps, IBaseTooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    dense: PropTypes.bool,
    position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  };

  public static defaultProps: IBaseTooltipDefaultProps = {
    dense: false,
    delay: 0,
    position: "bottom",
    lineWrap: false,
  };

  public static getDerivedStateFromProps(
    nextProps: BaseTooltipWithDefaultProps,
    prevState: IBaseTooltipState,
  ): Partial<IBaseTooltipState> | null {
    const { visible } = nextProps;
    if (visible !== prevState.lastVisible) {
      return {
        keyboard: visible ? prevState.keyboard : false,
        lastVisible: visible,
        animatingIn: visible,
        animatingOut: !visible,
      };
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
  private timeout: number | null;

  constructor(props: BaseTooltipWithDefaultProps) {
    super(props);

    this.container = null;
    this.timeout = null;
    this.state = {
      keyboard: false,
      lastVisible: props.visible,
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
    const { animatingIn, animatingOut } = this.state;
    const {
      id,
      style,
      className,
      dense,
      visible,
      position,
      children,
      lineWrap,
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
          "md-tooltip--line-wrap": lineWrap,
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
    const { delay, visible, onShow } = this.props as BaseTooltipWithDefaultProps;
    if (this.timeout || !this.container || (visible && this.state.keyboard !== keyboard)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      const tooltip = document.getElementById(this.props.id);

      // when in dev mode, make sure that the container element has a relative position so that the tooltip
      // will appear "fixed" to the container element. This will have to be updated when I implement
      // tooltip portal support
      const { position } = window.getComputedStyle(this.container);
      if (tooltip && this.container.contains(tooltip) && position !== "relative") {
        // tslint:disable-next-line:no-console
        console.error((
          "A tooltip's container must have `position: relative` as a style for a tooltip to appear but its position " +
          `is: \`${position}\`. An inline style has been applied, but your container must be updated before going ` +
          "into production as this functionality will be removed. Tooltip Container: "
        ), this.container);

        this.container.style.position = "relative";
      }
    }

    this.timeout = window.setTimeout(() => {
      this.timeout = null;

      if (this.container) {
        onShow(this.container);
      }
    }, Math.max(0, delay));

    this.setState({ keyboard, animatingOut: false, animatingIn: false });
  }

  private hide = (keyboard: boolean) => {
    const { visible, onHide } = this.props;
    this.clearTimeout();
    if (visible && this.state.keyboard === keyboard) {
      onHide();
      this.setState({ animatingOut: true, animatingIn: false, keyboard: false });
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
    const { visible } = this.props;
    const { animatingIn, animatingOut } = this.state;
    if (visible === animatingIn && animatingOut) {
      this.setState({ animatingOut: false });
    } else if (visible === animatingOut && animatingIn) {
      this.setState({ animatingIn: false });
    }
  }
}
