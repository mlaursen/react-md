import * as React from "react";
import * as PropTypes from "prop-types";

import { Provider, IMagicTooltipContext } from "./MagicTooltipContext";

export interface IMagicTooltipProviderProps {
  /**
   * Boolean if the tooltip's dense spec should be applied to each `MagicTooltip` that appears as a child.
   */
  dense?: boolean;

  /**
   * The amount of spacing between the tooltip's container element and the tooltip. This should be the value
   * of `$rmd-tooltip-spacing` variable so if you haven't changed the default value, do not change this value.
   */
  spacing?: string | number;

  /**
   * The amount of spacing between the tooltip's container element and the tooltip when `dense`. This should be
   * the value of `$rmd-tooltip-dense-spacing` variable so if you haven't changed the default value, do not
   * change this value.
   */
  denseSpacing?: string | number;

  /**
   * The amount of time to wait before showing each tooltip if the `hoverMode` prop is disabled. If the `hoverMode`
   * prop is enabled, it will be the delay before showing the first tooltip. Each tooltip afterwards will be shown
   * immediately.
   */
  delay?: number;

  /**
   * Boolean if the hover mode should be enabled. This will kind of mimic how browser title tooltips work so that
   * after viewing a tooltip once with the mouse, all other tooltips will be shown immediately if the user mouses
   * over another element that has a tooltip. The hover mode will be disabled once no tooltip container elements
   * are moused over for the `hoverModeDelay` amount.
   */
  hoverMode?: boolean;

  /**
   * The amount of time to wait before ending the `hoverMode` for tooltips when the user mouses away from all tooltip
   * container elements.
   */
  hoverModeDelay?: number;

  /**
   * The amount of delay between a keydown event an a focus event on the page. If a focus event happen during the time
   * of this delay and a previous keypress was a "movement" key, the keyboard mode of tooltips will be enabled and
   * show a tooltip after the specified `delay`.
   */
  keyboardFocusDelay?: number;

  /**
   * The keydown event's key names to consider keyboard "movement" keys. The default value _should_ be good enough for
   * most cases.
   */
  keyboardMovementKeys?: string[];

  /**
   * The `MagicTooltipProvider` should _normally_ be one of the top-most components in your react render, so the
   * children for this will be any elements that contain a `MagicTooltip` component.
   */
  children?: React.ReactNode;
}

export interface IMagicTooltipProviderDefaultProps {
  dense: boolean;
  spacing: string;
  denseSpacing: string;
  delay: number;
  hoverMode: boolean;
  hoverModeDelay: number;
  keyboardFocusDelay: number;
  keyboardMovementKeys: string[];
}

export type MagicTooltipProviderWithDefaultProps = IMagicTooltipProviderProps & IMagicTooltipProviderDefaultProps;

export interface IMagicTooltipProviderState {
  visibleId: null | string;
}

export default class MagicTooltipProvider extends React.Component<IMagicTooltipProviderProps, any> {
  public static propTypes = {
    delay: PropTypes.number,
    hoverMode: PropTypes.bool,
    hoverModeDelay: PropTypes.number,
  };

