import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import Portal from '../Helpers/Portal';
import Paper from '../Papers/Paper';
import BottomNav from './BottomNav';

/**
 * The `BottomNavigation` component is an alternative to the `NavigationDrawer` for handling navigation
 * only on mobile devices.
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
     * A list of objects to generate a bottom navigation link. There must be at least 3 and no more
     * than 5 links. A link gets rendered as the `AccessibleFakeButton` component, so any additional
     * props in the link's shape will be passed along.
     *
     * ```docgen
     * PropTypes.arrayOf(PropTypes.shape({
     *   label: PropTypes.node.isRequired,
     *   iconChildren: PropTypes.node,
     *   iconClassName: PropTypes.string,
     *   component: PropTypes.oneOfType([
     *      PropTypes.func,
     *      PropTypes.string,
     *   ]),
     * }).isRequired
     * ```
     */
    links: (props, propName, component, ...args) => {
      const links = props[propName] || props.actions;
      const len = links.length;

      if (len < 3) {
        return new Error(
          `Only ${len} \`${propName}\` were given to the ${component}. At least 3 are required.`
        );
      } else if (len > 5) {
        return new Error(
          `${len} \`${propName}\` were given to the ${component}. No more than 5 may be given.`
        );
      }

      return PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.node.isRequired,
        iconChildren: PropTypes.node,
        iconClassName: PropTypes.string,
        component: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.string,
        ]),
      })).isRequired(props, propName, component, ...args);
    },

    /**
     * Boolean if the bottom navigation should be colored with the primary color or whatever color
     * was a result of the `react-md-theme-bottom-navigations-colored` mixin.
     */
    colored: PropTypes.bool,

    /**
     * Boolean if the bottom navigation should dynamically appear based on scrolling. When the user
     * scrolls the `dynamicThreshold` amount, this component will either disappear (scrolling down)
     * or appera (scrolling up).
     */
    dynamic: PropTypes.bool,

    /**
     * The distance a user must scroll before the bottom navigation appears or disappears when it is `dyanamic`.
     */
    dynamicThreshold: PropTypes.number.isRequired,

    /**
     * An optional function to call when a link has been clicked. The callback will
     * include the new active index and the click event.
     *
     * ```js
     * onNavChange(newActiveIndex, event);
     * ```
     */
    onNavChange: PropTypes.func,

    /**
     * An optional active index to use. This will make the component controlled and require the
     * `onNavChange` prop to be defined.
     */
    activeIndex: controlled(PropTypes.number, 'onNavChange', 'defaultActiveIndex'),

    /**
     * The index for the link that is active by default.
     */
    defaultActiveIndex: PropTypes.number.isRequired,

    /**
     * Boolean if the bottom navigation is visible by default. This *should* probably always
     * be true.
     */
    defaultVisible: PropTypes.bool.isRequired,

    /**
     * The component to render the bottom navigation as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Since the `BottomNavigation` component uses the `Portal` component, you can pass an optional
     * HTML Node to render in.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the bottom navigation should render as the last child in the `renderNode` or `body`
     * instead of as the first.
     */
    lastChild: PropTypes.bool,

    /**
     * The transition duration for the dynamic bottom navigation to appear or disappear. This should
     * match the `$md-bottom-navigation-transition-time` variable.
     */
    transitionDuration: PropTypes.number.isRequired,

    /**
     * An optional function to call when the visibility of the bottom navigation changes. The callback
     * will include the new visibility.
     *
     * ```js
     * onVisibilityChange(!visible);
     * ```
     */
    onVisibilityChange: PropTypes.func,

    onChange: deprecated(PropTypes.func, 'Use `onNavChange` instead'),
    initiallyVisible: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    initialActiveIndex: deprecated(PropTypes.number, 'Use `defaultActiveIndex` instead'),
    containerStyle: deprecated(PropTypes.object, 'Use `style` instead'),
    containerClassName: deprecated(PropTypes.string, 'Use `className` instead'),
    transitionName: deprecated(PropTypes.string, 'There is no CSSTransitionGroup used anymore'),
    transitionEnterTimeout: deprecated(PropTypes.number, 'Use `transitionDuration` instead'),
    transitionLeaveTimeout: deprecated(PropTypes.number, 'Use `transitionDuration` instead'),
    actions: deprecated(PropTypes.array, 'Use `links` instead'),
  };

  static defaultProps = {
    defaultActiveIndex: 0,
    component: 'footer',
    defaultVisible: true,
    transitionDuration: 300,
    dynamicThreshold: 20,
  };

  static contextTypes = {
    renderNode: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const visible = typeof props.initiallyVisible === 'boolean' ? props.initiallyVisible : props.defaultVisible;
    this.state = {
      visible,
      portalVisible: visible,
    };
    if (typeof props.activeIndex === 'undefined') {
      this.state.activeIndex = props.defaultActiveIndex;
    }

    this._handleNavChange = this._handleNavChange.bind(this);
    this._addTouchEvents = this._addTouchEvents.bind(this);
    this._removeTouchEvents = this._removeTouchEvents.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
  }

  componentDidMount() {
    if (this.props.dynamic) {
      this._addTouchEvents();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dynamic } = nextProps;
    if (this.props.dynamic === dynamic) {
      return;
    }

    if (dynamic) {
      this._addTouchEvents();
    } else {
      this._removeTouchEvents();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.visible !== nextState.visible && nextProps.onVisibilityChange) {
      nextProps.onVisibilityChange(nextState.visible);
    }
  }

  componentWillUnmount() {
    if (this.props.dynamic) {
      this._removeTouchEvents();
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _addTouchEvents() {
    window.addEventListener('touchstart', this._handleTouchStart);
    window.addEventListener('touchmove', this._handleTouchMove);
    window.addEventListener('touchend', this._handleTouchEnd);
  }

  _removeTouchEvents() {
    window.removeEventListener('touchstart', this._handleTouchStart);
    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('touchend', this._handleTouchEnd);
  }

  _handleTouchStart(e) {
    const { pageY } = e.changedTouches[0];

    this._pageY = pageY;
    this._scrolling = true;
  }

  _handleTouchMove(e) {
    const { visible } = this.state;
    if (!this._scrolling) {
      return;
    }

    const touchY = e.changedTouches[0].pageY;
    const { transitionDuration, dynamicThreshold } = this.props;
    const passedThreshold = Math.abs(this._pageY - touchY) >= dynamicThreshold;
    if (this._pageY > touchY && visible && passedThreshold) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = setTimeout(() => {
        this._timeout = null;
        this.setState({ portalVisible: false });
      }, transitionDuration);

      this._pageY = touchY;
      this.setState({ visible: false });
    } else if (this._pageY < touchY && !visible && passedThreshold) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = setTimeout(() => {
        this._timeout = null;
        this.setState({ visible: true });
      }, 17);

      this._pageY = touchY;
      this.setState({ portalVisible: true });
    }
  }

  _handleTouchEnd() {
    this._scrolling = false;
  }

  _handleNavChange(index, e) {
    if (this.props.onNavChange || this.props.onChange) {
      (this.props.onNavChange || this.props.onChange)(index, e);
    }

    if (typeof this.props.activeIndex === 'undefined') {
      this.setState({ activeIndex: index });
    }
  }

  render() {
    const { visible, portalVisible } = this.state;
    const {
      className,
      actions,
      colored,
      dynamic,
      lastChild,
      ...props
    } = this.props;
    delete props.links;
    delete props.activeIndex;
    delete props.onNavChange;
    delete props.onVisibilityChange;
    delete props.defaultVisible;
    delete props.defaultActiveIndex;
    delete props.dynamicThreshold;
    delete props.transitionDuration;
    delete props.renderNode;

    // Delete deprecated
    delete props.onChange;
    delete props.initiallyVisible;
    delete props.containerStyle;
    delete props.containerClassName;
    delete props.transitionName;
    delete props.transitionEnterTimeout;
    delete props.transitionLeaveTimeout;

    let { links } = this.props;
    if (actions) {
      links = actions;
    }

    const fixed = links.length === 3;
    const activeIndex = getField(this.props, this.state, 'activeIndex');
    const renderNode = getField(this.props, this.context, 'renderNode');

    return (
      <Portal renderNode={renderNode} visible={portalVisible} lastChild={lastChild}>
        <Paper
          {...props}
          className={cn('md-bottom-navigation', {
            'md-background--card': !colored,
            'md-background--primary': colored,
            'md-bottom-navigation--dynamic': dynamic,
            'md-bottom-navigation--dynamic-inactive': dynamic && !visible,
          }, className)}
          role="navigation"
        >
          {links.map((action, index) => (
            <BottomNav
              {...action}
              key={action.key || index}
              index={index}
              onNavChange={this._handleNavChange}
              active={activeIndex === index}
              colored={colored}
              fixed={fixed}
            />
          ))}
        </Paper>
      </Portal>
    );
  }
}
