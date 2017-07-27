import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import { toTitle } from 'utils/strings';

import './_styles.scss';
import NavItemLink from 'components/Components/drawers/RoutingExample/NavItemLink';
import Inbox from 'components/Components/drawers/RoutingExample/Inbox';
import Starred from 'components/Components/drawers/RoutingExample/Starred';
import SendMail from 'components/Components/drawers/RoutingExample/SendMail';
import Drafts from 'components/Components/drawers/RoutingExample/Drafts';

const TO_PREFIX = '/discover-more/routing-examples/navigation-drawers';

const navItems = [{
  label: 'Inbox',
  to: TO_PREFIX,
  exact: true,
  icon: 'inbox',
}, {
  label: 'Starred',
  to: `${TO_PREFIX}/starred`,
  icon: 'star',
}, {
  label: 'Send mail',
  to: `${TO_PREFIX}/send-mail`,
  icon: 'send',
}, {
  label: 'Drafts',
  to: `${TO_PREFIX}/drafts`,
  icon: 'drafts',
}];

const styles = {
  content: { minHeight: 'auto' },
};

@withRouter
export default class RoutingExample extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();

    this.state = { toolbarTitle: this.getCurrentTitle(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) });
  }

  getCurrentTitle = ({ location: { pathname } }) => {
    const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (lastSection === 'navigation-drawers') {
      return 'Inbox';
    }

    return toTitle(lastSection);
  };

  render() {
    const { toolbarTitle } = this.state;
    const { location } = this.props;
    return (
      <NavigationDrawer
        toolbarTitle={toolbarTitle}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        contentId="main-demo-content"
        contentStyle={styles.content}
      >
        <Switch key={location.pathname}>
          <Route path={navItems[0].to} exact component={Inbox} />
          <Route path={navItems[1].to} component={Starred} />
          <Route path={navItems[2].to} component={SendMail} />
          <Route path={navItems[3].to} component={Drafts} />
        </Switch>
      </NavigationDrawer>
    );
  }
}
