import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isMobile } from '../utils';
import Divider from '../Dividers';
import { IconButton } from '../Buttons';
import { List, ListItem, ListSubheader } from '../Lists';

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    menuIconClassName: PropTypes.string,
    menuIconChildren: PropTypes.node,
    closeIconClassName: PropTypes.string,
    closeIconChildren: PropTypes.node,
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    navItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        key: PropTypes.any,
        leftIcon: PropTypes.node,
        leftAvatar: PropTypes.node,
        primaryText: PropTypes.string.isRequired,
      }),
    ])).isRequired,
    mini: PropTypes.bool,
  };

  static defaultProps = {
    menuIconChildren: 'menu',
    closeIconChildren: 'arrow_back',
  };

  render() {
    const {
      isOpen,
      title,
      menuIconClassName,
      menuIconChildren,
      children,
      openDrawer,
      //closeDrawer,
      navItems,
      //closeIconClassName,
      //closeIconChildren,
      mini,
    } = this.props;

    const active = isOpen || !isMobile;

    let nav;
    if(active || mini) {
      const navigationItems = navItems.map((item, key) => {
        if(React.isValidElement(item)) {
          return item;
        }

        const { divider, subheader, primaryText, ...itemProps } = item;
        let component;
        if(divider) {
          component = Divider;
        } else if(subheader) {
          component = ListSubheader;
        } else {
          component = ListItem;
        }

        const props = Object.assign({}, itemProps, { key: item.key || key });
        if(!mini || (mini && active)) {
          props.primaryText = primaryText;
        }

        return React.createElement(component, props);
      });

      nav = <List>{navigationItems}</List>;
    }

    return (
      <div className={classnames('md-navigation-drawer-container', { mini, active })}>
        <nav className="md-navigation-drawer">
          {((active && mini) || !mini) &&
          <header className="md-drawer-header">
            <h3 className="md-title">Title</h3>
            <Divider />
          </header>
          }
          {nav}
        </nav>
        <div className="md-navigation-drawer-content">
          <header className="md-navigation-drawer-toolbar">
            {!active &&
            <IconButton
              onClick={openDrawer}
              iconClassName={menuIconClassName}
              children={menuIconChildren}
            />
            }
            <h3 className="md-title">{title}</h3>
          </header>
          {children}
        </div>
      </div>
    );
  }
}
