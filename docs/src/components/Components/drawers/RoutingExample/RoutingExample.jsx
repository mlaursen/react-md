import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import Toolbar from 'react-md/lib/Toolbars';

import NavItemLink from './NavItemLink';
import Inbox from './Inbox';
import Starred from './Starred';
import SendMail from './SendMail';
import Drafts from './Drafts';

const TO_PREFIX = '/discover-more/routing-examples/drawers';

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

@withRouter
export default class RoutingExample extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  state = { visible: false };

  componentDidMount() {
    // Need to set the renderNode since the drawer uses an overlay
    this.dialog = document.getElementById('drawer-routing-example-dialog');
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  hideDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { location } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Toolbar colored fixed title="Routing Example" nav={<Button icon onClick={this.showDrawer}>menu</Button>} />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-toolbar-relative md-grid"
        >
          <Switch key={location.pathname}>
            <Route path={navItems[0].to} exact component={Inbox} />
            <Route path={navItems[1].to} component={Starred} />
            <Route path={navItems[2].to} component={SendMail} />
            <Route path={navItems[3].to} component={Drafts} />
          </Switch>
        </CSSTransitionGroup>
        <Drawer
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          header={<Toolbar title={<Link to="/components/drawers#react-router-example">Drawer examples</Link>} />}
          renderNode={this.dialog}
          navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        />
      </div>
    );
  }
}
