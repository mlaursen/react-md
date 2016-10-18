import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Menu from '../Menus';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import mapToListParts from '../utils/mapToListParts';

export default class MenuTab extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    label: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this._toggleOpen = this._toggleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  _toggleOpen(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState({ isOpen: !this.state.isOpen });
  }

  _handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { className, tabs, label, active, ...props } = this.props;
    const tab = (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._toggleOpen}
        className={cn('md-tab md-tab--menu', className)}
      >
        {label}
      </AccessibleFakeInkedButton>
    );
    return (
      <Menu
        className={cn('md-menu--tab', {
          'md-tab--active': active,
          'md-tab--inactive': !active,
        })}
        toggle={tab}
        isOpen={this.state.isOpen}
        id="woop"
        onClose={this._handleClose}
      >
        {tabs.map(mapToListParts)}
      </Menu>
    );
  }
}
