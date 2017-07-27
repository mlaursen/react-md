import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import Menu from '../Menus/Menu';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import mapToListParts from '../utils/mapToListParts';

/**
 * The `MenuTab` component is used when there are too many desktop tabs
 * to be displayed without any overflow. If the `Tabs` component is used,
 * this will automatically be included when the `menuOverflow` prop is true.
 */
export default class MenuTab extends PureComponent {
  static propTypes = {
    /**
     * An id to give the tab's menu.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * The current active tab index. This is used to determine which list item
     * is active in the menu, and if the styles for an active tab should be applied
     * to the menu.
     */
    activeTabIndex: PropTypes.number.isRequired,

    /**
     * An tab index that caused the overflow to happen.
     */
    overflowAtIndex: PropTypes.number.isRequired,

    /**
     * A list of tabs that should be rendered in the menu once opened. This can either
     * be:
     *
     * - a `ListItem`, `Divider`, or `Subheader` component
     * - a string to use as the `primaryText` for a list item
     * - an object that defines props to generate a `ListItem`, `Divider`, or `Subheader` component
     */
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.shape({
        divider: PropTypes.bool,
        subheader: PropTypes.bool,
        primaryText: PropTypes.node,
      }),
    ])).isRequired,

    /**
     * An optional style to apply to the menu.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the menu.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the tab in the menu.
     */
    tabStyle: PropTypes.object,

    /**
     * An optional className to apply to the tab in the menu.
     */
    tabClassName: PropTypes.string,

    /**
     * An optional function to call when the tab is clicked.
     */
    onClick: PropTypes.func,

    /**
     * The label to display in the tab. This should normally be some text with
     * a drop down arrow next to it.
     */
    label: PropTypes.node.isRequired,
  };

  state = { visible: false }

  _toggleVisible = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState({ visible: !this.state.visible });
  };

  _handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      id,
      style,
      className,
      tabStyle,
      tabClassName,
      tabs,
      label,
      activeTabIndex,
      overflowAtIndex,
      ...props
    } = this.props;
    const active = activeTabIndex >= overflowAtIndex;

    const tab = (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._toggleVisible}
        style={tabStyle}
        className={cn('md-tab md-tab--menu', tabClassName)}
      >
        {label}
      </AccessibleFakeInkedButton>
    );

    return (
      <Menu
        id={id}
        style={style}
        className={cn('md-menu--tab', {
          'md-tab--active': active,
          'md-tab--inactive': !active,
        }, className)}
        toggle={tab}
        visible={this.state.visible}
        onClose={this._handleClose}
      >
        {tabs.map(mapToListParts)}
      </Menu>
    );
  }
}
