import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { FloatingButton } from '../Buttons';

/**
 * Any props such as style or event listeners will be applied to the
 * main floating action button. If you want props applied to the `SpeedDial`
 * itself, you will need to set them in the `containerProps` prop.
 */
export default class SpeedDial extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen };
  }

  static propTypes = {
    /**
     * A boolean if the speed dial is currently open. This will make
     * the speed dial into a controlled component.
     */
    isOpen: PropTypes.bool,

    /**
     * Boolean if the uncontrolled speed dial is initially open.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * An optional className to apply to the speed dial.
     */
    className: PropTypes.string,

    /**
     * The speed dial's floating action button transition name when the button's
     * open state changes. If the button is open, `-right` is appened, otherwise
     * `-left`.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The timeout for the speed dial's floating action button transition.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The name for the flinging animation of the speed dial.
     */
    speedDialTransitionName: PropTypes.string.isRequired,

    /**
     * The timeout for the flinging animation of the speed dial when opening.
     */
    speedDialTransitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The timeout for the flinging animation when the speed dial is closing.
     */
    speedDialTransitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * The optional children to display for unopened speed dial floating action button.
     */
    passiveIconChildren: PropTypes.node,

    /**
     * The optional icon className to display for unopened speed dial floating action button.
     */
    passiveIconClassName: PropTypes.node,

    /**
     * The optional children to display for opened speed dial floating action button.
     */
    activeIconChildren: PropTypes.node,

    /**
     * The optional icon className to display for opened speed dial floating action button.
     */
    activeIconClassName: PropTypes.string,

    /**
     * A list of `FloatingButton` or props to generate the `FloatinButton` when the
     * `SpeedDial` is open. The buttons will automatically be converted to the `mini`
     * version.
     */
    fabs: (props, propName, component) => {
      const size = props.fabs.length;
      if(size >= 3 && size <= 5) {
        return PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.shape({
            onClick: PropTypes.func,
            iconClassName: PropTypes.string,
            children: PropTypes.node,
          }),
        ])).isRequired(props, propName, component);
      }

      const middle = size < 3 ? 'at least 3' : 'no more than 5';
      return new Error(`A speed dial requires ${middle} floating action buttons to fling. However, only ${size} were given.`);
    },

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onPassiveClick: PropTypes.func,

    /**
     * An optional function to call when the main floating action button is clicked.
     */
    onActiveClick: PropTypes.func,

    /**
     * Any additional props to apply to the speed dial itself.
     */
    containerProps: PropTypes.object,
  };

  static defaultProps = {
    initiallyOpen: false,
    transitionName: 'md-fab-rotate',
    transitionEnterTimeout: 150,
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
    delete props.isOpen;
    delete props.initiallyOpen;

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
