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

  static PermanentType = {
    FULL_HEIGHT: 'full-height',
    CLIPPED: 'clipped',
  };

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
        primaryText: PropTypes.string,
      }),
    ])).isRequired,
    mini: PropTypes.bool,
    permanentType: PropTypes.oneOf([NavigationDrawer.PermanentType.FULL_HEIGHT, NavigationDrawer.PermanentType.CLIPPED]).isRequired,
  };

  static defaultProps = {
    permanentType: NavigationDrawer.PermanentType.FULL_HEIGHT,
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
      //closeIconClassName,
      //closeIconChildren,
      navItems,
      mini,
      permanentType,
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

    let header;
    if(permanentType === NavigationDrawer.PermanentType.CLIPPED) {
      header = <header className="md-drawer-header" />;
    } else if((active && mini) || !mini) {
      header = (
        <header className="md-drawer-header">
          <h3 className="md-title">Title</h3>
          <Divider />
        </header>
      );
    }

    return (
      <div className={classnames('md-navigation-drawer-container', { mini, active })}>
        <nav className="md-navigation-drawer">
          {header}
          {nav}
        </nav>
        <div className={`md-navigation-drawer-content ${permanentType}`}>
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
