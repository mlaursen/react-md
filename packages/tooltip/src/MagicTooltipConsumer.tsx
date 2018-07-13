import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";

import { default as Tooltip, TooltipPosition, ITooltipProps } from "./Tooltip";

export interface IMagicTooltipConsumerProps extends ITooltipProps {
  visibleId: string | null;

  vhMargin?: number;
  vwMargin?: number;

  spacing?: string | number;
  denseSpacing: string | number;

  init: (id: string) => void;
  deinit: (id: string) => void;
}

export interface IMagicTooltipConsumerDefaultProps {
  vhMargin: number;
  vwMargin: number;
  spacing: string;
  denseSpacing: string;
}

export type MagicTooltipConsumerWithDefaultProps = IMagicTooltipConsumerProps & IMagicTooltipConsumerDefaultProps;

export interface IMagicTooltipConsumerState {
  style?: React.CSSProperties;
  position: TooltipPosition;
  animatingIn: boolean;
  animatingOut: boolean;
  visible: boolean;
}

export default class MagicTooltipConsumer extends React.Component<IMagicTooltipConsumerProps, IMagicTooltipConsumerState> {
  public static propTypes = {
    viewportMargin: PropTypes.number,
  };

  public static defaultProps: IMagicTooltipConsumerDefaultProps = {
    vhMargin: 0.32,
    vwMargin: 8,
    spacing: "1.5rem",
    denseSpacing: "0.875rem",
  };

  public static getDerivedStateFromProps(nextProps: IMagicTooltipConsumerProps, prevState: IMagicTooltipConsumerState) {
    const { id, visibleId } = nextProps;
    const visible = id === visibleId;
    if (visible !== prevState.visible && !(visible ? prevState.animatingIn : prevState.animatingOut)) {
      return {
        animatingIn: visible,
        animatingOut: !visible,
      };
    }

    return null;
  }

  constructor(props: IMagicTooltipConsumerProps) {
    super(props);

    this.state = {
      style: undefined,
      position: TooltipPosition.BOTTOM,
      visible: false,
      animatingIn: false,
      animatingOut: false,
    };
  }

  public componentDidMount() {
    this.props.init(this.props.id);
  }

  public componentDidUpdate(prevProps: IMagicTooltipConsumerProps, prevState: IMagicTooltipConsumerState) {
    if (this.state.animatingIn && !prevState.animatingIn) {
      window.requestAnimationFrame(this.updatePosition);
    } else if (this.state.animatingOut && !prevState.animatingOut) {
      window.requestAnimationFrame(() => {
        this.setState({ visible: false });
      });
    }
  }

  public componentWillUnmount() {
    this.props.deinit(this.props.id);
  }

  public render() {
    const { visible, animatingIn, animatingOut, style, position } = this.state;
    const {
      className,
      init,
      deinit,
      vwMargin,
      vhMargin,
      visibleId,
      spacing,
      denseSpacing,
      ...props
    } = this.props;

    return (
      <Tooltip
        {...props}
        visible={visible}
        position={position}
        style={style}
        onTransitionEnd={this.handleTransitionEnd}
        className={cn({
          "rmd-tooltip--active": visible || animatingOut,
          "rmd-tooltip--enter": animatingIn,
          "rmd-tooltip--leave": animatingOut,
        }, "rmd-tooltip--magic", className)}
      />
    );
  }

  private getSpacing = () => {
    const { spacing, denseSpacing, dense } = this.props as MagicTooltipConsumerWithDefaultProps;
    if (dense) {
      return denseSpacing;
    }

    return spacing;
  }

  private updatePosition = () => {
    const container = document.querySelector(`[aria-describedby="${this.props.id}"]`) as HTMLElement | null;
    const tooltip = document.getElementById(this.props.id) as HTMLElement | null;
    const position = this.determineBestPosition(container, tooltip);
    const spacing = this.getSpacing();

    let horizontalSpacing;
    let verticalSpacing;
    let horizontalPosition = HorizontalPosition.CENTER;
    let verticalPosition = VerticalPosition.CENTER;
    switch (position) {
      case "left":
        horizontalPosition = HorizontalPosition.LEFT;
        horizontalSpacing = spacing;
        break;
      case "right":
        horizontalPosition = HorizontalPosition.RIGHT;
        horizontalSpacing = spacing;
        break;
      case "top":
        verticalPosition = VerticalPosition.TOP;
        verticalSpacing = spacing;
        break;
      case "bottom":
        verticalPosition = VerticalPosition.BOTTOM;
        verticalSpacing = spacing;
        break;
    }

    this.setState({
      style: positionRelativeTo(container, tooltip, {
        horizontalPosition,
        verticalPosition,
        horizontalSpacing,
        verticalSpacing,
      }),
      position,
      visible: true,
    });
  }

  private determineBestPosition = (container: HTMLElement | null, tooltip: HTMLElement | null) => {
    let position = TooltipPosition.BOTTOM;
    if (container && tooltip) {
      const { vhMargin, vwMargin } = this.props as MagicTooltipConsumerWithDefaultProps;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const { left, top, right } = container.getBoundingClientRect();
      if (top > vh - (vhMargin > 1 ? vhMargin : (vh * vhMargin))) {
        position = TooltipPosition.TOP;
      } else if (right > vw - (vwMargin > 1 ? vwMargin : (vw * vwMargin))) {
        position = TooltipPosition.LEFT;
      } else if (left < (vwMargin > 1 ? vwMargin : (vw * vwMargin))) {
        position = TooltipPosition.RIGHT;
      }
    }

    return position;
  }

  private handleTransitionEnd = () => {
    if (this.state.animatingIn || this.state.animatingOut) {
      this.setState({ animatingIn: false, animatingOut: false });
    }
  }
}
