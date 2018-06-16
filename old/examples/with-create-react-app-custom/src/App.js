import React, { Component } from 'react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <NavigationDrawer
        drawerTitle="react-md with CRA"
        toolbarTitle="Welcome to react-md"
      >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </NavigationDrawer>
    );
  }
}

export default App;
