import * as React from "react";
import * as PropTypes from "prop-types";

import { Provider } from "./StatesContext";

export interface IStatesProviderProps {
  /**
   * Boolean if the "advanced" focus behavior should be enabled. This is really an over-engineered
   * way of making it so that elements only gain the focus state after using the keyboard. If this
   * is disabled, all elements will fallback to using the `:focus` selector instead of a conditional
   * class name.
   *
   * @docgen
   */
  advancedFocus?: boolean;

  /**
   * A list of keys that can "natively" trigger a focus focus event on a focusable element. This _should_
   * most likely stay as the default of only listening to tab key presses.
   *
   * @docgen
   */
  keyboardFocusKeys?: string[];

  /**
   * A list of keys that can trigger a "programmatic" focus event on a focusable element. This _should_ most
   * likely stay as default list of keys since it will be updated for any custom keyboard focus events from
   * the W3C spec while new components are created, but it can be updated to include or remove keys as needed.
   *
   * @docgen
   */
  programaticFocusKeys?: string[];

  /**
   * Since there are times where a user might interact with an element that will open or close
   * some temporary material, this prop is used to wait `x`ms between a keydown event and a focus
   * event to consider a focus event triggered from keyboard navigation.
   *
   * @docgen
   */
  keyboardClickTimeout?: number;

  /**
   * The children that should gain the state styles anywhere within the application. This is really
   * required so that the `StatesConsumer` can gain the appropriate context.
   *
   * @docgen
   */
  children?: React.ReactNode;
}

export interface IStatesProviderDefaultProps {
  advancedFocus: boolean;
  keyboardFocusKeys: string[];
  keyboardClickTimeout: number;
  programaticFocusKeys: string[];
}

export type StatesProviderWithDefaultProps = IStatesProviderProps & IStatesProviderDefaultProps;

export interface IStatesProviderState {
  focusTarget: HTMLElement | null;
}

export default class StatesProvider extends React.Component<IStatesProviderProps, IStatesProviderState> {
  public static propTypes = {
    advancedFocus: PropTypes.bool,
    keyboardFocusKeys: PropTypes.arrayOf(PropTypes.string),
    programaticFocusKeys: PropTypes.arrayOf(PropTypes.string),
    keyboardClickTimeout: PropTypes.number,
    children: PropTypes.node,
  };

  public static defaultProps: IStatesProviderDefaultProps = {
    advancedFocus: true,
    keyboardFocusKeys: ["Tab"],
    programaticFocusKeys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", " ", "Enter"],
    keyboardClickTimeout: 500,
  };

  /**
   * A list of elements that are considered "valid" targets for the custom keyboard focus behavior. Since
   * the main `keyup` and `keydown` events are attached on the `window` to catch some delayed focus events,
   * this is used to help filter a focus event to an element that is being watched by this component.
   */
  private targets: HTMLElement[];

  /**
   * The current timeout between keydown event and a focus event when the keydown key was one of the
   * "programmatical" keys.
   */
  private keyboardClickTimeout?: number;

  /**
   * Tracks weather the window keydown and keyup events have been attached to make sure they aren't
   * added multiple times.
   */
  private attachedKeyEvents: boolean;
  private attachedFocusEvent: boolean;

  constructor(props: IStatesProviderProps) {
    super(props);

    this.state = { focusTarget: null };
    this.targets = [];
    this.attachedKeyEvents = false;
    this.attachedFocusEvent = false;
  }

  public componentDidMount() {
    this.updateKeyboardEvents(true);
  }

  public shouldComponentUpdate(nextProps: IStatesProviderProps, nextState: IStatesProviderState) {
    return (
      this.state !== nextState ||
      this.props.children !== nextProps.children ||
      this.props.advancedFocus !== nextProps.advancedFocus
    );
  }

  public componentDidUpdate(prevProps: IStatesProviderProps) {
    const { advancedFocus } = this.props as StatesProviderWithDefaultProps;
    if (advancedFocus !== prevProps.advancedFocus) {
      this.updateKeyboardEvents(advancedFocus);

      if (!advancedFocus) {
        // reset all tracking
        this.targets = [];
      }
    }
  }

