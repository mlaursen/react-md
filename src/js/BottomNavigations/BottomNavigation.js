import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import { isBetween } from '../utils';
import BottomNav from './BottomNav';

/**
 * The `BottomNavigation` component is used when there are three to five
 * top-level destinations that require direct access on mobile devices.
 */
export default class BottomNavigation extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `CSSTransitionGroup` container.
     */
    containerStyle: PropTypes.object,

    /**
     * An optional className to apply to the `CSSTransitionGroup` container.
     * The container will always contain a className of `md-bottom-navigation-container`.
     */
    containerClassName: PropTypes.string,

    /**
     * The list of navigation actions to use. The custom validation throws warnings
     * if there are less than 3 or more than 5 actions. An action is the following shape:
     *
     * ```js
     * action: PropTypes.shape({
     *   label: PropTypes.string.isRequired,
     *   iconClassName: PropTypes.string,
     *   iconChildren: PropTypes.node,
     *   onClick: PropTypes.func,
     *   component: PropTypes.oneOfType([
     *     PropTypes.string,
     *     PropTypes.func,
     *   ]).isRequired,
     *   ...componentProps,
     * }),
     * ```
     *
     * The default component is a 'button'.
     */
    actions: (props, propName, component, ...others) => {
      const err = PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        iconClassName: PropTypes.string,
        iconChildren: PropTypes.node,
      })).isRequired(props, propName, component, ...others);

      if (err) {
        return err;
      } else if (!isBetween(props[propName].length, 3, 5)) {
        const l = props[propName].length;
        return new Error(
          `The '${component}' expects a number of actions between 3 and 5 but '${l}' were given.`
        );
      }

      return null;
    },

    /**
     * Boolean if the navigation actions should be colored.
     */
    colored: PropTypes.bool,

    /**
     * The initial active index for the bottom navigation. This will select one of
     * the tabs by default for an uncontrolled component.
     */
    initialActiveIndex: PropTypes.number.isRequired,

    /**
     * An active index for the bottom navigation. This will make the component controlled
     * and require the onChange function to be defined to switch the index.
     */
    activeIndex: PropTypes.number,

    /**
     * Boolean if the bottom navigation component is initially visible.
     */
    initiallyVisible: PropTypes.bool.isRequired,

    /**
     * The transition name to use for the `BottomNavigation` appearing/disappearing
     * when dynamic.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition enter timeout to use for the `BottomNavigation` appearing/disappearing
     * when dynamic.
     */
    transitionEnterTimeout: PropTypes.number.isRequired,

    /**
     * The transition leave timeout to use for the `BottomNavigation` appearing/disappearing
     * when dynamic.
     */
    transitionLeaveTimeout: PropTypes.number.isRequired,

    /**
     * Boolean if the `BottomNavigation` is dynamic. This means that when the user scrolls
     * downwards, the component will be hidden. When the user scrolls upwards, the component
     * will be visible again.
     */
    dynamic: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the active action is changed. This function
     * is called with the new `activeIndex`.
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    transitionName: 'bottom-navigation',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
    dynamic: true,
    initialActiveIndex: 0,
    initiallyVisible: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.initialActiveIndex,
      visible: props.initiallyVisible,
      pageY: null,
      scrolling: false,
    };

    this._addTouchEvents = this._addTouchEvents.bind(this);
    this._removeTouchEvents = this._removeTouchEvents.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleNavChange = this._handleNavChange.bind(this);
  }

  componentDidMount() {
    if (this.props.dynamic) {
      this._addTouchEvents();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dynamic === nextProps.dynamic) { return; }
    if (nextProps.dynamic) {
      this._addTouchEvents();
    } else {
      this._removeTouchEvents();
    }
  }

  componentWillUnmount() {
    if (this.props.dynamic) {
      this._removeTouchEvents();
    }
  }

  _addTouchEvents() {
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  }

  _removeTouchEvents() {
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }

  _handleTouchStart(e) {
    const { pageY } = e.changedTouches[0];

    this.setState({ pageY, scrolling: true });
  }

  _handleTouchMove(e) {
    const { scrolling, visible, pageY } = this.state;
    if (!scrolling) { return; }

    const touchY = e.changedTouches[0].pageY;
    if ((visible && pageY > touchY) || (!visible && pageY < touchY)) {
      this.setState({ visible: !visible, pageY: touchY });
    }
  }

  _handleTouchEnd() {
    if (!this.state.scrolling) { return; }
    this.setState({ pageY: null, scrolling: false });
  }

  _getActiveIndex(props, state) {
    return (typeof props.active !== 'undefined' ? props : state).activeIndex;
  }

  _handleNavChange(index) {
    const activeIndex = this._getActiveIndex(this.props, this.state);
    if (activeIndex === index) { return; }

    if (this.props.onChange) {
      this.props.onChange(index);
    }

    this.setState({ activeIndex: index });
  }

  render() {
    const { visible } = this.state;
    const {
      style,
      className,
      containerStyle,
      containerClassName,
      colored,
      actions,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props,
    } = this.props;
    delete props.initialActiveIndex;
    delete props.initiallyVisible;
    delete props.active;
    delete props.activeIndex;
    delete props.dynamic;

    const activeIndex = this._getActiveIndex(this.props, this.state);

    const fixed = actions.length === 3;
    const navs = actions.map((actionProps, i) => (
      <BottomNav
        key={i}
        index={i}
        {...actionProps}
        onNavChange={this._handleNavChange}
        active={activeIndex === i}
        colored={colored}
        fixed={fixed}
      />
    ));

    let nav;
    if (visible) {
      nav = (
        <footer
          key="nav"
          style={style}
          className={cn('md-bottom-navigation', className, {
            colored,
            'default': !colored,
          })}
        >
          {navs}
        </footer>
      );
    }

    return (
      <CSSTransitionGroup
        style={containerStyle}
        className={cn('md-bottom-navigation-container', containerClassName)}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        {...props}
      >
        {nav}
      </CSSTransitionGroup>
    );
  }
}
