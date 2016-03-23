import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { List } from '../Lists';

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
  };

  static propTypes = {
    className: PropTypes.string,
    listClassName: PropTypes.string,
    listStyle: PropTypes.object,
    children: PropTypes.node,
    toggle: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    style: PropTypes.object,
    position: PropTypes.oneOf(Object.keys(Menu.Positions).map(key => Menu.Positions[key])),
    close: PropTypes.func,
    autoclose: PropTypes.bool,
    below: PropTypes.bool,
    cascading: PropTypes.bool,
    expanderIconChildren: PropTypes.node,
    expanderIconClassName: PropTypes.string,
  };

  static defaultProps = {
    position: Menu.Positions.TOP_RIGHT,
    autoclose: true,
    expanderIconChildren: 'keyboard_arrow_right',
  };

  componentDidUpdate(prevProps) {
    const { isOpen, autoclose, close } = this.props;
    if(close && autoclose && isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.closeOnOutsideClick);
    } else if(!isOpen && prevProps.isOpen) {
      if(close && autoclose) {
        window.removeEventListener('click', this.closeOnOutsideClick);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnOutsideClick);
  }

  closeOnOutsideClick = (e) => {
    const container = ReactDOM.findDOMNode(this.refs.container);
    let target = e.target;
    while(target.parentNode) {
      if(target === container) { return; }
      target = target.parentNode;
    }

    this.props.close(e);
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
      below,
      cascading,
      expanderIconChildren,
      expanderIconClassName,
      ...props,
    } = this.props;

    const items = isOpen && React.Children.map(children, (child, key) => {
      return React.cloneElement(child, {
        key: child.key || key,
        onClick: (e) => {
          if(child.props.onClick) { child.props.onClick(e); }
          if(autoclose && typeof close === 'function' && !child.props.nestedItems) {
            close(e);
          }
        },
        expanderIconChildren,
        expanderIconClassName,
      });
    });

    return (
      <CSSTransitionGroup
        ref="container"
        component="div"
        transitionName="md-menu"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={classnames('md-menu-container', className)}
        {...props}
      >
        {toggle}
        {isOpen &&
          <List
            ref="list"
            className={classnames('md-menu', listClassName, `md-transition-${position}`, { below, cascading })}
            style={listStyle}
          >
            {items}
          </List>
        }
      </CSSTransitionGroup>
    );
  }
}
