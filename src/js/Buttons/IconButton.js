import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcon';
import { LEFT_CLICK } from '../constants/keyCodes';

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { ink: false, inkStyle: {} };
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tooltipPosition: PropTypes.string,
    tooltip: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'button',
  };

  handleMouseDown = (e) => {
    if(e.button !== LEFT_CLICK) { return ; }
    let inkStyle = Object.assign({}, this.state.inkStyle);
    const button = ReactDOM.findDOMNode(this);
    const size = inkStyle.width || Math.max(button.offsetWidth, button.offsetHeight);
    if(!inkStyle.width || !inkStyle.height) {
      inkStyle.width = size;
      inkStyle.height = size;
    }

    //inkStyle.top = e.pageY - button.offsetTop - size / 2;
    //inkStyle.left = e.pageX - button.offsetLeft - size / 2;

    this.inkTimeout = setTimeout(() => {
      this.setState({ pulse: true });
    }, 450);
    this.setState({ ink: true, inkStyle, pulse: false });
  };

  handleMouseUp = (e) => {
    if(e.button !== LEFT_CLICK) { return ; }
    if(this.inkTimeout) {
      clearTimeout(this.inkTimeout);
    }
    this.setState({ ink: false });
  };

  render() {
    const { iconClassName, children, className, href, type, ...props } = this.props;
    let btnProps = {
      ...props,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      className: classnames(className, 'md-btn', 'md-btn-icon'),
      transitionName: 'md-ink',
      transitionEnterTimeout: 600,
      transitionLeave: false,
    };

    if(href) {
      btnProps.href = href;
    } else {
      btnProps.type = type;
    }
    const { inkStyle, ink, pulse } = this.state;

    return (
      <CSSTransitionGroup component={href ? 'a' : 'button'} {...btnProps}>
        {ink && <span className={classnames('md-ink', { pulse })} key="ink" style={inkStyle} />}
        <FontIcon key="icon" iconClassName={iconClassName}>{children}</FontIcon>
      </CSSTransitionGroup>
    );
  }
}
