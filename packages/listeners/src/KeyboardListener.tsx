import * as React from "react";
import * as PropTypes from "prop-types";

export interface IKeyboardListenerContext {
  enabled: boolean;
  keyboardActive: boolean;
}

export const KeyboardListenerContext = React.createContext<IKeyboardListenerContext>({
  enabled: false,
  keyboardActive: false,
});

export type KeyboardListenerChildrenFunction = (
  context: IKeyboardListenerContext
) => React.ReactNode;

export interface IKeyboardListenerProps {
  enabled?: boolean;
  onChange?: (context: IKeyboardListenerContext) => void;
  children?: React.ReactNode | KeyboardListenerChildrenFunction;
}

export interface IKeyboardListenerDefaultProps {
  enabled: boolean;
}

export type KeyboardListenerWithDefaultProps = IKeyboardListenerProps &
  IKeyboardListenerDefaultProps;

export interface IKeyboardListenerState {
  keyboardActive: boolean;
}

export default class KeyboardListener extends React.Component<
  IKeyboardListenerProps,
  IKeyboardListenerState
> {
  public static propTypes = {
    enabled: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  };

  public static defaultProps: IKeyboardListenerDefaultProps = {
    enabled: true,
  };

  private listenersAdded: boolean;
  constructor(props: IKeyboardListenerProps) {
    super(props);

    this.state = { keyboardActive: false };
    this.listenersAdded = false;
  }

  public componentDidMount() {
    this.setListeners((this.props as KeyboardListenerWithDefaultProps).enabled);
  }

  public componentDidUpdate(prevProps: IKeyboardListenerProps, prevState: IKeyboardListenerState) {
    const { onChange, enabled } = this.props as KeyboardListenerWithDefaultProps;
    if (
      onChange &&
      (enabled !== prevProps.enabled || this.state.keyboardActive !== prevState.keyboardActive)
    ) {
      onChange({ ...this.state, enabled });
    }
  }

  public shouldComponentUpdate(
    nextProps: IKeyboardListenerProps,
    nextState: IKeyboardListenerContext
  ) {
    return (
      this.state.keyboardActive !== nextState.keyboardActive ||
      this.props.children !== nextProps.children
    );
  }

  public componentWillUnmount() {
    this.setListeners(false);
  }

  public render() {
    const { children, enabled } = this.props as KeyboardListenerWithDefaultProps;
    if (typeof children === "function") {
      return (children as KeyboardListenerChildrenFunction)({ ...this.state, enabled });
    }

    return children;
  }

  private setListeners = (enabled: boolean) => {
    if (this.listenersAdded !== enabled) {
      if (enabled) {
        window.addEventListener("keydown", this.handleKeyDown, true);
        window.addEventListener("mousedown", this.handleMouseDown, true);
      } else {
        window.removeEventListener("keydown", this.handleKeyDown, true);
        window.removeEventListener("mousedown", this.handleMouseDown, true);
      }

      this.listenersAdded = enabled;
    }
  };

  private handleKeyDown = () => {
    this.setState({ keyboardActive: true });
  };

  private handleMouseDown = () => {
    this.setState({ keyboardActive: false });
  };
}
