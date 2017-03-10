import React, { PureComponent, PropTypes } from 'react';
import deprecated from 'react-prop-types/lib/deprecated';

import controlled from '../utils/PropTypes/controlled';
import getField from '../utils/getField';
import Button from '../Buttons/Button';
import Menu from './Menu';

export default class MenuButton extends PureComponent {
  static propTypes = {
    /**
     * An id to use for the menu button. This is required for accessibility.
     *
     * @see {@link Menus#id}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the menu's list.
     *
     * @see {@link Menus#listId}
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the button.
     */
    buttonId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    menuStyle: PropTypes.object,
    menuClassName: PropTypes.string,
    listStyle: PropTypes.object,
    listClassName: PropTypes.string,
    children: PropTypes.node,
    buttonChildren: PropTypes.node,
    visible: controlled(PropTypes.bool, 'onVisibleToggle', 'defaultVisible'),
    defaultVisible: PropTypes.bool.isRequired,

    onMenuToggle: deprecated(PropTypes.bool, 'Use `onVisibleChange` instead'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
  };

  static defaultProps = {
    defaultVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.visible === 'undefined') {
      this.state.visible = typeof props.defaultOpen !== 'undefined'
        ? props.defaultOpen
        : props.defaultVisible;
    }
  }

  render() {
    const {
      id,
      listId,
      buttonId,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      children,
      buttonChildren,
      isOpen, // deprecated

      /* eslint-disable no-unused-vars */
      visible: propVisible,
      defaultVisible,

      // deprecated
      defaultOpen,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');

    const toggle = (
      <Button
        key="menu-button"
        {...props}
        id={buttonId}
        onClick={this._handleClick}
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
        visible={visible}
      >
        {children}
      </Menu>
    );
  }
}
