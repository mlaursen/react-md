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

  /**
   * Boolean if any "printable" key should also be able to trigger a focus event. This should be disabled
   * to help increase performance so that every key the user presses does not attempt to update the entire
   * app's focus. Instead, the small section within your app (like listboxes or menus) should create a new
   * `StatesProvider` with this boolean enabled so only that small section has the advanced logic.
   */
  isPrintableKeysFocusable?: boolean;
}

export interface IStatesProviderDefaultProps {
  advancedFocus: boolean;
  keyboardClickTimeout: number;
  programaticFocusKeys: string[];
  isPrintableKeysFocusable: boolean;
}

export type StatesProviderWithDefaultProps = IStatesProviderProps & IStatesProviderDefaultProps;

export interface IStatesProviderState {
  focusTarget: HTMLElement | null;
}

export default class StatesProvider extends React.Component<IStatesProviderProps, IStatesProviderState> {
  public static propTypes = {
    advancedFocus: PropTypes.bool,
    programaticFocusKeys: PropTypes.arrayOf(PropTypes.string),
    keyboardClickTimeout: PropTypes.number,
    isPrintableKeysFocusable: PropTypes.bool,
    children: PropTypes.node,
  };

  public static defaultProps: IStatesProviderDefaultProps = {
    advancedFocus: true,
    programaticFocusKeys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", " ", "Enter", "Tab"],
    keyboardClickTimeout: 500,
    isPrintableKeysFocusable: false,
  };

  /**
   * A list of elements that are considered "valid" targets for the custom keyboard focus behavior. Since
   * the main `keydown` event is attached on the `window` to catch some delayed focus events, this is used
   * to help filter a focus event to an element that is being watched by this component.
   */
  private targets: Set<HTMLElement>;

  /**
   * The current timeout between keydown event and a focus event when the keydown key was one of the
   * "programmatical" keys.
   */
  private keyboardClickTimeout?: number;

  /**
   * Tracks weather the window keydown event has been attached to make sure they aren't
   * added multiple times.
   */
  private attachedKeyEvents: boolean;
  private attachedFocusEvent: boolean;
  private attachedBlurEvents: boolean;

  constructor(props: IStatesProviderProps) {
    super(props);

    this.state = { focusTarget: null };
    this.targets = new Set();
    this.attachedKeyEvents = false;
    this.attachedFocusEvent = false;
    this.attachedBlurEvents = false;
  }

  public componentDidMount() {
    this.updateKeyboardEvents((this.props as StatesProviderWithDefaultProps).advancedFocus);
  }

  public shouldComponentUpdate(nextProps: IStatesProviderProps, nextState: IStatesProviderState) {
    return (
      this.state.focusTarget !== nextState.focusTarget ||
      this.props.children !== nextProps.children ||
      this.props.advancedFocus !== nextProps.advancedFocus
    );
  }

  public componentDidUpdate(prevProps: IStatesProviderProps, prevState: IStatesProviderState) {
    const { advancedFocus } = this.props as StatesProviderWithDefaultProps;
    if (advancedFocus !== prevProps.advancedFocus) {
      this.updateKeyboardEvents(advancedFocus);

      if (!advancedFocus) {
        // reset all tracking
        this.targets = new Set();
      }
    }

    const isFocused = this.state.focusTarget !== null;
    if (isFocused !== (prevState.focusTarget !== null)) {
      // blur events should only be added while there is a valid focus target.
      this.updateBlurEvents(isFocused);
    }
  }