  public componentWillUnmount() {
    this.clearKeyboardTimer();
    this.updateKeyboardEvents(false);
    this.updateFocusEvent(false);
  }

  public render() {
    const { focusTarget } = this.state;
    const { children, advancedFocus } = this.props as StatesProviderWithDefaultProps;

    // don't need to enable the provider if there is no advanced focus. can just use the default context
    // instead
    if (!advancedFocus) {
      return children;
    }

    return (
      <Provider
        value={{
          advancedFocus,
          focusTarget,
          initFocusTarget: this.init,
          deinitFocusTarget: this.deinit,
          resetFocusTarget: this.reset,
        }}
      >
        {children}
      </Provider>
    );
  }

  private init = (el: HTMLElement | null) => {
    if (el && !this.isTarget(el)) {
      this.targets.push(el);
    }
  };

  private deinit = (el: HTMLElement | null) => {
    const i = el ? this.targets.indexOf(el) : -1;
    if (i !== -1) {
      this.targets.splice(i, 1);
    }
  };

  private isTarget = (target: HTMLElement) => target !== null && this.targets.indexOf(target) !== -1;

  private clearKeyboardTimer = () => {
    window.clearTimeout(this.keyboardClickTimeout);
    this.keyboardClickTimeout = undefined;
  };

  private updateKeyboardEvents = (enabled: boolean) => {
    if (!this.attachedKeyEvents && enabled) {
      window.addEventListener("keydown", this.handleKeyDown, true);
      window.addEventListener("keyup", this.handleKeyUp, true);
      this.attachedKeyEvents = true;
    } else if (this.attachedKeyEvents && !enabled) {
      window.removeEventListener("keydown", this.handleKeyDown, true);
      window.removeEventListener("keyup", this.handleKeyUp, true);
      this.attachedKeyEvents = false;
    }
  };

  private updateFocusEvent = (enabled: boolean) => {
    if (!this.attachedFocusEvent && enabled) {
      window.addEventListener("focus", this.handleFocus, true);
      this.attachedFocusEvent = true;
    } else if (this.attachedFocusEvent && !enabled) {
      window.removeEventListener("focus", this.handleFocus, true);
      this.attachedFocusEvent = false;
    }
  }

  /**
   * This is only used to determine if a manual programatic focus event should also trigger
   * the focus effect. It will normally only happen after one of the focus keys are pressed.
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    this.clearKeyboardTimer();
    const { programaticFocusKeys } = this.props as StatesProviderWithDefaultProps;
    if (!this.isTarget(e.target as HTMLElement) || programaticFocusKeys.indexOf(e.key) === -1) {
      return;
    }

    this.updateFocusEvent(true);
    this.keyboardClickTimeout = window.setTimeout(() => {
      this.keyboardClickTimeout = undefined;
      this.updateFocusEvent(false);
    }, this.props.keyboardClickTimeout);
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const focusTarget = e.target as HTMLElement;
    if (!this.isTarget(focusTarget)) {
      if (this.state.focusTarget) {
        this.setState({ focusTarget: null });
      }

      return;
    }

    const { keyboardFocusKeys } = this.props as StatesProviderWithDefaultProps;
    if (keyboardFocusKeys.indexOf(e.key) !== -1 && this.state.focusTarget !== focusTarget) {
      this.setState({ focusTarget });
    }
  };

  private handleFocus = (e: FocusEvent) => {
    if (!this.keyboardClickTimeout) {
      return;
    }

    this.clearKeyboardTimer();
    this.updateFocusEvent(false);
    const focusTarget = e.target as HTMLElement;
    if (this.isTarget(focusTarget) && this.state.focusTarget !== focusTarget) {
      this.setState({ focusTarget });
    }
  };

  private reset = (el: HTMLElement) => {
    if (this.state.focusTarget === el) {
      this.setState({ focusTarget: null });
    }
  };
}
