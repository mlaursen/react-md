import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isMobile, setOverflow } from '../utils';
import Divider from '../Dividers';
import { List, ListItem } from '../Lists';
import Subheader from '../Subheaders';

import NavigationDrawerHeader from './NavigationDrawerHeader';
import NavigationDrawerToolbar from './NavigationDrawerToolbar';

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static DrawerType = {
    FULL_HEIGHT: 'full-height',
    CLIPPED: 'clipped',
    FLOATING: 'floating',
    PERSISTENT: 'persistent',
    PERSISTENT_MINI: 'mini',
    TEMPORARY: 'temporary',
    // want styles of temporary and mini. Little hacky.
    TEMPORARY_MINI: 'temporary mini',
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    toolbarClassName: PropTypes.string,
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
        divider: PropTypes.bool,
        subheader: PropTypes.bool,
        component: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
        ]),
        primaryText: PropTypes.string,
      }),
    ])).isRequired,
    drawerType: PropTypes.oneOf(Object.keys(NavigationDrawer.DrawerType).map(k => NavigationDrawer.DrawerType[k])),
    toolbarChildren: PropTypes.node,
    toolbarTitle: PropTypes.string,
    navHeader: PropTypes.node,
    navHeaderChildren: PropTypes.node,
    customValidation: function(props) {
      const { PERSISTENT, PERSISTENT_MINI } = NavigationDrawer.DrawerType;
      const { drawerType } = props;
      if(drawerType !== PERSISTENT && drawerType !== PERSISTENT_MINI) {
        return;
      }

      const { closeDrawer, closeIconChildren, closeIconClassName } = props;
      if(typeof closeDrawer !== 'function') {
        return new Error(`Prop 'closeDrawer' is missing.`);
      } else if(!closeIconChildren && !closeIconClassName) {
        return new Error('Need at least one of closeIconChildren or closeIconClassName');
      }
    },
  };

  static defaultProps = {
    drawerType: NavigationDrawer.DrawerType.FULL_HEIGHT,
    menuIconChildren: 'menu',
    closeIconChildren: 'keyboard_arrow_left',
  };

  componentWillUpdate(nextProps) {
    if(nextProps.isOpen === this.props.isOpen && nextProps.drawerType === this.props.drawerType) {
      return;
    }

    const temps = [
      NavigationDrawer.DrawerType.TEMPORARY,
      NavigationDrawer.DrawerType.TEMPORARY_MINI,
    ];

    const isNextTemp = temps.indexOf(nextProps.drawerType) !== -1;
    const isCurrTemp = temps.indexOf(this.props.drawerType) !== -1;
    if((isCurrTemp && !isNextTemp) || (!isCurrTemp && !isNextTemp)) {
      setOverflow(false);
    } else {
      setOverflow(nextProps.isOpen);
    }
  }

  mapItemsToComponents = (mini, active, item, key) => {
    if(React.isValidElement(item)) {
      return item;
    }

    const { divider, subheader, primaryText, nestedItems, ...itemProps } = item;
    let component;
    if(divider) {
      component = Divider;
    } else if(subheader) {
      component = Subheader;
    } else {
      component = ListItem;
    }

    const props = Object.assign({}, itemProps, {
      key: item.key || key,
      nestedItems: nestedItems && nestedItems.map(this.mapItemsToComponents.bind(this, mini, active)),
    });
    if(!mini || (mini && active)) {
      props.primaryText = primaryText;
    }

    return React.createElement(component, props);
  };

  render() {
    const {
      isOpen,
      title,
      toolbarTitle,
      containerClassName,
      className,
      contentClassName,
      toolbarClassName,
      menuIconClassName,
      menuIconChildren,
      children,
      openDrawer,
      closeDrawer,
      closeIconClassName,
      closeIconChildren,
      navItems,
      drawerType,
      toolbarChildren,
      navHeader,
      navHeaderChildren,
    } = this.props;
    const { PERSISTENT, PERSISTENT_MINI, TEMPORARY, TEMPORARY_MINI } = NavigationDrawer.DrawerType;

    const mini = drawerType === PERSISTENT_MINI || drawerType === TEMPORARY_MINI;
    const persistent = drawerType === PERSISTENT_MINI || drawerType === PERSISTENT;
    const temporary = drawerType === TEMPORARY || drawerType === TEMPORARY_MINI;
    const active = isOpen || (!temporary && (!persistent && !isMobile));

    let nav;
    if(active || mini) {
      const navigationItems = navItems.map(this.mapItemsToComponents.bind(this, mini, active));

      nav = <List>{navigationItems}</List>;
    }

    let header;
    if(navHeader) {
      header = React.cloneElement(navHeader, { persistent });
    } else if((active && mini) || !mini) {
      header = (
        <NavigationDrawerHeader
          title={title}
          closeDrawer={closeDrawer}
          closeIconChildren={closeIconChildren}
          closeIconClassName={closeIconClassName}
          persistent={persistent}
          children={navHeaderChildren}
        />
      );
    }

    const conditionalClassNames = { active };

    return (
      <div className={classnames('md-navigation-drawer-container', containerClassName, conditionalClassNames)}>
        <nav className={classnames('md-navigation-drawer', className, drawerType, conditionalClassNames)}>
          {header}
          {nav}
        </nav>
        <div className={classnames('md-navigation-drawer-content', contentClassName, drawerType, conditionalClassNames)}>
          <NavigationDrawerToolbar
            className={classnames(toolbarClassName, drawerType, conditionalClassNames)}
            temporary={temporary}
            isOpen={isOpen}
            openDrawer={openDrawer}
            menuIconClassName={menuIconClassName}
            menuIconChildren={menuIconChildren}
            title={toolbarTitle}
            children={toolbarChildren}
          />
          {children}
          <CSSTransitionGroup transitionName="md-overlay" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
            {isOpen && <div key="overlay" className="md-navigation-drawer-overlay" onClick={closeDrawer} />}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}
