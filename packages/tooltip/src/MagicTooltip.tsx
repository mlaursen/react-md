import * as React from "react";
import * as PropTypes from "prop-types";
import { Portal } from "@react-md/portal";

import {
  default as BaseTooltip,
  ITooltipProps,
  TooltipPositions,
  IBaseTooltipDefaultProps,
  BaseTooltipWithDefaultProps,
} from "./BaseTooltip";

export interface IMagicTooltipProps extends ITooltipProps {
  threshold?: number;
  portalContainerId?: string;
}

export interface IMagicTooltipDefaultProps extends IBaseTooltipDefaultProps {
  threshold: number;
  portalContainerId: string;
}

export type MagicTooltipWithDefaultProps = IMagicTooltipProps & IMagicTooltipDefaultProps;

export interface IMagicTooltipState {
  style: React.CSSProperties;
  visible: boolean;
  position: TooltipPositions;
}

export default class MagicTooltip extends React.Component<IMagicTooltipProps, IMagicTooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
  };

  public static defaultProps: IMagicTooltipDefaultProps = {
    threshold: 0.03,
    dense: false,
    delay: 0,
    position: "bottom",
    lineWrap: false,
    portalContainerId: "tooltip-container",
  };

  private portalContainer: null | HTMLElement;

  constructor(props: MagicTooltipWithDefaultProps) {
    super(props);

    this.state = {
      style: {},
      visible: false,
      position: "bottom",
    };
    this.portalContainer = null;
  }

  public render() {
    const { id, children } = this.props as MagicTooltipWithDefaultProps;
    const { visible, position, style } = this.state;
    return (
      <Portal visible={true} render={this.portalRenderer}>
        <BaseTooltip
          id={id}
          style={style}
          position={position}
          visible={visible}
          onShow={this.show}
          onHide={this.hide}
        >
          {children}
        </BaseTooltip>
      </Portal>
    );
  }

  private portalRenderer = () => {
    if (!this.portalContainer && typeof document !== "undefined") {
      const { portalContainerId } = this.props as MagicTooltipWithDefaultProps;

      this.portalContainer = document.createElement("span");
      this.portalContainer.id = portalContainerId;
      document.body.appendChild(this.portalContainer);
    }

    return this.portalContainer;
  }

  private show = (container: HTMLElement) => {
    if (this.state.visible) {
      return;
    }

    const { threshold } = this.props as MagicTooltipWithDefaultProps;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const { top, right, bottom, left, width, height } = container.getBoundingClientRect();
    let position: TooltipPositions = "bottom";
    if (bottom > (viewportHeight + (viewportHeight * threshold))) {
      position = "top";
    } else if (right > (viewportWidth - (viewportWidth * threshold))) {
      position = "left";
    } else if (left < (viewportWidth * threshold)) {
      position = "right";
    }

    const style: React.CSSProperties = {
      position: "fixed",
      top: position === "bottom" ? undefined : `calc(${top}px - 1.5rem)`,
      right: position === "right" ? right : undefined,
      bottom: position === "top" ? undefined : `calc(${viewportHeight - top - height}px - 1.5rem)`,
      left: position === "right" ? undefined : (left + width / 2),
    };

    // To get a "smooth" animation, need to update the position and style of the tooltip, wait for
    // a full DOM re-render, and then start the animation process. It'll not animate correctly without
    // these steps and look "jagged?"
    this.setState({ position, style }, () => {
      window.requestAnimationFrame(() => {
        this.setState({ visible: true });
      });
    });
  }

  private hide = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }
}
