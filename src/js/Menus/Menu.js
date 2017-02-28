import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import LayoverPositions from '../constants/LayoverPositions';
import TICK from '../constants/CSSTransitionGroupTick';
import List from '../Lists/List';
import Layover from '../Helpers/Layover';

export default class Menu extends PureComponent {
  static Positions = {
    ...LayoverPositions,
    CONTEXT: 'context',
  };
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
    style: PropTypes.object,
    className: PropTypes.string,
    listStyle: PropTypes.object,
    listClassName: PropTypes.string,
    listProps: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    cascading: PropTypes.bool,
    restrictHeight: PropTypes.bool,
    position: PropTypes.oneOf([
      Menu.Positions.TOP_LEFT,
      Menu.Positions.TOP_RIGHT,
      Menu.Positions.BOTTOM_LEFT,
      Menu.Positions.BOTTOM_RIGHT,
      Menu.Positions.BELOW,
      Menu.Positions.CONTEXT,
    ]).isRequired,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
  };

  static defaultProps = {
    restrictHeight: true,
    position: Menu.Positions.TOP_RIGHT,
  };

  static childContextTypes = {
    cascading: PropTypes.bool,
    menu: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this._setContainer = this._setContainer.bind(this);
    this._handleListClick = this._handleListClick.bind(this);
  }

  getChildContext() {
    const { cascading } = this.props;
    return { cascading, menu: true };
  }

  _setContainer(container) {
    this._container = findDOMNode(container);
  }

  _handleListClick(e) {
    let node = e.target;
    while (this._container.contains(node)) {
      if (node.classList.contains('md-list-item') && !node.classList.contains('md-list-item--cascading')) {
        this._timeout = setTimeout(() => {
          this.props.onClose(e);
        }, TICK);

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
      listProps,
      visible,
      isOpen,
      children,
      fullWidth,
      restrictHeight,
      position,
      /* eslint-disable no-unused-vars */
      cascading,
      listId: propListId,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { listId } = this.props;
    if (!listId) {
      listId = `${id}-list`;
    }

    const isContext = position === Menu.Positions.CONTEXT;
    let toggleQuery;
    if (isContext) {
      toggleQuery = `${Layover.defaultProps.toggleQuery},*`;
    }

    return (
      <Layover
        {...props}
        id={id}
        block={fullWidth}
        visible={isOpen || visible}
        ref={this._setContainer}
        className={cn({
          'md-full-width': fullWidth,
        }, className)}
        animationPosition={isContext ? Menu.Positions.BELOW : position}
        toggleQuery={toggleQuery}
      >
        <List
          id={listId}
          style={listStyle}
          className={cn({
            'md-list--menu': restrictHeight,
          }, listClassName)}
          {...listProps}
          onClick={this._handleListClick}
        >
          {children}
        </List>
      </Layover>
    );
  }
}