  public componentWillUnmount() {
    this.clearKeyboardTimer();
    this.updateKeyboardEvents(false);
    this.updateFocusEvent(false);
    this.updateBlurEvents(false);
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
        }}
      >
        {children}
      </Provider>
    );
  }

  private init = (el: HTMLElement | null) => {
    if (el) {
      this.targets.add(el);
    }
  };

  private deinit = (el: HTMLElement | null) => {
    if (el) {
      this.targets.delete(el);
    }
  };

  private clearKeyboardTimer = () => {
    window.clearTimeout(this.keyboardClickTimeout);
    this.keyboardClickTimeout = undefined;
  };

  /**
   * "Lazyily" attaches or removes the keyboard event listeners required to trigging tab focus
   * or programmatic focus. These events shoudl always be attached when the `advancedFocus` prop
   * is enabled to conditionally add the focus class name to the focus target.
   */
  private updateKeyboardEvents = (enabled: boolean) => {
    if (!this.attachedKeyEvents && enabled) {
      window.addEventListener("keydown", this.handleKeyDown, true);
      this.attachedKeyEvents = true;
    } else if (this.attachedKeyEvents && !enabled) {
      window.removeEventListener("keydown", this.handleKeyDown, true);
      this.attachedKeyEvents = false;
    }
  };

  /**
   * "Lazily" attaches or removes the focus event required to handling programmatic focus. This should
   * only be enabled when a keydown event key is considered a programmatic focus key.
   */
  private updateFocusEvent = (enabled: boolean) => {
    if (!this.attachedFocusEvent && enabled) {
      window.addEventListener("focus", this.handleFocus, true);
      this.attachedFocusEvent = true;
    } else if (this.attachedFocusEvent && !enabled) {
      window.removeEventListener("focus", this.handleFocus, true);
      this.attachedFocusEvent = false;
    }
  };

  /**
   * "Lazily" attaches or removes the "reset" or blur events required for blurring a focus target.
   * These events need to be attached to the window instead of the focus target since it doesn't
   * work as nicely when handling programmatic focus.
   *
   * The blur listener is added to handle cases where the entire browser window or tab loses focus by
   * tabbing out or clicking another window/OS program. The mousedown listener is added to stop the
   * "keyboard focus mode" when the user clicks the element that has already gained focus.
   */
  private updateBlurEvents = (enabled: boolean) => {
    if (!this.attachedBlurEvents && enabled) {
      window.addEventListener("blur", this.reset, true);
      window.addEventListener("mousedown", this.reset, true);
      this.attachedBlurEvents = true;
    } else if (this.attachedBlurEvents && !enabled) {
      window.removeEventListener("blur", this.reset, true);
      window.removeEventListener("mousedown", this.reset, true);
      this.attachedBlurEvents = false;
    }
  };

  /**
   * @see https://stackoverflow.com/a/12467610
   */
  private isProgrammaticallyFocusable = (event: KeyboardEvent) => {
    const code = event.which || event.keyCode;
    return (
      (code > 47 && code < 58) ||
      (code > 64 && code < 91) ||
      (code > 95 && code < 112) ||
      (code > 185 && code < 192) ||
      (code > 218 && code < 223)
    );
  };

  /**
   * This is only used to determine if a manual programatic focus event should also trigger
   * the focus effect. It will normally only happen after one of the focus keys are pressed.
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    this.clearKeyboardTimer();
    const { programaticFocusKeys, isPrintableKeysFocusable } = this.props as StatesProviderWithDefaultProps;
    if (
      programaticFocusKeys.indexOf(event.key) === -1 &&
      (!isPrintableKeysFocusable || !this.isProgrammaticallyFocusable(event))
    ) {
      return;
    }

    this.updateFocusEvent(true);
    this.keyboardClickTimeout = window.setTimeout(() => {
      this.keyboardClickTimeout = undefined;
      this.updateFocusEvent(false);
    }, this.props.keyboardClickTimeout);
  };

  private handleFocus = (e: FocusEvent) => {
    if (!this.keyboardClickTimeout) {
      return;
    }

    this.clearKeyboardTimer();
    this.updateFocusEvent(false);
    const focusTarget = e.target as HTMLElement;
    if (!this.targets.has(focusTarget)) {
      return;
    }

    if (this.targets.has(focusTarget) && this.state.focusTarget !== focusTarget) {
      this.setState({ focusTarget });
    }
  };

  /**
   * Resets the focus target to null. This should really only be triggered after programmaticly
   * focusing elements and then clicking somewhere on the page or blurring the page.
   */
  private reset = (event: Event) => {
    this.updateBlurEvents(false);
    const el = event.target as HTMLElement;

    if (event.type === "mousedown" || this.state.focusTarget === el) {
      this.setState({ focusTarget: null });
    }
  };
}
