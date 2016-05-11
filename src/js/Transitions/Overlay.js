import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

export default class Overlay extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    transitionName: PropTypes.string.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    overlayStyle: PropTypes.object,
    overlayClassName: PropTypes.string,
  };

  static defaultProps = {
    component: 'span',
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  render() {
    const {
      isOpen,
      component,
      style,
      className,
      overlayStyle,
      overlayClassName,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props,
    } = this.props;

    let overlay;
    if(isOpen) {
      const overlayProps = {
        key: 'overlay',
        style: overlayStyle,
        className: classnames('md-overlay', overlayClassName),
        ...props,
      };

      overlay = <div {...overlayProps} />;
    }

    return (
      <CSSTransitionGroup
        component={component}
        style={style}
        className={className}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {overlay}
      </CSSTransitionGroup>
    );
  }
}
