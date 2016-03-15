import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { FloatingButton } from '../Buttons';

export default class SpeedDial extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {};
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    transitionName: PropTypes.string.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    speedDialTransitionName: PropTypes.string.isRequired,
    speedDialTransitionEnterTimeout: PropTypes.number.isRequired,
    speedDialTransitionLeaveTimeout: PropTypes.number.isRequired,
    passiveIconChildren: PropTypes.node.isRequired,
    passiveIconClassName: PropTypes.node.isRequired,
    activeIconChildren: PropTypes.node.isRequired,
    activeIconClassName: PropTypes.string.isRequired,
    fabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        onClick: PropTypes.func,
        iconClassName: PropTypes.string,
        children: PropTypes.node,
      }),
    ])).isRequired,
    fabsValidator: function(props) {
      const size = props.fabs.length;
      if(size >= 3 && size <= 5) { return; }
      const middle = size < 3 ? 'at least 3' : 'no more than 5';
      return new Error(`A speed dial requires ${middle} floating action buttons to fling. However, only ${size} were given.`);
    },
  };

  static defaultProps = {
    transitionName: 'md-fab-rotate',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    speedDialTransitionName: 'md-speed-dial',
    speedDialTransitionEnterTimeout: 450,
    speedDialTransitionLeaveTimeout: 150,
    passiveIconClassName: 'material-icons',
    activeIconClassName: 'material-icons',
  };

  render() {
    const {
      fabs,
      isOpen,
      passiveIconChildren,
      passiveIconClassName,
      activeIconChildren,
      activeIconClassName,
      transitionName,
      transitionEnterTimeout,
      speedDialTransitionName,
      speedDialTransitionEnterTimeout,
      speedDialTransitionLeaveTimeout,
      ...props,
    } = this.props;

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

        return fn(el, {
          ...props,
          className: classnames('md-speed-dial-fab', props.className),
          key: el.key || i,
          mini: true,
        });
      });
    }

    props.iconClassName = isOpen ? activeIconClassName : passiveIconClassName;
    props.children = isOpen ? activeIconChildren : passiveIconChildren;
    return (
      <CSSTransitionGroup
        component="div"
        className="md-speed-dial"
        transitionName={`${transitionName}-${isOpen ? 'right' : 'left'}`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeave={false}
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
        <FloatingButton {...props} key={`${isOpen ? 'open' : 'closed'}-fab`} />
      </CSSTransitionGroup>
    );
  }
}
