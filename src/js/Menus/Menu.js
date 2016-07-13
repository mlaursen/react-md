import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { List } from '../Lists';

import { onOutsideClick } from '../utils';

/**
 * The Menu component is a controlled component. It requires a boolean `isOpen`
 * to determinte its state.
 *
 * Menus allow users to take an action by selecting from a list of choices revealed
 * upon opening a temporary, new sheet of material.
 */
export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static Positions = {
    TOP_RIGHT: 'tr',
    TOP_LEFT: 'tl',
    BOTTOM_RIGHT: 'br',
    BOTTOM_LEFT: 'bl',
    BELOW: 'below',
  };

  static propTypes = {
    /**
     * The optional className for the menu container.
     */
    className: PropTypes.string,

    /**
     * The optional style to apply to the menu container.
     */
    style: PropTypes.object,

    /**
     * The optional className to apply to the opened menu List.
     */
    listClassName: PropTypes.string,

    /**
     * The optional style to apply to the opened menu List.
     */
    listStyle: PropTypes.object,

    /**
     * An array of `ListItem`, `ListItemControl`, `Divider`, `Subheader`, or react element
     * to display when the menu is open.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * The component to use that will toggle the `isOpen` prop. This will make
     * the menu relative to this component. An example would be using an `IconButton`,
     * or another button as a toggle.
     */
    toggle: PropTypes.node,

    /**
     * Boolean if the menu is currently open.
     */
    isOpen: PropTypes.bool.isRequired,

    /**
     * The position that the menu should appear from.
     */
    position: PropTypes.oneOf([ Menu.Positions.TOP_RIGHT, Menu.Positions.TOP_LEFT, Menu.Positions.BOTTOM_RIGHT, Menu.Positions.BOTTOM_LEFT, Menu.Positions.BELOW ]),

    /**
     * An optional function that will force the menu to close. This is used so that the
     * menu will be closed when an element outside the menu is clicked.
     */
    close: PropTypes.func,

    /**
     * Boolean if the menu should autoclose when one of the items are clicked.
     * This will only work if the `close` function is given as well.
     */
    autoclose: PropTypes.bool,

    /**
     * Boolean if there are any nested items in the menu items. This will apply additional
     * styling and position for the nested items.
     */
    cascading: PropTypes.bool,

    /**
     * Any children needed to display the expander icon for nested `ListItem`.
     */
    expanderIconChildren: PropTypes.node,

    /**
     * The icon className to use for the expander icon.
     */
    expanderIconClassName: PropTypes.string,

    /**
     * Boolean if the height of the open menu should be limited to the `$md-dropdown-max-height`
     * and enable scrolling in the menu.
     */
    limitHeight: PropTypes.bool,

    /**
     * Boolean if the menu should span the full width.
     */
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    position: Menu.Positions.TOP_RIGHT,
    autoclose: true,
    expanderIconChildren: 'keyboard_arrow_right',
    expanderIconClassName: 'material-icons',
  };

  componentDidMount() {
    const { isOpen, autoclose, close } = this.props;
    if(isOpen && autoclose && close) {
      window.addEventListener('click', this.closeOnOutsideClick);
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen, autoclose, close } = this.props;
    if(!close || !autoclose || isOpen === prevProps.isOpen) { return; }
    if(isOpen) {
      window.addEventListener('click', this.closeOnOutsideClick);
    } else {
      window.removeEventListener('click', this.closeOnOutsideClick);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnOutsideClick);
  }

  closeOnOutsideClick = (e) => onOutsideClick(e, ReactDOM.findDOMNode(this.refs.container), this.props.close);

  /**
   * Checks if a list item was the target of a click event. Closes the menu if it was.
   *
   * There is only a single event listener to help with giant lists always rerendering since the
   * onClick functions were not equal with autobinding.
   *
   * @param {Object} e the click event.
   */
  handleListClick = (e) => {
    let node = e.target;
    while(node) {
      if(node.classList.contains('md-list-item')) {
        this.props.close();
        return;
      }

      node = node.parentNode;
    }
  };

  render() {
    const {
      className,
      listClassName,
      listStyle,
      children,
      toggle,
      isOpen,
      position,
      close,
      autoclose,
      cascading,
      expanderIconChildren,
      expanderIconClassName,
      fullWidth,
      limitHeight,
      ...props,
    } = this.props;

    let menuItems;
    if(isOpen) {
      const listProps = {
        ref: 'list',
        className: classnames('md-menu', listClassName, `md-transition-${position}`, { cascading, 'limit-height': limitHeight }),
        style: listStyle,
      };

      if(autoclose && close) {
        listProps.onClick = this.handleListClick;
      }

      const items = React.Children.map(children, (child, key) => {
        if(!child) { return child; }

        return React.cloneElement(child, {
          key: child.key || key,
          expanderIconChildren,
          expanderIconClassName,
        });
      });

      menuItems = (
        <List {...listProps}>
          {items}
        </List>
      );
    }
    return (
      <CSSTransitionGroup
        ref="container"
        component="div"
        transitionName="md-menu"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={classnames('md-menu-container', className, { 'full-width': fullWidth })}
        {...props}
      >
        {toggle}
        {menuItems}
      </CSSTransitionGroup>
    );
  }
}
