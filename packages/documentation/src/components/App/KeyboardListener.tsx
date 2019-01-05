import * as React from "react";

import { Provider } from "./keyboard";

export interface IKeyboardListenerProps {
  children?: React.ReactNode;
}

export interface IKeyboardListenerState {
  enabled: boolean;
}

export default class KeyboardListener extends React.Component<
  IKeyboardListenerProps,
  IKeyboardListenerState
> {
  constructor(props: IKeyboardListenerProps) {
    super(props);

    this.state = { enabled: false };
  }

  public shouldComponentUpdate(
    nextProps: IKeyboardListenerProps,
    nextState: IKeyboardListenerState
  ) {
    return this.state.enabled !== nextState.enabled || this.props.children !== nextProps.children;
  }

  public componentDidMount() {
    window.addEventListener("mousedown", this.handleMouseDown, true);
    window.addEventListener("keydown", this.handleKeyDown, true);
  }

  public componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleMouseDown, true);
    window.removeEventListener("keydown", this.handleKeyDown, true);
  }

  public render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.setState(prevState => ({ enabled: false }));
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    this.setState(prevState => ({ enabled: true }));
  };
}
