import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';

// Sadly the active prop on Link and IndexLink won't work correctly since
// they rely on context for updates and react-md uses PureComponent behind
// the scenes so the context updates don't happen.
function isActive(to, path) {
  return to === path;
}

class App extends Component {
  render() {
    const {
      location: { pathname },
      children,
    } = this.props;

    return (
      <NavigationDrawer
        drawerTitle="react-md with CRA"
        toolbarTitle="Welcome to react-md"
        navItems={[{
          component: IndexLink,
          to: '/',
          active: isActive('/', pathname),
          primaryText: 'Home',
          leftIcon: <FontIcon>home</FontIcon>,
        }, {
          component: Link,
          to: '/page-1',
          active: isActive('/page-1', pathname),
          primaryText: 'Page 1',
          leftIcon: <FontIcon>bookmark</FontIcon>,
        }, {
          component: Link,
          to: '/page-2',
          active: isActive('/page-2', pathname),
          primaryText: 'Page 2',
          leftIcon: <FontIcon>donut_large</FontIcon>,
        }, {
          component: Link,
          to: '/page-3',
          active: isActive('/page-3', pathname),
          primaryText: 'Page 3',
          leftIcon: <FontIcon>flight_land</FontIcon>,
        }]}
      >
        {children ? React.cloneElement(children, { key: pathname }) : null}
      </NavigationDrawer>
    );
  }
}

export default App;
