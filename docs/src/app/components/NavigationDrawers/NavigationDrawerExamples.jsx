import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';

import FontIcon from 'react-md/lib/FontIcons';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

export default class NavigationDrawerExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object.isRequired,
  };

  closeDrawer = () => {
    this.setState({ isOpen: false });
  };

  openDrawer = () => {
    this.setState({ isOpen: true });
  };

  getLinkParts = (suffix) => {
    const { pathname } = this.props.location;
    const to = `/components/navigation-drawers/${suffix}`;
    return {
      to,
      className: pathname === to ? 'active' : null,
    };
  };

  render() {
    return (
      <div className="drawer-container">
        <NavigationDrawer
          title="Inbox"
          isOpen={this.state.isOpen}
          navItems={[{
            leftIcon: <FontIcon>move_to_inbox</FontIcon>,
            primaryText: 'Inbox',
            component: Link,
            ...this.getLinkParts('inbox'),
          }, {
            leftIcon: <FontIcon>star</FontIcon>,
            primaryText: 'Starred',
            component: Link,
            ...this.getLinkParts('starred'),
          }, {
            leftIcon: <FontIcon>send</FontIcon>,
            primaryText: 'Sent Mail',
            component: Link,
            ...this.getLinkParts('sent-mail'),
          }, {
            leftIcon: <FontIcon>drafts</FontIcon>,
            primaryText: 'Drafts',
            component: Link,
            ...this.getLinkParts('drafts'),
          }, {
            divider: true,
          }, {
            leftIcon: <FontIcon>mail</FontIcon>,
            primaryText: 'All Mail',
            component: Link,
            ...this.getLinkParts('all-mail'),
          }, {
            leftIcon: <FontIcon>delete</FontIcon>,
            primaryText: 'Trash',
            component: Link,
            ...this.getLinkParts('trash'),
          }, {
            leftIcon: <FontIcon>error_outline</FontIcon>,
            primaryText: 'Spam',
            component: Link,
            ...this.getLinkParts('spam'),
          }]}
          closeDrawer={this.closeDrawer}
          openDrawer={this.openDrawer}
        >
          {this.props.children}
        </NavigationDrawer>
      </div>
    );
  }
}
