import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Notifications from 'containers/Notifications';

@connect(() => ({}))
export default class App extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <NavigationDrawer
        drawerTitle="react-md"
        navItems={[{
          component: Link,
          primaryText: 'Lists',
          to: '/components/lists',
        }]}
      >
        {children}
        <Notifications />
      </NavigationDrawer>
    );
  }
}
