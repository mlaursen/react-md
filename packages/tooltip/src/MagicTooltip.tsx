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
  /**
   * The spacing between the tooltip and the tooltip's container element. This should be the value
   * of `$md-tooltip-spacing` set in SCSS.
   */
  spacing?: string | number;

  /**
   * The spacing between the tooltip and the tooltip's container element when the `dense` prop is enabled.
   * This should be the value of `$md-tooltip-dense-spacing`.
   */
  denseSpacing?: string | number;

  /**
   * You might want to update the `Tooltip` so that it automatically becomes `dense` when viewing the website
   * on desktop deisplays using media queries. To help position the tooltip "automagically", this flag will need
   * to be enabled to calculate the current spacing of a tooltip.
   *
   * This is a little bit less performant than enabling the `dense` spec through props since it will need to create
   * a temporary tooltip on the page to calculate the spacing before rendering the tooltip.
   */
  isDenseBasedOnMediaQuery?: boolean;

  /**
   * This prop is to help position the `Tooltip` within the viewport based on the tooltip's container element. When this
   * value is less than `1`, it will be used as a viewport multiplier. If it is greater than `1`, it will be `x` number
   * of pixels from the edge of the viewport.
   *
   * Multiplier Example:
   * ```js
   * const viewportThreshold = 0.03;
   * const isOutOfBoundsLeft = container.left < (viewportWidth * viewportThreshold);
   * const isOutOfBoundsBottom = container.top < (viewportHeight = (viewportHeight * viewportThreshold));
   * ```
   *
   * Pixel Example:
   * ```js
   * const viewportThreshold = 20;
   * const isOutOfBoundsLeft = container.left < viewportThreshold;
   * const isOutOfBoundsBottom = container.top < (viewportHeight - viewportThreshold);
   * ```
   */
  viewportThreshold?: number;

  /**
   * To help with automation testing(like Selenium) and to make the DOM "prettier", all the tooltips will be rendere
   * within a container element instead of the default last child in the `document.body`. If an element does not exist
   * in the DOM with this id, it will be created **client side only**.
   */
  portalContainerId?: string;
}

export interface IMagicTooltipDefaultProps {
  dense: boolean;
  delay: number;
  spacing: string;
  denseSpacing: string;
  isDenseBasedOnMediaQuery: boolean;
  lineWrap: boolean;
  viewportThreshold: number;
  portalContainerId: string;
}

export type MagicTooltipWithDefaultProps = IMagicTooltipProps & IMagicTooltipDefaultProps;

export interface IMagicTooltipState {
  style: React.CSSProperties;
  visible: boolean;
  position: TooltipPositions;
}

/**
 * The `MagicTooltip` component is a helpful wrapper of the `Tooltip` component that will automagically determine
 * the "best" `position` to render the tooltip in based on the current position of the tooltip's container. In addition,
 * it will create a portal for the tooltip to be rendered in so that the tooltips will not be hidden by overflow issues.
 *
 * This will be a little bit less performant than the `Tooltip` component since it will have to do run-time calculations
 * to position, but it isn't _too_ bad. It is still preferred to use the `Tooltip` component in most cases.
 */
export default class MagicTooltip extends React.Component<IMagicTooltipProps, IMagicTooltipState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    dense: PropTypes.bool,
    lineWrap: PropTypes.bool,
  };

  public static defaultProps: IMagicTooltipDefaultProps = {
    viewportThreshold: 0.03,
    dense: false,
    delay: 0,
    spacing: "1.5rem",
    denseSpacing: "0.875",
    isDenseBasedOnMediaQuery: false,
    lineWrap: false,
    portalContainerId: "tooltip-container",
  };

  private animation: null | number;
  private portalContainer: null | HTMLElement;

  constructor(props: MagicTooltipWithDefaultProps) {
    super(props);

    this.state = {
      style: {},
      visible: false,
      position: "bottom",
    };
    this.animation = null;
    this.portalContainer = null;
  }

  public componentWillUnmount() {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
    }
  }

  public render() {
    const { id, delay, dense, lineWrap, children } = this.props as MagicTooltipWithDefaultProps;
    const { visible, position, style } = this.state;
    return (
      <Portal visible={true} render={this.portalRenderer}>
        <BaseTooltip
          id={id}
          style={style}
          position={position}
          visible={visible}
          delay={delay}
          dense={dense}
          lineWrap={lineWrap}
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
      const existing = document.getElementById(portalContainerId);
      if (!existing) {
        this.portalContainer = document.createElement("span");
        this.portalContainer.id = portalContainerId;
        document.body.appendChild(this.portalContainer);
      } else {
        this.portalContainer = existing;
      }
    }

    return this.portalContainer;
  }

  /**
   * Gets the current spacing between the tooltip and the tooltip's container. If the spacing is dependent
   * on media queries instead of enabling the `dense` prop, it will create a temporary tooltip in the DOM to
   * measure the current spacing and then remove it.
   */
  private getSpacing = (): number | string => {
    const {
      spacing,
      denseSpacing,
      dense,
      isDenseBasedOnMediaQuery,
    } = this.props as MagicTooltipWithDefaultProps;

    if (!isDenseBasedOnMediaQuery) {
      return dense ? denseSpacing : spacing;
    }

    const fakeTooltip = document.createElement("span");
    fakeTooltip.classList.add("md-tooltip");
    fakeTooltip.classList.add("md-tooltip--bottom");
    // add to dom so that the styles can be measured
    document.body.appendChild(fakeTooltip);

    const styles = window.getComputedStyle(fakeTooltip);
    document.body.removeChild(fakeTooltip);

    return styles.bottom || "";
  }

  private show = (container: HTMLElement) => {
    if (this.state.visible || this.animation !== null) {
      return;
    }

    const spacing = this.getSpacing();
    const { viewportThreshold } = this.props as MagicTooltipWithDefaultProps;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const { top, right, bottom, left, width, height } = container.getBoundingClientRect();

    // "automagically" find the "best" position for the tooltip.
    let position: TooltipPositions = "bottom";
    if (viewportThreshold >= 1) {
      if (top > (viewportHeight - viewportThreshold)) {
        position = "top";
      } else if (right > (viewportWidth - viewportThreshold)) {
        position = "left";
      } else if (left < viewportThreshold) {
        position = "right";
      }
    } else {
      if (top > (viewportHeight + (viewportHeight * viewportThreshold))) {
        position = "top";
      } else if (right > (viewportWidth - (viewportWidth * viewportThreshold))) {
        position = "left";
      } else if (left < (viewportWidth * viewportThreshold)) {
        position = "right";
      }
    }

    const style: React.CSSProperties = {
      position: "fixed",
      top: position === "bottom" ? undefined : `calc(${top}px - ${spacing})`,
      right: position === "right" ? right : undefined,
      bottom: position === "top" ? undefined : `calc(${viewportHeight - top - height}px - ${spacing})`,
      left: position === "right" ? undefined : (left + width / 2),
    };

    // To get a "smooth" animation, need to update the position and style of the tooltip, wait for
    // a full DOM re-render, and then start the animation process. It'll not animate correctly without
    // these steps and look "jagged?"
    this.setState({ position, style }, () => {
      this.animation = window.requestAnimationFrame(() => {
        this.animation = null;
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
