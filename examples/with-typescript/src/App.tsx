import * as React from 'react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';
import './App.css';

const logo = require('./logo.svg');

const navItems = [{
  primaryText: 'Home',
  leftIcon: <FontIcon>home</FontIcon>,
}];

class App extends React.Component {
  render() {
    return (
      <NavigationDrawer
        drawerTitle="react-md - Typescript"
        toolbarTitle="Welcome to react-md"
        navItems={navItems}
        drawerType="temporary-mini"
        constantDrawerType={true}
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
