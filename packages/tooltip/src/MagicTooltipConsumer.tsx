import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";
import { PortalInto, Portal } from "@react-md/portal";

import { InitMagicTooltip, DeinitMagicTooltip, TooltipSpacing, IMagicTooltipProps } from "./types";
import {
  TooltipPosition,
  DEFAULT_ENTER_DURATION,
  DEFAULT_LEAVE_DURATION,
  DEFAULT_SPACING,
  DEFAULT_DENSE_SPACING,
  DEFAULT_VH_MARGIN,
  DEFAULT_VW_MARGIN,
} from "./constants";
import Tooltip from "./Tooltip";

export interface IMagicTooltipConsumerProps extends IMagicTooltipProps {
  /**
   * The current visible id for a tooltip. This should be handled automatically from the parent consumer and
   * should not be manually provided as a prop.
   */
  visibleId: string | null;

  /**
   *
   */
  initMagicTooltip: InitMagicTooltip;

  /**
   *
   */
  deinitMagicTooltip: DeinitMagicTooltip;
}

export interface IMagicTooltipConsumerDefaultProps {
  enterDuration: number;
  leaveDuration: number;
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

export default class MagicTooltipConsumer extends React.Component<
  IMagicTooltipConsumerProps,
  IMagicTooltipConsumerState
> {
  public static propTypes = {
    viewportMargin: PropTypes.number,
  };

  public static defaultProps: IMagicTooltipConsumerDefaultProps = {
    enterDuration: DEFAULT_ENTER_DURATION,
    leaveDuration: DEFAULT_LEAVE_DURATION,
    vhMargin: DEFAULT_VH_MARGIN,
    vwMargin: DEFAULT_VW_MARGIN,
    spacing: DEFAULT_SPACING,
    denseSpacing: DEFAULT_DENSE_SPACING,
  };

  public static getDerivedStateFromProps(nextProps: IMagicTooltipConsumerProps, prevState: IMagicTooltipConsumerState) {
    const { id, visibleId } = nextProps;
    const visible = id === visibleId;
    if (visible !== prevState.visible && !(visible ? prevState.animatingIn : prevState.animatingOut)) {
      return {
        visible,
        animatingIn: visible,
        animatingOut: !visible,
      };
    }

    return null;
  }

  private animationFrame?: number;
  private animateTimeout?: number;
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
    this.props.initMagicTooltip(this.props.id);
  }

  public componentDidUpdate(prevProps: IMagicTooltipConsumerProps, prevState: IMagicTooltipConsumerState) {
    const { animatingIn, animatingOut } = this.state;
    const { enterDuration, leaveDuration } = this.props as MagicTooltipConsumerWithDefaultProps;

    if (animatingIn && !prevState.animatingIn) {
      this.clear();
      this.animationFrame = window.requestAnimationFrame(this.updatePosition);
      this.animateTimeout = window.setTimeout(() => {
        this.animateTimeout = undefined;
        this.setState({ animatingIn: false });
      }, Math.max(0, enterDuration));
    } else if (animatingOut && !prevState.animatingOut) {
      this.clear();
      this.animationFrame = window.requestAnimationFrame(() => {
        this.setState({ visible: false });
      });
      this.animateTimeout = window.setTimeout(() => {
        this.animateTimeout = undefined;
        this.setState({ animatingOut: false });
      }, Math.max(0, leaveDuration));
    }
  }

  public componentWillUnmount() {
    this.clear();
    this.props.deinitMagicTooltip(this.props.id);
  }

  public render() {
    const { visible, animatingIn, animatingOut, style, position } = this.state;
    const {
      className,
      initMagicTooltip,
      deinitMagicTooltip,
      vwMargin,
      vhMargin,
      visibleId,
      spacing,
      denseSpacing,
      portalInto,
      portalIntoId,
      enterDuration,
      leaveDuration,
      ...props
    } = this.props;

    const tooltip = (
      <Tooltip
        {...props}
        visible={visible}
        position={position}
        style={style}
        className={cn(
          {
            "rmd-tooltip--active": visible || animatingIn || animatingOut,
            "rmd-tooltip--enter": animatingIn,
            "rmd-tooltip--leave": animatingOut,
          },
          "rmd-tooltip--magic",
          className
        )}
      />
    );

    if (!portalInto && !portalIntoId) {
      return tooltip;
    }

    return (
      <Portal visible={true} into={portalInto} intoId={portalIntoId}>
        {tooltip}
      </Portal>
    );
  }

  private clear = () => {
    if (this.animateTimeout) {
      window.clearTimeout(this.animateTimeout);
      this.animateTimeout = undefined;
    }

    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  };

  private getSpacing = () => {
    const { spacing, denseSpacing, dense } = this.props as MagicTooltipConsumerWithDefaultProps;
    if (dense) {
      return denseSpacing;
    }

    return spacing;
  };

  private updatePosition = () => {
    const { portalInto, portalIntoId, id } = this.props;
    const container = document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement | null;
    const tooltip = document.getElementById(id) as HTMLElement | null;
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
        isPortalFixed: !!(portalIntoId || portalInto),
      }),
      position,
      visible: true,
    });
  };

  private determineBestPosition = (container: HTMLElement | null, tooltip: HTMLElement | null) => {
    let position = TooltipPosition.BOTTOM;
    if (container && tooltip) {
      const { vhMargin, vwMargin } = this.props as MagicTooltipConsumerWithDefaultProps;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const { left, top, right } = container.getBoundingClientRect();
      if (top > vh - (vhMargin > 1 ? vhMargin : vh * vhMargin)) {
        position = TooltipPosition.TOP;
      } else if (right > vw - (vwMargin > 1 ? vwMargin : vw * vwMargin)) {
        position = TooltipPosition.LEFT;
      } else if (left < (vwMargin > 1 ? vwMargin : vw * vwMargin)) {
        position = TooltipPosition.RIGHT;
      }
    }

    return position;
  };
}
