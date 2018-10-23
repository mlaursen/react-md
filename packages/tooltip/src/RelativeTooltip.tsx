import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

import {
  TooltipPosition,
  DEFAULT_ENTER_DURATION,
  DEFAULT_LEAVE_DURATION,
  DEFAULT_SHOW_DELAY,
  DEFAULT_POSITION,
} from "./constants";
import { default as Tooltip, ITooltipProps, ITooltipDefaultProps } from "./Tooltip";

export interface IRelativeTooltipProps extends ITooltipProps {
  /**
   * An optional delay before showing the tooltip when the user focuses or moves the mouse into the tooltip's container.
   */
  delay?: number;

  /**
   * The enter duration in milliseconds for the tooltip to fully animate into view. This should match whatever value is
   * set for `$rmd-tooltip-enter-duration`. A manual timeout is used instead of `onTransitionEnd` to handle cancel
   * animations easier.
   */
  enterDuration?: number;

  /**
   * The leave duration in milliseconds for the tooltip to fully animate into view. This should match whatever value is
   * set for `$rmd-tooltip-leave-duration`. A manual timeout is used instead of `onTransitionEnd` to handle cancel
   * animations easier.
   */
  leaveDuration?: number;
}

export interface IRelativeTooltipDefaultProps extends ITooltipDefaultProps {
  delay: number;
  enterDuration: number;
  leaveDuration: number;
}

export type RelativeTooltipWithDefaultProps = IRelativeTooltipProps & IRelativeTooltipDefaultProps;

export interface IRelativeTooltipState {
  keyboard: boolean;
  animatingIn: boolean;
  animatingOut: boolean;
  visible: boolean;
}

export default class RelativeTooltip extends React.Component<
  IRelativeTooltipProps,
  IRelativeTooltipState
> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    dense: PropTypes.bool,
    position: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  };

  public static defaultProps: IRelativeTooltipDefaultProps = {
    delay: DEFAULT_SHOW_DELAY,
    enterDuration: DEFAULT_ENTER_DURATION,
    leaveDuration: DEFAULT_LEAVE_DURATION,
    dense: false,
    position: DEFAULT_POSITION,
    lineWrap: false,
  };

  /**
   * The tooltip's container element. This should be a focusable element so that keyboard users will be able
   * to view the tooltip when focusing the element.
   */
  private container: HTMLElement | null;

  /**
   * This is an animation frame that is used for the enter and leave transitions.
   */
  private frame?: number;

  /**
   * The current timeout for showing the tooltip if there is a delay.
   */
  private timeout?: number;
  private transitionTimeout?: number;

  constructor(props: RelativeTooltipWithDefaultProps) {
    super(props);

    this.container = null;
    this.state = {
      keyboard: false,
      animatingIn: false,
      animatingOut: false,
      visible: false,
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
    const { children, className, enterDuration, leaveDuration, delay, ...props } = this
      .props as RelativeTooltipWithDefaultProps;

    return (
      <Tooltip
        {...props}
        className={cn(
          {
            "rmd-tooltip--active": visible || animatingIn || animatingOut,
            "rmd-tooltip--enter": animatingIn,
            "rmd-tooltip--leave": animatingOut,
          },
          className
        )}
        visible={visible}
      >
        {children}
      </Tooltip>
    );
  }

  /**
   * Initializes the tooltip by attempting to find its container element and then attaching the event listeners
   * for showing and hiding the tooltip.
   */
  private init = () => {
    const { id } = this.props;
    const container = document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement;
    if (!container) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          'A tooltip\'s container must have the attribute `aria-describedby="TOOLTIP_ID"` for accessibility ' +
            `but none were found for a tooltip with id: \`${id}\``
        );
      }

      this.container = null;
      return;
    }

    container.addEventListener("mouseenter", this.handleMouseEnter);
    container.addEventListener("mouseleave", this.handleMouseLeave);
    container.addEventListener("keydown", this.handleKeyDown);
    container.addEventListener("keyup", this.handleKeyUp);
    container.addEventListener("blur", this.handleBlur);
    this.container = container;
  };

  /**
   * This is normally just called when the component unmounts. It will remove all the event listeners
   * from the container element if it exists.
   */
  private deinit = () => {
    if (!this.container) {
      return;
    }

    this.clear();
    this.container.removeEventListener("mouseenter", this.handleMouseEnter);
    this.container.removeEventListener("mouseleave", this.handleMouseLeave);
    this.container.removeEventListener("keydown", this.handleKeyDown);
    this.container.removeEventListener("keyup", this.handleKeyUp);
    this.container.removeEventListener("blur", this.handleBlur);
  };

  private clear = () => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }

    if (this.transitionTimeout) {
      window.clearTimeout(this.transitionTimeout);
      this.transitionTimeout = undefined;
    }
  };

  /**
   * This will conditionally show the tooltip from one of the container's event listeners. If there is a delay, it
   * will create a timeout for the delay duration and then start showing the tooltip. If there is no delay, the tooltip
   * will immediately be shown.
   */
  private show = (keyboard: boolean) => {
    const { delay } = this.props as RelativeTooltipWithDefaultProps;
    const { visible } = this.state;
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
        console.error(
          "A tooltip's container must have `position: relative` as a style for a tooltip to appear but its position " +
            `is: \`${position}\`. An inline style has been applied, but your container must be updated before going ` +
            "into production as this functionality will be removed. Tooltip Container: ",
          this.container
        );

        this.container.style.position = "relative";
      }
    }

    this.timeout = window.setTimeout(() => {
      this.timeout = undefined;
      this.animateIn();
    }, Math.max(0, delay));

    if (this.state.keyboard !== keyboard || this.state.animatingOut || this.state.animatingIn) {
      this.setState({ keyboard, animatingOut: false, animatingIn: false });
    }
  };

  private animateIn = () => {
    const { enterDuration } = this.props as RelativeTooltipWithDefaultProps;
    this.setState({ animatingIn: true });
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      this.setState({ visible: true });

      this.transitionTimeout = window.setTimeout(() => {
        this.transitionTimeout = undefined;
        this.setState({ animatingIn: false });
      }, Math.max(0, enterDuration));
    });
  };

  private hide = (keyboard: boolean) => {
    const { visible } = this.state;
    const { leaveDuration } = this.props as RelativeTooltipWithDefaultProps;
    this.clear();
    if (visible && this.state.keyboard === keyboard) {
      this.transitionTimeout = window.setTimeout(() => {
        this.transitionTimeout = undefined;
        this.setState({ animatingOut: false });
      }, Math.max(0, leaveDuration));
      this.setState({
        animatingOut: true,
        animatingIn: false,
        keyboard: false,
        visible: false,
      });
    } else if (this.state.animatingIn) {
      this.setState({ animatingIn: false });
    }
  };

  private handleMouseEnter = () => {
    this.show(false);
  };

  private handleMouseLeave = () => {
    this.hide(false);
  };

  /**
   * This is way to capture focus events on the tooltip's container element. When the container is
   * focused by keyboard navigation, the tooltip should be shown.
   */
  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      this.show(true);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      // always hide the tooltip immediately if escape is pressed
      this.hide(this.state.keyboard);
    }
  };

  private handleBlur = () => {
    this.hide(true);
  };
}
