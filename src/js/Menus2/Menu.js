import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import TICK from '../constants/CSSTransitionGroupTick';
import getField from '../utils/getField';
import List from '../Lists/List';
import Layover from '../Helpers/Layover';

export default class Menu extends PureComponent {
  static HorizontalAnchors = Layover.HorizontalAnchors;
  static VerticalAnchors = Layover.VerticalAnchors;

  static Positions = {
    // Can't do ...Layover.Positions since it triggers the get for CONTEXT
    TOP_LEFT: Layover.Positions.TOP_LEFT,
    TOP_RIGHT: Layover.Positions.TOP_RIGHT,
    BOTTOM_LEFT: Layover.Positions.BOTTOM_LEFT,
    BOTTOM_RIGHT: Layover.Positions.BOTTOM_RIGHT,
    BELOW: Layover.Positions.BELOW,
    _warned: false,
    get CONTEXT() {
      if (!this._warned) {
        /* eslint-disable no-console */
        console.error(
          'The `Menu.Positions.CONTEXT` position has been depreacted and will be removed ' +
          'in the next major release. To make the `Menu` behave as a context menu, provide ' +
          'the `onContextMenu` prop instead.'
        );
      }

      this._warned = true;
      return 'context';
    },
  };

  static propTypes = {
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    listStyle: PropTypes.object,
    listClassName: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),

    /**
     * This is how the menu's `List` get's anchored to the `toggle` element.
     *
     * @see {@link Helpers/Layovers#anchor}
     */
    anchor: Layover.propTypes.anchor,

    /**
     * This is the animation position for the list that appears.
     *
     * @see {@link Helpers/Layovers#animationPosition}
     */
    position: Layover.propTypes.animationPosition,
    fixedTo: Layover.propTypes.fixedTo,
    listZDepth: PropTypes.number,
    listHeightRestricted: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    cascading: PropTypes.bool,
    cascadingAnchor: Layover.propTypes.anchor,
    cascadingZDepth: PropTypes.number.isRequired,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
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
    anchor: {
      x: Layover.HorizontalAnchors.INNER_RIGHT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    cascadingAnchor: {
      x: Layover.HorizontalAnchors.RIGHT,
      y: Layover.VerticalAnchors.OVERLAP,
    },
    position: Layover.Positions.TOP_RIGHT,
    fixedTo: window,
    listZDepth: 2,
    listHeightRestricted: true,
    cascadingZDepth: 3,
  };

  static contextTypes = {
    listLevel: PropTypes.number,
    cascadingId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cascadingMenu: PropTypes.bool,
    cascadingAnchor: PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.string,
    }),
    cascadingZDepth: PropTypes.number,
  };

  static childContextTypes = {
    listLevel: PropTypes.number,
    cascadingId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cascadingMenu: PropTypes.bool,
    cascadingFixedTo: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.shape({
        x: PropTypes.object,
        y: PropTypes.object,
      }),
    ]),
    cascadingAnchor: PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.string,
    }),
    cascadingZDepth: PropTypes.number,
  };

  getChildContext() {
    const { cascading, id, fixedTo } = this.props;
    const listLevel = this.context.listLevel || 0;
    const cascadingMenu = typeof cascading !== 'undefined' ? cascading : this.context.cascadingMenu;
    const cascadingZDepth = getField(this.context, this.props, 'cascadingZDepth');
    const cascadingAnchor = getField(this.props, this.context, 'cascadingAnchor');
    const cascadingFixedTo = typeof fixedTo !== 'undefined' ? fixedTo : this.context.cascadingFixedTo;

    return {
      listLevel,
      cascadingId: `${id}-level-${listLevel + 1}`,
      cascadingMenu,
      cascadingAnchor,
      cascadingZDepth,
      cascadingFixedTo,
    };
  }

  componentDidMount() {
    this._container = findDOMNode(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _handleClose = (e) => {
    const { close, onClose } = this.props;
    if (close || onClose) {
      (close || onClose)(e);
    }
  };

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    let node = e.target;
    while (this._container && this._container.contains(node)) {
      if (node.classList.contains('md-list-control')) {
        return;
      } else if (
        !node.classList.contains('md-list-item--nested-container') &&
        node.classList.contains('md-list-item')
      ) {
        this._timeout = setTimeout(() => {
          this._timeout = null;
          this._handleClose(e);
        }, TICK);

        return;
      }

      node = node.parentNode;
    }
  };

  render() {
    const {
      id,
      className,
      listStyle,
      listClassName,
      visible,
      children,
      position,
      listZDepth,
      listHeightRestricted,
      isOpen, // deprecated
      /* eslint-disable no-unused-vars */
      fixedTo: propFixedTo,
      cascading,
      cascadingAnchor,
      cascadingZDepth,
      onClose,
      // deprecated
      close,
      autoclose,
      limitHeight,
      expanderIconChildren,
      expanderIconClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { listId } = this.props;
    if (!listId) {
      listId = `${id}-list`;
    }

    const fixedTo = typeof propFixedTo !== 'undefined' ? propFixedTo : this.context.cascadingFixedTo;
    const listVisible = typeof isOpen !== 'undefined' ? isOpen : visible;
    return (
      <Layover
        id={id}
        className={cn('md-menu-container', className)}
        {...props}
        fixedTo={fixedTo}
        onClick={this._handleClick}
        onClose={this._handleClose}
        animationPosition={position}
        visible={listVisible}
        aria-haspopup
        aria-expanded={listVisible}
        aria-owns={listId}
      >
        <List
          id={listId}
          key="menu-list"
          style={listStyle}
          className={cn('md-list--menu', {
            'md-list--menu-restricted': listHeightRestricted,
            [`md-paper md-paper--${listZDepth}`]: listZDepth,
          }, listClassName)}
        >
          {children}
        </List>
      </Layover>
    );
  }
}
