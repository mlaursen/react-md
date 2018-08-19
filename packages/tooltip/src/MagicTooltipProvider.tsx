import * as React from "react";
import * as PropTypes from "prop-types";
import { PortalInto } from "@react-md/portal";
import { KEYBOARD_MOVEMENT_KEYS } from "@react-md/utils";

import { Provider } from "./MagicTooltipContext";
import {
  DEFAULT_SHOW_DELAY,
  DEFAULT_SPACING,
  DEFAULT_DENSE_SPACING,
  DEFAULT_HOVER_MODE_DELAY,
  DEFAULT_FOCUS_KEYBOARD_DELAY,
} from "./constants";
import { IMagicTooltipContext, TooltipSpacing } from "./types";

export interface IMagicTooltipProviderProps {
  /**
   * Boolean if the tooltip's dense spec should be applied to each `MagicTooltip` that appears as a child.
   *
   * @docgen
   */
  dense?: boolean;

  /**
   * The amount of spacing between the tooltip's container element and the tooltip. This should be the value
   * of `$rmd-tooltip-spacing` variable so if you haven't changed the default value, do not change this value.
   *
   * @docgen
   */
  spacing?: TooltipSpacing;

  /**
   * The amount of spacing between the tooltip's container element and the tooltip when `dense`. This should be
   * the value of `$rmd-tooltip-dense-spacing` variable so if you haven't changed the default value, do not
   * change this value.
   *
   * @docgen
   */
  denseSpacing?: TooltipSpacing;

  /**
   * The amount of time to wait before showing each tooltip if the `hoverMode` prop is disabled. If the `hoverMode`
   * prop is enabled, it will be the delay before showing the first tooltip. Each tooltip afterwards will be shown
   * immediately.
   *
   * @docgen
   */
  delay?: number;

  /**
   * Boolean if the hover mode should be enabled. This will kind of mimic how browser title tooltips work so that
   * after viewing a tooltip once with the mouse, all other tooltips will be shown immediately if the user mouses
   * over another element that has a tooltip. The hover mode will be disabled once no tooltip container elements
   * are moused over for the `hoverModeDelay` amount.
   *
   * @docgen
   */
  hoverMode?: boolean;

  /**
   * The amount of time to wait before ending the `hoverMode` for tooltips when the user mouses away from all tooltip
   * container elements.
   *
   * @docgen
   */
  hoverModeDelay?: number;

  /**
   * The amount of delay between a keydown event an a focus event on the page. If a focus event happen during the time
   * of this delay and a previous keypress was a "movement" key, the keyboard mode of tooltips will be enabled and
   * show a tooltip after the specified `delay`.
   *
   * @docgen
   */
  keyboardFocusDelay?: number;

  /**
   * The keydown event's key names to consider keyboard "movement" keys. The default value _should_ be good enough for
   * most cases.
   *
   * @docgen
   */
  keyboardMovementKeys?: string[];

  /**
   * Boolean if every `MagicTooltip` children use the portal component and render in the `document.body`. Each
   * `MagicTooltip` can override this behavior if needed by setting their own prop of `portalInto` of `null` or their
   * own `portalInto` value.
   *
   * @docgen
   */
  portal?: boolean;

  /**
   * If this prop is provided, it will make all `MagicTooltip` children use the portal component and render inside this
   * element. Each `MagicTooltip` can override this behavior if needed by setting their own prop of `portalInto` of
   * `null` or their own `portalInto` value.
   *
   * @docgen
   */
  portalInto?: PortalInto;

  /**
   * If this prop is provided, it will make all `MagicTooltip` children use the portal component and render inside the
   * element found with this id. Each `MagicTooltip` can override this behavior if needed by setting their own prop of
   * `portalIntoId` of `null` or their own `portalIntoId` value.
   *
   * @docgen
   */
  portalIntoId?: string;

  /**
   * The `MagicTooltipProvider` should _normally_ be one of the top-most components in your react render, so the
   * children for this will be any elements that contain a `MagicTooltip` component.
   *
   * @docgen
   */
  children?: React.ReactNode;
}

export interface IMagicTooltipProviderDefaultProps {
  dense: boolean;
  portal: boolean;
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
    dense: PropTypes.bool,
    delay: PropTypes.number,
    portal: PropTypes.bool,
    portalInto: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.instanceOf(HTMLElement)]),
    portalIntoId: PropTypes.string,
    hoverMode: PropTypes.bool,
    hoverModeDelay: PropTypes.number,
    keyboardFocusDelay: PropTypes.number,
    keyboardMovementKeys: PropTypes.arrayOf(PropTypes.string),
  };

  public static defaultProps: IMagicTooltipProviderDefaultProps = {
    dense: false,
    portal: false,
    spacing: DEFAULT_SPACING,
    denseSpacing: DEFAULT_DENSE_SPACING,
    delay: DEFAULT_SHOW_DELAY,
    hoverMode: true,
    hoverModeDelay: DEFAULT_HOVER_MODE_DELAY,
    keyboardFocusDelay: DEFAULT_FOCUS_KEYBOARD_DELAY,
    keyboardMovementKeys: KEYBOARD_MOVEMENT_KEYS,
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
    const { dense, spacing, denseSpacing, portal, portalInto, portalIntoId } = this.props;

    const value = {
      dense,
      spacing,
      denseSpacing,
      visibleId,
      initMagicTooltip: this.init,
      deinitMagicTooltip: this.deinit,
      portal,
      portalInto,
      portalIntoId,
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
    if (e.key === "Escape") {
      this.clearHoverModeTimeout();
      if (this.state.visibleId) {
        this.setState({ visibleId: null });
      }

      return;
    }

    if (keyboardMovementKeys.indexOf(e.key) !== -1) {
      this.clearFocusTimeout();

      this.focusTimeout = window.setTimeout(() => {
        this.focusTimeout = null;
      }, Math.max(0, keyboardFocusDelay));
    }
  };

  private handleFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (this.containers.indexOf(target) === -1) {
      this.clearFocusTimeout();
      return;
    }

    const id = target.getAttribute("aria-describedby");
    if (this.focusTimeout && this.state.visibleId !== id) {
      const { delay } = this.props as MagicTooltipProviderWithDefaultProps;
      this.clearShowTimeout();
      this.clearFocusTimeout();
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = null;
        this.setState({ visibleId: id });
      }, Math.max(0, delay));
    }
  };

  private handleBlur = (event: FocusEvent) => {
    if (this.containers.indexOf(event.target as HTMLElement) === -1) {
      return;
    }

    this.clearFocusTimeout();
    if (this.state.visibleId) {
      this.setState({ visibleId: null });
    }
  };
}
