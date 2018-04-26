import React, { Component } from 'react';
import { NavigationDrawer, Button, FontIcon } from 'react-md';
import logo from './logo.svg';
import './App.css';

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
          <Button raised primary iconEl={<FontIcon>home</FontIcon>}>Button</Button>
        </div>
      </NavigationDrawer>
    );
  }
}

export default App;
