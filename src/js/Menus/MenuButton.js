import React, { PureComponent, PropTypes } from 'react';

import Menu from './Menu';
import Button from '../Buttons/Button';
import Positions from './Positions';

/**
 * A simple wrapper for creating Menus wrapped with Button. The props used are a
 * combination of the `Menu` and `Button` components. Menu props will be extracted
 * and any props that are not `Menu` related will be passed to the `Button`.
 *
 * The only main difference is that the `children` for the button are now defined with
 * `buttonChildren`.
 */
export default class MenuButton extends PureComponent {
  static Positions = Positions;

  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    menuId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the button.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the menu.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu.
     */
    menuClassName: PropTypes.string,

    /**
     * An optional style to apply to the menu's list when it is open.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu's list when it is open.
     */
    listClassName: PropTypes.string,

    /**
     * Any children used to render icons or anything else for the button.
     */
    buttonChildren: PropTypes.node,

    /**
     * An optional function to call when the button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the menu's visiblity is toggled. The callback
     * will include the next `open` state and the click event.
     */
    onMenuToggle: PropTypes.func,

    /**
     * Boolean if the MenuButton is open by default.
     */
    defaultOpen: PropTypes.bool,

    /**
     * The position for the menu.
     */
    position: PropTypes.oneOf([
      Positions.TOP_LEFT,
      Positions.TOP_RIGHT,
      Positions.BOTTOM_LEFT,
      Positions.BOTTOM_RIGHT,
      Positions.BELOW,
    ]),

    /**
     * A list of `ListItem`s to render when the Menu is toggled open.
     */
    children: PropTypes.node,

    /**
     * Boolean if the `Menu` is displayed as full width.
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the `Menu` should autoclose when a `ListItem` is closed.
     */
    autoclose: PropTypes.bool,

    /**
     * Boolean if the max width of the menu's list should be equal to the `Button`.
     */
    contained: PropTypes.bool,

    /**
     * An optional transition name to use for the menu transitions.
     */
    transitionName: PropTypes.string,

    /**
     * An optional transition leave timeout to use for the menu transitions.
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * An optional transition leave timeout to use for the menu transitions.
     */
    transitionLeaveTimeout: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.defaultOpen || false,
    };
    this._toggleMenu = this._toggleMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
  }

  _toggleMenu(e) {
    const isOpen = !this.state.isOpen;
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(isOpen, e);
    }

    this.setState({ isOpen });
  }

  _closeMenu(e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(false, e);
    }

    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const {
      menuStyle,
      menuClassName,
      buttonChildren,
      children,
      fullWidth,
      position,
      autoclose,
      contained,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      listId,
      menuId,
      ...props,
    } = this.props;
    delete props.onClick;
    delete props.defaultOpen;

    const toggle = (
      <Button
        key="menu-button"
        {...props}
        onClick={this._toggleMenu}
        children={buttonChildren}
      />
    );

    return (
      <Menu
        id={menuId}
        listId={listId}
        style={menuStyle}
        className={menuClassName}
        toggle={toggle}
        isOpen={isOpen}
        onClose={this._closeMenu}
        contained={contained}
        autoclose={autoclose}
        position={position}
        fullWidth={fullWidth}
        children={children}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      />
    );
  }
}
