import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

type TooltipMouseListeners = "mouseenter" | "mouseleave";

export interface ITooltipProps {
  id: string;
  visible: boolean;
  delay?: number;
  onShow: () => void;
  onHide: () => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export interface ITooltipDefaultProps {
  delay: number;
}

export type TooltipWithDefaultProps = ITooltipProps & ITooltipDefaultProps;

export interface ITooltipState {
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
  };

  public static defaultProps: ITooltipDefaultProps = {
    delay: 0,
  };

  private container: Element | null;
  private timeout: number | null;

  constructor(props: TooltipWithDefaultProps) {
    super(props);

    this.container = null;
    this.timeout = null;
    this.state = {
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
      visible,
      children,
    } = this.props;

    return (
      <span
        id={id}
        role="tooltip"
        style={style}
        className={cn("md-tooltip", {
          "md-tooltip--active": visible,
          "md-tooltip--enter": animatingIn,
          "md-tooltip--leave": animatingOut,
          "md-tooltip--visible": visible || animatingIn || animatingOut,
        }, className)}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {children}
      </span>
    );
  }

  private init = () => {
    const { id } = this.props;
    const container = document.querySelector(`[aria-describedby="${id}"]`);
    if (!container) {
      throw new Error((
        "Unable to find a valid container for your tooltip."
      ));
    }

    container.addEventListener("mouseenter", this.handleMouseEnter);
    container.addEventListener("mouseleave", this.handleMouseLeave);
    // I can't get the keyboard handlers working correctly..
    container.addEventListener("keydown", this.handleKeyDown as any);
    container.addEventListener("keyup", this.handleKeyUp as any);
    this.container = container;
  }

  private deinit = () => {
    if (!this.container) {
      return;
    }

    this.container.removeEventListener("mouseenter", this.handleMouseEnter);
    this.container.removeEventListener("mouseleave", this.handleMouseLeave);
    this.container.removeEventListener("keydown", this.handleKeyDown as any);
    this.container.removeEventListener("keyup", this.handleKeyUp as any);
  }

  private clearTimeout = () => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private show = () => {
    if (this.timeout) {
      return;
    }

    const { delay, onShow } = this.props as TooltipWithDefaultProps;
    let afterUpdate;
    if (delay <= 0) {
      afterUpdate = () => onShow();
    } else {
      this.timeout = window.setTimeout(() => {
        onShow();
        this.timeout = null;
      }, delay);
    }

    this.setState({ animatingIn: true, animatingOut: false }, afterUpdate);
  }

  private hide = () => {
    const { onHide, visible } = this.props;
    this.clearTimeout();
    if (this.props.visible) {
      this.setState({ animatingOut: true, animatingIn: false }, () => onHide());
    }
  }

  private handleMouseEnter = () => {
    this.show();
  }

  private handleMouseLeave = () => {
    this.hide();
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.hide();
    }
  }

  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "TabKey") {
      this.show();
    }
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
