import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";

export interface IAppState {
  visible: boolean;
  style: React.CSSProperties | undefined;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = { visible: false, style: undefined };
  }

  public render() {
    const { style } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button id="toggle-1" type="button" onClick={this.toggle}>Toggle</button>
        <ul id="toggle-1-menu" role="menu" style={style} className="list list--inline">
          <li role="menuitem" tabIndex={-1}>Item 1</li>
          <li role="menuitem" tabIndex={-1}>Item 2</li>
          <li role="menuitem" tabIndex={-1}>Item 3</li>
          <li role="menuitem" tabIndex={-1}>Item 4</li>
          <li role="menuitem" tabIndex={-1}>Item 5</li>
        </ul>
      </div>
    );
  }

  private toggle = () => {
    const container = document.getElementById("toggle-1") as HTMLButtonElement;
    const target = document.getElementById("toggle-1-menu") as HTMLUListElement;
    const style = positionRelativeTo(container, target, {
      // heightOverlapMultiplier: 0,
      horizontalPosition: HorizontalPosition.LEFT,
      verticalPosition: VerticalPosition.CENTER,
      // verticalSpacing: "1.5rem",
      widthOverlapMultiplier: 0,
    });
    this.setState({ style: !style ? undefined : style });
    // this.setState({ style: style ? { ...styles,menu, ....style } : styles.menu });
  }
}

export default App;
