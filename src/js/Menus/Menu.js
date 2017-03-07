import React, { PureComponent, PropTypes, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import contextTypes from './contextTypes';
import Positions from './Positions';
import List from '../Lists/List';

/**
 * The `Menu` component is a controlled component that will display
 * a `List` of `ListItem` once it has been toggled open.
 */
export default class Menu extends PureComponent {
  static Positions = Positions;

  static propTypes = {
    /**
     * An optional id to give to the menu's container. This is used for accessibility and is
     * generally recommended.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to give to the `List` that gets generated when open. This is used for
     * accessibility and generally recommended. If this prop is given, the `aria-owns` attribute
     * will be added to the list.
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the main container for a menu.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the main container for a menu.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the menu's `List` once it has been toggled open.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu's `List` once it has been toggled open.
     */
    listClassName: PropTypes.string,

    /**
     * The component to render the container as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * This can either be a single `List` component or an array of `ListItem`, `ListItemControl`,
     * `Divider`, or `Subheader` to display when the menu is open. If it is the `List` component,
     * it will be cloned with some additional class names.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * Boolean if the `Menu` is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * The transition name to use for the menu's enter and leave transitions
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The timeout for the enter transition.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The timeout for the leave transition.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * The node to use as the toggle for the menu.
     */
    toggle: PropTypes.node,

    /**
     * The position that the menu should appear from. If the position is set to
     * `Menu.Positions.CONTEXT`, the `onClose` function will be called when something
     * outside of the `List` is clicked instead of something outside of the `Menu`.
     */
    position: PropTypes.oneOf([
      Menu.Positions.TOP_LEFT,
      Menu.Positions.TOP_RIGHT,
      Menu.Positions.BOTTOM_LEFT,
      Menu.Positions.BOTTOM_RIGHT,
      Menu.Positions.CONTEXT,
      Menu.Positions.BELOW,
    ]).isRequired,

    /**
     * A function used to close the menu. This is used when the user clicks outside
     * of the menu or when a `ListItem` is clicked.
     */
    onClose: PropTypes.func.isRequired,

    /**
     * Boolean if the menu is cascading. This isn't really working too well yet.
     */
    cascading: PropTypes.bool,

    /**
     * Boolean if the width of the `List` should be limited to the width of the `toggle`
     */
    contained: PropTypes.bool,

    /**
     * Boolean if the menu should be displayed full width instead of inline.
     */
    fullWidth: PropTypes.bool,

    close: deprecated(PropTypes.func, 'Use `onClose` instead'),
    autoclose: deprecated(PropTypes.bool, 'The menus will always autoclose as according to the specs'),
    limitHeight: deprecated(PropTypes.bool, 'The menus will always be limited in height as according to the specs'),
    expanderIconClassName: deprecated(
      PropTypes.node,
      'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' +
      'expander icon'
    ),
    expanderIconChildren: deprecated(
      PropTypes.node,
      'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' +
      'expander icon'
    ),
  };

  static defaultProps = {
    component: 'div',
    transitionName: 'md-menu',
    transitionEnterTimeout: 200,
    transitionLeaveTimeout: 200,
    position: Menu.Positions.TOP_RIGHT,
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this._setList = this._setList.bind(this);
    this._setContainer = this._setContainer.bind(this);
    this._handleListClick = this._handleListClick.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  getChildContext() {
    const { cascading: menuCascading, position: menuPosition } = this.props;
    return {
      menuCascading,
      menuPosition,
      listLevel: 0,
    };
  }

  componentDidMount() {
    const { isOpen } = this.props;
    if (isOpen) {
      window.addEventListener('click', this._handleOutsideClick);
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    if (isOpen === prevProps.isOpen) {
      return;
    }

    window[`${isOpen ? 'add' : 'remove'}EventListener`]('click', this._handleOutsideClick);
  }

  componentWillUnmount() {
    const { isOpen } = this.props;
    if (isOpen) {
      window.removeEventListener('click', this._handleOutsideClick);
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setList(list) {
    if (list !== null) {
      this._list = findDOMNode(list);
    }

    try {
      const children = Children.only(this.props.children);
      if (typeof children.ref === 'function') {
        children.ref(list);
      }
    } catch (e) {
      // do nothing
    }
  }

  _setContainer(container) {
    if (container !== null) {
      this._container = findDOMNode(container);
    }
  }

  _handleOutsideClick(e) {
    const isInContextMenu = this.props.position === Positions.CONTEXT
      && !this._list.contains(e.target);

    if (isInContextMenu || !this._container.contains(e.target)) {
      const { onClose, close } = this.props;
      if (close) {
        close(e);
      } else if (onClose) {
        onClose(e);
      }
    }
  }

  _handleListClick(e) {
    const { onClose, close } = this.props;

    let node = e.target;
    while (this._container.contains(node)) {
      if (!node.classList.contains('md-list-item--nested-container') && node.classList.contains('md-list-item')) {
        this._timeout = setTimeout(() => {
          this._timeout = null;

          if (close) {
            close(e);
          } else if (onClose) {
            onClose(e);
          }
        }, 300);

        return;
      }
      node = node.parentNode;
    }
  }

  render() {
    const {
      id,
      className,
      listStyle,
      listClassName,
      isOpen,
      fullWidth,
      toggle,
      contained,
      children,
      position,
      ...props
    } = this.props;
    delete props.close;
    delete props.onClose;
    delete props.cascading;
    delete props.autoclose;
    delete props.listId;

    let { listId } = this.props;
    if (!listId && id) {
      listId = `${id}List`;
    }

    const menuClassName = cn({ 'md-list--menu-contained': contained }, listClassName);
    let menuItems;
    try {
      const list = Children.only(children);

      menuItems = cloneElement(children, {
        id: list.props.id || listId,
        key: 'menu-list',
        className: cn(menuClassName, list.props.className),
        onClick: this._handleListClick,
        ref: this._setList,
      });
    } catch (e) {
      menuItems = (
        <List
          id={listId}
          key="menu-list"
          style={listStyle}
          className={menuClassName}
          onClick={this._handleListClick}
          ref={this._setList}
        >
          {children}
        </List>
      );
    }

    return (
      <CSSTransitionGroup
        {...props}
        id={id}
        ref={this._setContainer}
        className={cn('md-inline-block md-menu-container', {
          'md-full-width': fullWidth,
          'md-menu-container--menu-below': position === Positions.BELOW,
        }, className)}
        aria-haspopup
        aria-expanded={isOpen}
        aria-owns={listId}
      >
        {toggle}
        {isOpen ? menuItems : null}
      </CSSTransitionGroup>
    );
  }
}
