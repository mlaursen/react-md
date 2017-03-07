import React, { PureComponent, PropTypes } from 'react';

import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

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
    /**
     * An id to use for the menu button. This is required for a11y
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional id to give the button instead of the menu.
     */
    buttonId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to give the list that appears in the menu.
     */
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
      id,
      listId,
      buttonId,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      buttonChildren,
      children,
      fullWidth,
      position,
      contained,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props
    } = this.props;
    delete props.onClick;
    delete props.onMenuToggle;
    delete props.defaultOpen;

    const toggle = (
      <Button
        key="menu-button"
        {...props}
        id={buttonId}
        onClick={this._toggleMenu}
      >
        {buttonChildren}
      </Button>
    );

    return (
      <Menu
        id={id}
        listId={listId}
        style={menuStyle}
        className={menuClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        toggle={toggle}
        isOpen={isOpen}
        onClose={this._closeMenu}
        contained={contained}
        position={position}
        fullWidth={fullWidth}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {children}
      </Menu>
    );
  }
}