  public static defaultProps: IMagicTooltipProviderDefaultProps = {
    dense: false,
    spacing: "1.5rem",
    denseSpacing: "0.875rem",
    delay: 500,
    hoverMode: true,
    hoverModeDelay: 1000,
    keyboardFocusDelay: 300,
    keyboardMovementKeys: ["Home", "End", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"],
  };

  private containers: HTMLElement[];
  private showTimeout: number | null;
  private focusTimeout: number | null;
  private hoverModeTimeout: number | null;

  constructor(props: IMagicTooltipProviderProps) {
    super(props);

    this.containers = [];
    this.showTimeout = null;
    this.focusTimeout = null;
    this.hoverModeTimeout = null;
    this.state = {
      visibleId: null,
    };
  }

  public shouldComponentUpdate(nextProps: MagicTooltipProviderWithDefaultProps, nextState: IMagicTooltipProviderState) {
    return (
      this.state.visibleId !== nextState.visibleId ||
      this.props.children !== nextProps.children ||
      this.props.dense !== nextProps.dense ||
      this.props.spacing !== nextProps.spacing ||
      this.props.denseSpacing !== nextProps.denseSpacing
    );
  }

  public componentDidMount() {
    window.addEventListener("blur", this.handleBlur, true);
    window.addEventListener("focus", this.handleFocus, true);
    window.addEventListener("keydown", this.handleKeyDown, true);
  }

  public componentWillUnmount() {
    this.clearShowTimeout();
    this.clearFocusTimeout();
    this.clearHoverModeTimeout();
    window.removeEventListener("blur", this.handleBlur, true);
    window.removeEventListener("focus", this.handleFocus, true);
    window.removeEventListener("keydown", this.handleKeyDown, true);
    this.containers.forEach(container => {
      if (container) {
        container.removeEventListener("mouseenter", this.handleMouseEnter);
        container.removeEventListener("mouseleave", this.handleMouseLeave);
      }
    });
  }

  public render() {
    const { visibleId } = this.state;
    const { dense, spacing, denseSpacing } = this.props;

    const value = {
      dense,
      spacing,
      denseSpacing,
      visibleId,
      init: this.init,
      deinit: this.deinit,
    } as IMagicTooltipContext;

    return <Provider value={value}>{this.props.children}</Provider>;
  }

  private clearShowTimeout = () => {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  };

  private clearFocusTimeout = () => {
    if (this.focusTimeout) {
      window.clearTimeout(this.focusTimeout);
      this.focusTimeout = null;
    }
  };

  private clearHoverModeTimeout = () => {
    if (this.hoverModeTimeout) {
      window.clearTimeout(this.hoverModeTimeout);
      this.hoverModeTimeout = null;
    }
  };

  private init = (id: string) => {
    const container: null | HTMLElement = document.querySelector(`[aria-describedby="${id}"]`);
    if (!container) {
      throw new Error(
        'A tooltip\'s container must have the attribute `aria-describedby="TOOLTIP_ID"` for accessibility ' +
          `but none were found for a tooltip with id: \`${id}\``
      );
    }

    if (this.containers.indexOf(container) === -1) {
      container.addEventListener("mouseenter", this.handleMouseEnter);
      container.addEventListener("mouseleave", this.handleMouseLeave);
      this.containers.push(container);
    }
  };

  private deinit = (id: string) => {
    const containers: HTMLElement[] = [];
    this.containers.forEach(container => {
      if (container.getAttribute("aria-describedby") === id) {
        container.removeEventListener("mouseenter", this.handleMouseEnter);
        container.removeEventListener("mouseleave", this.handleMouseLeave);
      } else {
        containers.push(container);
      }
    });

    this.containers = containers;
  };

  private handleMouseEnter = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const id = e.target.getAttribute("aria-describedby");
    if (id === this.state.visibleId && this.showTimeout) {
      return;
    }

    const { delay, hoverMode } = this.props as MagicTooltipProviderWithDefaultProps;
    this.clearShowTimeout();

    if (hoverMode && this.hoverModeTimeout) {
      this.setState({ visibleId: id });
    } else {
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = null;
        this.setState({ visibleId: id });
      }, Math.max(0, delay));
    }
  };

  private handleMouseLeave = (e: MouseEvent) => {
    this.clearShowTimeout();
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const id = e.target.getAttribute("aria-describedby");
    if (id !== this.state.visibleId) {
      return;
    }
    const { hoverMode, hoverModeDelay } = this.props as MagicTooltipProviderWithDefaultProps;
    this.clearHoverModeTimeout();
    if (hoverMode) {
      this.hoverModeTimeout = window.setTimeout(() => {
        this.hoverModeTimeout = null;
      }, Math.max(0, hoverModeDelay));
    }

    this.setState({ visibleId: null });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const { keyboardFocusDelay, keyboardMovementKeys } = this.props as MagicTooltipProviderWithDefaultProps;
    if (e.key === "Escape" && this.state.visibleId) {
      this.clearHoverModeTimeout();
      this.setState({ visibleId: null });
    }

    if (keyboardMovementKeys.indexOf(e.key) !== -1) {
      this.clearFocusTimeout();

      this.focusTimeout = window.setTimeout(() => {
        this.focusTimeout = null;
      }, Math.max(0, keyboardFocusDelay));
    }
  };

  private handleFocus = (e: FocusEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) {
      this.clearFocusTimeout();
      return;
    }

    const id = target.getAttribute("aria-describedby");
    if (this.focusTimeout && this.state.visibleId !== id && this.containers.indexOf(target) !== -1) {
      const { delay } = this.props as MagicTooltipProviderWithDefaultProps;
      this.clearShowTimeout();
      this.clearFocusTimeout();
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = null;
        this.setState({ visibleId: id });
      }, Math.max(0, delay));
    }
  };

  private handleBlur = (e: FocusEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) {
      this.clearFocusTimeout();
      return;
    }

    if (this.containers.indexOf(target) !== -1 && this.state.visibleId) {
      this.setState({ visibleId: null });
    }
  };
}
