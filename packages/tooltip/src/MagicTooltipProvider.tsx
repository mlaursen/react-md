import * as React from "react";
import * as PropTypes from "prop-types";
import { PortalInto } from "@react-md/portal";
import { KEYBOARD_MOVEMENT_KEYS, findSizingContainer } from "@react-md/utils";

import { Provider } from "./MagicTooltipContext";
import {
  TooltipPosition,
  DEFAULT_SHOW_DELAY,
  DEFAULT_SPACING,
  DEFAULT_DENSE_SPACING,
  DEFAULT_HOVER_MODE_DELAY,
  DEFAULT_FOCUS_KEYBOARD_DELAY,
} from "./constants";
import { IMagicTooltipContext, TooltipSpacing } from "./types";

interface IEventContainer {
  /**
   * This is the "original" tooltip container that contains the aria-describedby attribute and is used
   * for showing tooltips on focus events.
   */
  container: HTMLElement;

  /**
   * This can either be the "original" container or an item nested within the container component that is
   * used to more accurately size the mouseenter and mouseleave area. This is useful when using more complex
   * components that require focusing on a top-level element but only a small section actually gains the
   * focus state (tree items for example).
   */
  sizingContainer: HTMLElement;
}

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

  /**
   * If this prop is provided, the `MagicTooltip` children will all use this positioning instead of attempting to
   * calculate the best position within the viewport. This is helpful for when you know a section of your tooltips will
   * always be rendered "best" to the left (for example a right drawer) since the calculations might make it switch
   * between `"top"` `"left"` and `"bottom"`.
   *
   * @docgen
   */
  position?: TooltipPosition;
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

  private containers: IEventContainer[];
  private leaveContainer?: HTMLElement;
  private showTimeout?: number;
  private focusTimeout?: number;
  private hoverModeTimeout?: number;

  constructor(props: IMagicTooltipProviderProps) {
    super(props);

    this.containers = [];
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
    this.clearContainers();
    this.clearLeaveContainer();
  }

  public render() {
    const { visibleId } = this.state;
    const { dense, spacing, denseSpacing, portal, portalInto, portalIntoId, position } = this.props;

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
      position,
    } as IMagicTooltipContext;

    return <Provider value={value}>{this.props.children}</Provider>;
  }

  private clearShowTimeout = () => {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
  };

  private clearFocusTimeout = () => {
    if (this.focusTimeout) {
      window.clearTimeout(this.focusTimeout);
      this.focusTimeout = undefined;
    }
  };

  private clearHoverModeTimeout = () => {
    if (this.hoverModeTimeout) {
      window.clearTimeout(this.hoverModeTimeout);
      this.hoverModeTimeout = undefined;
    }
  };

  private clearContainers = () => {
    this.containers.forEach(({ container, sizingContainer }) => {
      if (container) {
        container.removeEventListener("mouseenter", this.handleMouseEnter);
      }

      if (sizingContainer) {
        sizingContainer.removeEventListener("mouseleave", this.handleMouseLeave);
      }
    });
    this.containers = [];
  };

  private clearLeaveContainer = () => {
    if (this.leaveContainer) {
      this.leaveContainer.removeEventListener("mouseleave", this.handleMouseLeave);
      this.leaveContainer = undefined;
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

    if (this.containers.findIndex(({ container: c }) => c === container) === -1) {
      const sizingContainer = findSizingContainer(container) as HTMLElement;
      sizingContainer.addEventListener("mouseenter", this.handleMouseEnter);

      this.containers.push({ container, sizingContainer });
    }
  };

  private deinit = (id: string) => {
    const containers: IEventContainer[] = [];
    this.containers.forEach(mouseContainer => {
      const { container, sizingContainer } = mouseContainer;
      if (container.getAttribute("aria-describedby") === id) {
        sizingContainer.removeEventListener("mouseenter", this.handleMouseEnter);
        sizingContainer.removeEventListener("mouseleave", this.handleMouseLeave);
      }
    });
  };

  private handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const { container, sizingContainer } = this.containers.find(
      mouseContainer => target === mouseContainer.sizingContainer
    ) || { container: null, sizingContainer: null };

    if (!container || !sizingContainer) {
      return;
    }

    const id = container.getAttribute("aria-describedby");
    if (id === this.state.visibleId && this.showTimeout) {
      return;
    }

    const { delay, hoverMode } = this.props as MagicTooltipProviderWithDefaultProps;
    this.clearShowTimeout();

    this.clearLeaveContainer();
    this.leaveContainer = sizingContainer;
    sizingContainer.addEventListener("mouseleave", this.handleMouseLeave);

    if (hoverMode && this.hoverModeTimeout) {
      this.setState({ visibleId: id });
    } else {
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = undefined;
        this.setState({ visibleId: id });
      }, Math.max(0, delay));
    }
  };

  private handleMouseLeave = (event: MouseEvent) => {
    this.clearShowTimeout();
    this.clearLeaveContainer();

    const target = event.target as HTMLElement;
    const { hoverMode, hoverModeDelay } = this.props as MagicTooltipProviderWithDefaultProps;
    this.clearHoverModeTimeout();
    if (hoverMode) {
      this.hoverModeTimeout = window.setTimeout(() => {
        this.hoverModeTimeout = undefined;
      }, Math.max(0, hoverModeDelay));
    }

    if (this.state.visibleId) {
      this.setState({ visibleId: null });
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const { keyboardFocusDelay, keyboardMovementKeys } = this.props as MagicTooltipProviderWithDefaultProps;
    if (event.key === "Escape") {
      this.clearHoverModeTimeout();
      if (this.state.visibleId) {
        this.setState({ visibleId: null });
      }

      return;
    }

    if (keyboardMovementKeys.indexOf(event.key) !== -1) {
      this.clearFocusTimeout();

      this.focusTimeout = window.setTimeout(() => {
        this.focusTimeout = undefined;
      }, Math.max(0, keyboardFocusDelay));

      if (this.state.visibleId) {
        this.setState({ visibleId: null });
      }
    }
  };

  private handleFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (this.containers.findIndex(({ container }) => container === target) === -1) {
      this.clearFocusTimeout();
      return;
    }

    const id = target.getAttribute("aria-describedby");
    if (this.focusTimeout && this.state.visibleId !== id) {
      const { delay } = this.props as MagicTooltipProviderWithDefaultProps;
      this.clearShowTimeout();
      this.showTimeout = window.setTimeout(() => {
        this.showTimeout = undefined;
        this.setState({ visibleId: id });
      }, Math.max(0, delay));
    }
  };

  private handleBlur = (event: FocusEvent) => {
    this.clearShowTimeout();
    if (this.containers.findIndex(({ container }) => container === event.target) === -1) {
      return;
    }

    if (this.state.visibleId) {
      this.clearFocusTimeout();
      this.setState({ visibleId: null });
    }
  };
}
