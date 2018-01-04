import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import TabIndicator from './TabIndicator';
import IconSeparator from '../Helpers/IconSeparator';
import ResizeObserver from '../Helpers/ResizeObserver';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import MenuTab from './MenuTab';
import TabOverflowButton from './TabOverflowButton';

const MOBILE_PADDING = 72;
const DESKTOP_PADDING = 80;
const MOBILE_TAB_MIN_WIDTH = 72;
const DESKTOP_TAB_MIN_WIDTH = 160;


/**
 * The `Tabs` component is used to manage the state of which tab is currently active.
 */
export default class Tabs extends PureComponent {
  static propTypes = {
    /**
     * A base id to use for each `Tab`. When the child tabs are created, they are cloned
     * with some additional accessibility props. Each tab will get a prop with this and the
     * current index of the tab.
     */
    tabId: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The className to use when a tab is currently active. The default className does not
     * actually apply any styles.
     *
     * If this prop is set, it will override any `activeClassName` props applied to the child
     * `Tab`s. Either set a custom `activeClassName` on each `Tab`, or use this prop to apply
     * the same `activeClassName` to each `Tab`.
     *
     * @see {@link Tabs/Tab#activeClassName}
     */
    activeTabClassName: PropTypes.string,

    /**
     * The className to use when the tab is not active and not selected. By default,
     * this will set inactive tabs' color to `$md-white-base`. This works great
     * if the tabs are placed on a colored toolbar but fails when the tabs are not colored
     * or on a white background. In these cases, it is recommended to change this value
     * to `md-text--secondary` or some other class name.
     *
     * If this prop is set, it will override any `inactiveClassName` props applied to the child
     * `Tab`s. Either set a custom `inactiveClassName` on each `Tab`, or use this prop to apply
     * the same `inactiveClassName` to each `Tab`.
     *
     * @see {@link Tabs/Tab#inactiveClassName}
     */
    inactiveTabClassName: PropTypes.string,

    /**
     * The component to render the tabs in.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * This should either be a single `Tab` component or a list of `Tab` components. Unfortunately,
     * the child *must* be exactly a `Tab` component because this is unable to extract the correct
     * `label` and `children` from a custom `Tab` component.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,

    /**
     * Boolean if the tabs should be centered instead of aligned to the keyline. The tabs will
     * only be aligned to the keyline when there are more than 3 tabs and the `alignToKeyline`
     * prop is `false`.
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the tabs should align to a toolbar's title keyline. If this is undefined,
     * the tabs will try to align to the keyline when there are more than 3 tabs.
     */
    alignToKeyline: PropTypes.bool,

    /**
     * Boolean if the tabs should be colored with the primary color. If this is false or undefined,
     * the tabs will be colored for the light or dark theme.
     */
    colored: PropTypes.bool,

    /**
     * A boolean if the overflow tabs on desktop displays should appear in a menu. If this is false,
     * the additional tabs will be available by using pagination buttons.
     */
    overflowMenu: PropTypes.bool,

    /**
     * An optional function to call when the active tab is changed. The callback will include
     * the new active tab index and a click event.
     *
     * ```js
     * onTabChange(newTabIndex, event);
     * ```
     */
    onTabChange: PropTypes.func,

    /**
     * An optional active tab index to use. If this is defined, it will make the component controlled
     * and require the `onTabChange` prop to be defined.
     */
    activeTabIndex: controlled(PropTypes.number, 'onTabChange', 'defaultTabIndex'),

    /**
     * The default tab index to use when the component is uncontrolled.
     */
    defaultTabIndex: PropTypes.number.isRequired,

    /**
     * When the `overflowMenu` prop is false, this will be used to render the "next slice of tabs"
     * when there are too many tabs to display at once on desktop screens.
     */
    nextIcon: PropTypes.element,

    /**
     * When the `overflowMenu` prop is false, this will be used to render the "previous slice of tabs"
     * when there are too many tabs to display at once on desktop screens.
     */
    previousIcon: PropTypes.element,

    /**
     * When the `overflowMenu` prop is true, this will be used to render the `MenuTab` overflow menu.
     * This will be to render the icon to the right of the label.
     */
    overflowMenuIcon: PropTypes.element,

    /**
     * When the `overflowMenu` prop is true, this will be used to render the `MenuTab` overflow menu.
     * This will be the text that displays as a tab.
     */
    overflowMenuLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the tabs are currently rendered on a mobile or tablet device. This is used to calculate
     * overflow/padding on the tabs.
     */
    mobile: PropTypes.bool,
    defaultMedia: deprecated(PropTypes.oneOf(['mobile', 'tablet', 'desktop']), 'Use `mobile` instead'),
    desktopMinWidth: deprecated(PropTypes.number, 'Use `mobile` instead.'),
    nextIconChildren: deprecated(PropTypes.node, 'Use the `nextIcon` prop instead'),
    nextIconClassName: deprecated(PropTypes.string, 'Use the `nextIcon` prop instead'),
    previousIconChildren: deprecated(PropTypes.node, 'Use the `previousIcon` prop instead'),
    previousIconClassName: deprecated(PropTypes.string, 'Use the `previousIcon` prop instead'),
    overflowMenuIconChildren: deprecated(PropTypes.node, 'Use the `overflowMenuIcon` prop instead'),
    overflowMenuIconClassName: deprecated(PropTypes.string, 'Use the `overflowMenuIcon` prop instead'),
  };

  static defaultProps = {
    component: 'ul',
    defaultTabIndex: 0,
    nextIcon: <FontIcon>keyboard_arrow_right</FontIcon>,
    previousIcon: <FontIcon>keyboard_arrow_left</FontIcon>,
    overflowMenuLabel: 'More',
    overflowMenuIcon: <FontIcon>arrow_drop_down</FontIcon>,
  };

  constructor(props) {
    super(props);

    const defaultTabIndex = typeof props.activeTabIndex === 'undefined' ? props.defaultTabIndex : props.activeTabIndex;
    const indicatorWidth = props.mobile ? MOBILE_TAB_MIN_WIDTH : DESKTOP_TAB_MIN_WIDTH;
    this.state = {
      indicatorWidth,
      indicatorOffset: indicatorWidth * defaultTabIndex,
      indicatorVisible: true,
      overflowIndex: 0,
    };

    if (typeof props.activeTabIndex === 'undefined') {
      this.state.activeTabIndex = defaultTabIndex;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeTabIndex !== nextProps.activeTabIndex) {
      this.setState({
        ...this._calcIndicatorPosition(this._container, 0, nextProps.activeTabIndex, this.state.overflowAtIndex),
      }, this._scrollActiveIntoView);
    } else if (!this._shouldAlign(nextProps) && this._shouldAlign(this.props)) {
      this.setState({ paddingLeft: null });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._shouldAlign(this.props) && this.state.overflowAtIndex !== prevState.overflowAtIndex) {
      const paddingLeft = this._calcPaddingLeft(this._container, this.state.mobile);
      // Have to wait for the overflow menus to appear, then wop
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ paddingLeft });
    } else {
      const labels = Children.map(Children.toArray(this.props.children), ({ props: { label } }) => label);
      const prevLabels = Children.map(Children.toArray(prevProps.children), ({ props: { label } }) => label);
      if (labels.length !== prevLabels.length || labels.filter((_, i) => labels[i] !== prevLabels[i]).length) {
        this.setState({
          ...this._calcIndicatorPosition(this._container, 0, this.props.activeTabIndex, this.state.overflowAtIndex),
        }, this._scrollActiveIntoView);
      }
    }
  }

  _shouldAlign(props) {
    return typeof props.alignToKeyline === 'boolean'
      ? props.alignToKeyline
      : Children.toArray(props.children).filter(child => !!child).length > 3;
  }

  _calcPaddingLeft(container, mobile) {
    const mediaPadding = mobile ? MOBILE_PADDING : DESKTOP_PADDING;
    const tab = container.querySelector('.md-tab');
    const { offsetLeft: labelOffset } = tab.querySelector('.md-tab-label');

    return mediaPadding - labelOffset;
  }

  _calcOverflowIndex(container, paddingLeft = 0, menu) {
    const containerWidth = container.offsetWidth;
    let overflowIndex = 0;
    if (containerWidth < container.scrollWidth) {
      const tabs = Array.prototype.slice.call(container.querySelectorAll('.md-tab'));
      let totalWidth = 0;
      tabs.some((tab, i) => {
        overflowIndex = i;
        totalWidth += tab.offsetWidth;

        return totalWidth > containerWidth;
      });
    }

    return Math.max(0, overflowIndex - (menu ? 1 : 0));
  }

  _calcIndicatorPosition(container, paddingLeft = 0, activeTabIndex, overflowAtIndex) {
    let activeItem;
    if (typeof activeTabIndex === 'number') {
      if (overflowAtIndex > 0 && activeTabIndex >= overflowAtIndex) {
        activeItem = container.querySelector('.md-menu--tab');
      } else {
        activeItem = container.querySelectorAll('.md-tab')[activeTabIndex];
      }
    } else {
      activeItem = container.querySelector('.md-tab--active');
    }

    if (!activeItem) {
      return { indicatorVisible: false };
    }

    const { offsetWidth: indicatorWidth, offsetLeft: indicatorOffset } = activeItem;
    return {
      indicatorWidth,
      indicatorOffset: indicatorOffset + paddingLeft,
      indicatorVisible: !overflowAtIndex || overflowAtIndex > activeTabIndex,
    };
  }

  _setContainer = (container) => {
    this._container = container;
    this._positionElements(this._container !== null);
  };

  _positionElements = (initialRender) => {
    initialRender = typeof initialRender === 'boolean' && initialRender;
    if (!this._container) {
      return;
    }

    const { centered, overflowMenu } = this.props;
    const { mobile } = this.props;

    let paddingLeft;
    if (!centered && this._shouldAlign(this.props)) {
      paddingLeft = this._calcPaddingLeft(this._container, mobile);
    }

    let overflowAtIndex;
    if (!mobile) {
      overflowAtIndex = this._calcOverflowIndex(this._container, paddingLeft, overflowMenu);
    }

    const indicatorPosition = this._calcIndicatorPosition(this._container, initialRender ? paddingLeft : 0);

    this.setState({ mobile, paddingLeft, overflowAtIndex, ...indicatorPosition }, this._scrollActiveIntoView);
  };

  _scrollActiveIntoView = () => {
    if (!this._container || !this.state.mobile) {
      return;
    }

    const active = this._container.querySelector('.md-tab--active');
    if (!active) {
      return;
    }

    const allTabs = Array.prototype.slice.call(this._container.querySelectorAll('.md-tab'));
    if (allTabs[0] === active) {
      this._container.scrollLeft = 0;
      return;
    }

    const { offsetWidth: containerWidth, scrollLeft } = this._container;
    const { offsetWidth: activeWidth, offsetLeft: activeOffset } = active;
    const inFullViewLeft = activeOffset - scrollLeft >= 0;
    const inFullViewRight = (activeOffset + activeWidth) - (containerWidth + scrollLeft) <= 0;
    if (inFullViewLeft && inFullViewRight) {
      return;
    }

    let offset = 0;
    allTabs.some((tab, i) => {
      if (i < this.props.activeTabIndex) {
        offset += tab.offsetWidth;
      }

      return i < this.state.activeTabIndex;
    });

    this._container.scrollLeft = offset;
  };

  _handleTabChange = (index, tabId, tabControlsId, tabChildren, event) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(index, tabId, tabControlsId, tabChildren, event);
    }

    if (typeof this.props.activeTabIndex === 'undefined') {
      this.setState({
        activeTabIndex: index,
        ...this._calcIndicatorPosition(this._container, 0, index, this.state.overflowAtIndex),
      });
    }
  };

  _mapToOverflowTabProps = (tab, i) => {
    const index = i + this.state.overflowAtIndex;
    const active = getField(this.props, this.state, 'activeTabIndex') === index;
    const tabEl = Children.only(tab);
    const handleTabChange = this._handleTabChange;

    return {
      active,
      primaryText: tabEl.props.label,
      onClick: function handleClick(event) {
        const { onClick, id, controlsId, children } = tabEl.props;
        if (onClick) {
          onClick(index, event);
        }

        handleTabChange(index, id, controlsId, children, event);
      },
    };
  };

  _nextIndexes = (increment) => {
    const { overflowIndex, overflowAtIndex } = this.state;
    const visibleAmt = (overflowAtIndex - overflowIndex) * (increment ? 1 : -1);

    this.setState({
      overflowIndex: overflowIndex + visibleAmt,
      overflowAtIndex: overflowAtIndex + visibleAmt,
    });
  };

  _showNextTabs = () => {
    this._nextIndexes(true);
  };

  _showPreviousTabs = () => {
    this._nextIndexes(false);
  };

  render() {
    const {
      indicatorOffset,
      indicatorWidth,
      indicatorVisible,
      overflowIndex,
      overflowAtIndex,
      paddingLeft,
    } = this.state;

    const {
      component: Component,
      style,
      className,
      activeTabClassName,
      inactiveTabClassName,
      colored,
      centered,
      tabId,
      overflowMenu,
      overflowMenuLabel,
      nextIcon,
      previousIcon,
      overflowMenuIcon,

      // deprecated
      overflowMenuIconChildren,
      overflowMenuIconClassName,
      nextIconChildren,
      nextIconClassName,
      previousIconChildren,
      previousIconClassName,
      /* eslint-disable no-unused-vars */
      activeTabIndex: propActiveIndex,
      defaultTabIndex,
      onTabChange,
      alignToKeyline,
      mobile,

      // Deprecated
      defaultMedia,
      desktopMinWidth,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const activeTabIndex = getField(this.props, this.state, 'activeTabIndex');

    let icon = false;
    let children = Children.map(Children.toArray(this.props.children), (tab, index) => {
      const handleOnClick = (tabIndex, id, tabControlsId, tabChildren, event) => {
        if (tab.props.onClick) {
          tab.props.onClick(tabId, id, tabControlsId, tabChildren, event);
        }

        this._handleTabChange(tabIndex, id, tabControlsId, tabChildren, event);
      };

      if (tab.props.icon) {
        icon = true;
      }

      return cloneElement(tab, {
        index,
        activeClassName: activeTabClassName,
        inactiveClassName: inactiveTabClassName,
        id: tab.props.id || `${tabId}-${index}`,
        controlsId: tab.props.controlsId || `${tabId}-panel-${index}`,
        active: index === activeTabIndex,
        onClick: handleOnClick,
      });
    });

    let overflow;
    let nextControl;
    let previousControl;
    if (overflowAtIndex) {
      const length = children.length;
      if (overflowMenu) {
        overflow = (
          <MenuTab
            id={`${tabId}-overflow-menu`}
            activeTabIndex={activeTabIndex}
            overflowAtIndex={overflowAtIndex}
            label={(
              <IconSeparator label={overflowMenuLabel}>
                {getDeprecatedIcon(overflowMenuIconClassName, overflowMenuIconChildren, overflowMenuIcon)}
              </IconSeparator>
            )}
            tabs={children.slice(overflowAtIndex, children.length).map(this._mapToOverflowTabProps)}
          />
        );
      }

      children = children.slice(overflowIndex, overflowAtIndex);

      if (!overflowMenu && overflowIndex > 0) {
        previousControl = (
          <TabOverflowButton
            left
            icon={icon}
            iconEl={getDeprecatedIcon(previousIconClassName, previousIconChildren, previousIcon)}
            onClick={this._showPreviousTabs}
          />
        );
      }

      if (!overflowMenu && length > 3 && overflowAtIndex + overflowIndex <= length) {
        nextControl = (
          <TabOverflowButton
            icon={icon}
            onClick={this._showNextTabs}
            iconEl={getDeprecatedIcon(nextIconClassName, nextIconChildren, nextIcon)}
          />
        );
      }
    }

    return (
      <Component
        {...props}
        style={{ ...style, paddingLeft }}
        className={cn('md-tabs', {
          'md-tabs--pagination': overflowAtIndex && !overflowMenu,
          'md-tabs--centered': centered,
          'md-background--primary': colored,
        }, className)}
        role="tablist"
      >
        <ResizeObserver watchWidth watchHeight onResize={this._positionElements} elRef={this._setContainer} />
        {previousControl}
        {children}
        {nextControl}
        {overflow}
        <TabIndicator offset={indicatorOffset} width={indicatorWidth} visible={indicatorVisible} />
      </Component>
    );
  }
}
