import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { FloatingButton } from '../Buttons';

export default class SpeedDial extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen };
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    initiallyOpen: PropTypes.bool,
    className: PropTypes.string,
    transitionName: PropTypes.string.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    speedDialTransitionName: PropTypes.string.isRequired,
    speedDialTransitionEnterTimeout: PropTypes.number.isRequired,
    speedDialTransitionLeaveTimeout: PropTypes.number.isRequired,
    passiveIconChildren: PropTypes.node,
    passiveIconClassName: PropTypes.node,
    activeIconChildren: PropTypes.node,
    activeIconClassName: PropTypes.string,
    fabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        onClick: PropTypes.func,
        iconClassName: PropTypes.string,
        children: PropTypes.node,
      }),
    ])).isRequired,
    onClick: PropTypes.func,
    onPassiveClick: PropTypes.func,
    onActiveClick: PropTypes.func,
    fabsValidator: function(props) {
      const size = props.fabs.length;
      if(size >= 3 && size <= 5) { return; }
      const middle = size < 3 ? 'at least 3' : 'no more than 5';
      return new Error(`A speed dial requires ${middle} floating action buttons to fling. However, only ${size} were given.`);
    },
    containerProps: PropTypes.object,
  };

  static defaultProps = {
    initiallyOpen: false,
    transitionName: 'md-fab-rotate',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    speedDialTransitionName: 'md-speed-dial',
    speedDialTransitionEnterTimeout: 450,
    speedDialTransitionLeaveTimeout: 150,
    passiveIconClassName: 'material-icons',
    activeIconClassName: 'material-icons',
  };

  isOpen = (props = this.props, state = this.state) => {
    return typeof props.isOpen === 'undefined' ? state.isOpen : props.isOpen;
  };

  handleClick = (e) => {
    const { onClick, onPassiveClick, onActiveClick } = this.props;
    if(onClick) {
      onClick(e);
    }

    const isOpen = this.isOpen();
    if(isOpen && onActiveClick) {
      onActiveClick(e);
    } else if(!isOpen && onPassiveClick) {
      onPassiveClick(e);
    }

    if(typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen: !isOpen });
    }
  };

  render() {
    const {
      fabs,
      passiveIconChildren,
      passiveIconClassName,
      activeIconChildren,
      activeIconClassName,
      transitionName,
      transitionEnterTimeout,
      speedDialTransitionName,
      speedDialTransitionEnterTimeout,
      speedDialTransitionLeaveTimeout,
      containerProps,
      ...props,
    } = this.props;

    const isOpen = this.isOpen();

    let speedDialFabs;
    if(isOpen) {
      speedDialFabs = fabs.map((fab, i) => {
        let fn, el, props;
        if(React.isValidElement(fab)) {
          el = React.Children.only(fab);
          fn = React.cloneElement;
          props = fab.props;
        } else {
          el = FloatingButton;
          fn = React.createElement;
          props = fab;
        }

        const created = fn(el, {
          mini: true,
          ...props,
        });
        return <div key={i} className="md-speed-dial-fab">{created}</div>;
      });
    }

    props.iconClassName = isOpen ? activeIconClassName : passiveIconClassName;
    props.children = isOpen ? activeIconChildren : passiveIconChildren;
    return (
      <CSSTransitionGroup
        {...containerProps}
        component="div"
        className={classnames('md-speed-dial', !!containerProps && containerProps.className)}
        transitionName={`${transitionName}-${isOpen ? 'right' : 'left'}`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeave={false}
        ref="container"
      >
        <CSSTransitionGroup
          component="div"
          key="speed-dial-fabs"
          transitionName={speedDialTransitionName}
          transitionEnterTimeout={speedDialTransitionEnterTimeout}
          transitionLeaveTimeout={speedDialTransitionLeaveTimeout}
        >
          {speedDialFabs}
        </CSSTransitionGroup>
        <FloatingButton {...props} key={`${isOpen ? 'open' : 'closed'}-fab`} onClick={this.handleClick} />
      </CSSTransitionGroup>
    );
  }
}
