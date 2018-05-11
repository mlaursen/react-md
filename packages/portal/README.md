# @react-md/portal
The Portal component is a simple wrapper with React's createPortal API that will automatically generate portal nodes behind the scenes for you.

## Installation
```sh
$ npm install --save @react-md/portal
```

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";

import { Portal } from "@react-md/portal";

const overlayStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0.
  background: 'rgba(0, 0, 0, .12)',
};

class App extends React.Component {
  state = { visible: false };
  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <main>
        <button type="button" onClick={this.show}>
          Show Portal
        </button>
        <Portal visible={visible}>
          <div style={overlayStyle}>
            <button type="button" onClick={this.hide}>
              Close Overlay
            </button>
          </div>
        </Portal>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
