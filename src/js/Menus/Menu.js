import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { List } from '../Lists';

const ITEM_SCALE = 56;

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    let minWidth;
    if(props.minWidth) {
      minWidth = ITEM_SCALE * props.minWidth;
    }
    this.state = { minWidth };
  }

  static minWidths = [1.5, 2, 3, 6, 7];
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
    minWidth: PropTypes.oneOf(Menu.minWidths),
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

  componentDidMount() {
    if(this.props.isOpen && this.props.minWidth) {
      this.calcMinWidth();
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen, autoclose, close } = this.props;
    if(close && autoclose && isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.closeOnOutsideClick);
    } else if(!isOpen && prevProps.isOpen) {
      if(close && autoclose) {
        window.removeEventListener('click', this.closeOnOutsideClick);
      }

      if(!this.state.minWidth && this.props.minWidth) {
        this.calcMinWidth();
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
            {React.Children.map(children, (child, i) => {
              const { onClick } = child.props;
              let handleOnClick = onClick;
              if(close && autoclose && !child.props.nestedItems) {
                handleOnClick = (e) => {
                  if(onClick) { onClick(e); }

                  close(e);
                };
              }

              return React.cloneElement(child, {
                key: child.key || i,
                onClick: handleOnClick,
                expanderIconChildren,
                expanderIconClassName,
              });
            })}
          </List>
        }
      </CSSTransitionGroup>
    );
  }
}
