import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { List } from '../Lists';

const ITEM_SCALE = 56;
import { isPropEnabled } from '../utils';

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
  static positions = ['tr', 'tl', 'br', 'bl'];

  static propTypes = {
    className: PropTypes.string,
    listClassName: PropTypes.string,
    children: PropTypes.node,
    toggle: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    isBelow: PropTypes.bool,
    style: PropTypes.object,
    minWidth: PropTypes.oneOf(Menu.minWidths),
    position: PropTypes.oneOf(Menu.positions),
    close: PropTypes.func,
    autoclose: PropTypes.bool,
  };

  static defaultProps = {
    position: Menu.positions[0],
    autoclose: true,
  };

  componentDidMount() {
    if(this.props.isOpen) {
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

      if(!this.state.minWidth) {
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

  calcMinWidth = () => {
    const items = ReactDOM.findDOMNode(this.refs.list).querySelectorAll('.md-list-tile');
    let maxWidth = 0;
    for(let item of items) {
      maxWidth = Math.max(maxWidth, item.offsetWidth);
    }

    let minWidth;
    for(let i = 0; i < Menu.minWidths.length; i++) {
      minWidth = ITEM_SCALE * Menu.minWidths[i];
      if(maxWidth < minWidth) {
        break;
      }
    }

    this.setState({ minWidth });
  };

  render() {
    const { className, listClassName, children, toggle, isOpen, position, close, autoclose, ...props } = this.props;

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
            className={classnames('md-menu', listClassName, `md-transition-${position}`, {
              'below': isPropEnabled(props, 'below'),
              'cascading': isPropEnabled(props, 'cascading'),
            })}
            ref="list"
            style={{ minWidth: this.state.minWidth }}
          >
            {React.Children.map(children, (child, i) => {
              const { onClick } = child.props;
              let handleOnClick = onClick;
              if(close && autoclose) {
                handleOnClick = (e) => {
                  if(onClick) { onClick(e); }

                  close(e);
                };
              }
              return React.cloneElement(child, {
                key: child.key || i,
                onClick: handleOnClick,
              });
            })}
          </List>
        }
      </CSSTransitionGroup>
    );
  }
}
