import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import Button from '../Buttons/Button';

/**
 * Any props such as style or event listeners will be applied to the
 * main floating action button. If you want props applied to the `SpeedDial`
 * itself, you will need to set them in the `containerProps` prop.
 */
export default class SpeedDial extends PureComponent {
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
    fabs: (props, propName, component, ...others) => {
      const size = props.fabs.length;
      if (size >= 3 && size <= 5) {
        return PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.shape({
            onClick: PropTypes.func,
            iconClassName: PropTypes.string,
            children: PropTypes.node,
          }),
        ])).isRequired(props, propName, component, ...others);
      }

      const middle = size < 3 ? 'at least 3' : 'no more than 5';
      return new Error(
        `A speed dial requires ${middle} floating action buttons to fling. ` +
        `However, only ${size} were given.`
      );
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

  constructor(props) {
    super(props);

    this.state = { isOpen: props.initiallyOpen };
    this._handleClick = this._handleClick.bind(this);
  }

  _isOpen(props, state) {
    return typeof props.isOpen === 'undefined' ? state.isOpen : props.isOpen;
  }

  _handleClick(e) {
    const { onClick, onPassiveClick, onActiveClick } = this.props;
    if (onClick) {
      onClick(e);
    }

    const isOpen = this._isOpen(this.props, this.state);
    if (isOpen && onActiveClick) {
      onActiveClick(e);
    } else if (!isOpen && onPassiveClick) {
      onPassiveClick(e);
    }

    if (typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen: !isOpen });
    }
  }

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
      ...props
    } = this.props;
    delete props.isOpen;
    delete props.initiallyOpen;

    const isOpen = this._isOpen(this.props, this.state);

    let speedDialFabs;
    if (isOpen) {
      speedDialFabs = fabs.map((fab, i) => {
        let fn;
        let el;
        let fabProps;
        if (React.isValidElement(fab)) {
          el = React.Children.only(fab);
          fn = React.cloneElement;
          fabProps = fab.props;
        } else {
          el = Button;
          fn = React.createElement;
          fabProps = fab;
        }

        const created = fn(el, {
          floating: true,
          mini: true,
          ...fabProps,
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
        className={cn('md-speed-dial', !!containerProps && containerProps.className)}
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
        <Button
          {...props}
          floating
          key={`${isOpen ? 'open' : 'closed'}-fab`}
          onClick={this._handleClick}
        />
      </CSSTransitionGroup>
    );
  }
}
