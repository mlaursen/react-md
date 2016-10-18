import React, { PureComponent, PropTypes, isValidElement, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { DESKTOP_MIN_WIDTH } from '../constants/media';
import isBetween from '../utils/NumberUtils/isBetween';
import FontIcon from '../FontIcons';
import IconSeparator from '../Helpers/IconSeparator';
import Tab from './Tab';
import MenuTab from './MenuTab';
import Button from 'react-md/lib/Buttons/Button';
import TabIndicator from './TabIndicator';

const MOBILE_PADDING = 72;
const DESKTOP_PADDING = 80;
const BUFFER = 80;

/**
 * The `Tabs` component is a controlled component because of the general use case for tabs.
 */
export default class Tabs extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the tabs block.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the tabs block.
     */
    className: PropTypes.string,

    /**
     * The current active tab index.
     */
    activeTabIndex: PropTypes.number.isRequired,

    /**
     * A function to call when a new tab has been clicked. The callback will include
     * the newly selected tab index, the children prop of the tab, and the click event.
     *
     * ```js
     * onChange(3, children, event);
     * ```
     */
    onChange: PropTypes.func.isRequired,

    /**
     * A list of tabs to use. This can either be a `Tab`/valid React element, a string, or an object
     * of props to generate a `Tab`.
     */
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.node,
      }),
    ])).isRequired,

    /**
     * The component to render the tabs block as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Boolean if the tabs are colored with the primary color.
     */
    colored: PropTypes.bool,

    /**
     * Boolean if the tabs are centered within the tab block instead aligning to the keyline.
     */
    centered: PropTypes.bool,

    /**
     * The default media type to render the tabs for. This is really used for server side rendering because
     * once the component mounts, it will update itself to the correct media type.
     *
     * If the media type is `mobile` or `tablet`, any overflown tabs will be accessible by touch-scrolling
     * the tabs.
     *
     * If the media type is `desktop`, the overflow tabs will either be accessible by clicking a drop down menu
     * of remaining tabs or by clicking a button that will display the next or previous tabs.
     */
    defaultMedia: PropTypes.oneOf(['mobile', 'tablet', 'desktop']).isRequired,

    /**
     * The min width for a desktop display. This should match the `$md-desktop-min-width` variable.
     */
    desktopMinWidth: PropTypes.number.isRequired,

    /**
     * Boolean if the desktop's tab overflow should be rendered using a drop down menu or by pagination.
     */
    desktopMenuOverflow: PropTypes.bool,
  };

  static defaultProps = {
    component: 'ul',
    colored: true,
    defaultMedia: 'mobile',
    desktopMinWidth: DESKTOP_MIN_WIDTH,
    tabs: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      indicatorWidth: 0,
      indicatorOffset: 0,
      overflowIndex: 0,
      touch: props.defaultMedia !== 'desktop',
    };

    this._initialRender = true;
    this._handleResize = this._handleResize.bind(this);
    this._positionElements = this._positionElements.bind(this);
    this._mapToTab = this._mapToTab.bind(this);
    this._extractTabProps = this._extractTabProps.bind(this);
    this._setContainer = this._setContainer.bind(this);
    this._scrollActiveIntoView = this._scrollActiveIntoView.bind(this);
    this._showNextTabs = this._showNextTabs.bind(this);
    this._showPreviousTabs = this._showPreviousTabs.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({ touch: this._isTouch(this.props) });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
    this._positionElements();
  }

  componentDidUpdate(prevProps) {
    if (this._resized || this.props.activeTabIndex !== prevProps.activeTabIndex) {
      // Have to wait for visual updates before calcing position.
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ ...this._calcIndicatorPosition(this._container) }, this._scrollActiveIntoView);
    }

    this._resized = false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _isTouch(props) {
    const { desktopMinWidth: min } = props;
    return typeof window !== 'undefined' && !window.matchMedia(`screen and (min-width: ${min}px)`).matches;
  }

  _calcPaddingLeft(container, touch) {
    const mediaPadding = touch ? MOBILE_PADDING : DESKTOP_PADDING;
    const tab = container.querySelector('.md-tab');
    const { offsetLeft: labelOffset } = tab.querySelector('.md-tab-label');
    const tabWidth = tab.offsetWidth / 2;
    const tabPadding = parseInt(window.getComputedStyle(tab).getPropertyValue('padding-left'), 10);
    if (labelOffset === tabPadding) {
      return mediaPadding - tabPadding;
    }

    // It's off by 2 for some reason..
    return mediaPadding - tabPadding - (tabWidth - labelOffset) - 2;
  }

  _calcOverflowIndex(container, paddingLeft = 0, menu) {
    const containerWidth = container.offsetWidth - paddingLeft;
    let overflowIndex = 0;
    if (containerWidth < container.scrollWidth) {
      const tabs = Array.prototype.slice.call(container.querySelectorAll('.md-tab'));
      let totalWidth = 0;
      tabs.some((tab, i) => {
        overflowIndex = i;
        totalWidth += tab.offsetWidth;

        return totalWidth > containerWidth - BUFFER;
      });
    }

    return Math.max(0, overflowIndex - (menu ? 1 : 0));
  }

  _calcIndicatorPosition(container, paddingLeft = 0) {
    const activeItem = container && container.querySelector('.md-tab--active');
    if (!activeItem) {
      return {};
    }

    const { offsetWidth: indicatorWidth, offsetLeft: indicatorOffset } = activeItem;
    return { indicatorWidth, indicatorOffset: indicatorOffset + paddingLeft };
  }

  _scrollActiveIntoView() {
    if (!this._container) {
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
  }

  _positionElements() {
    if (!this._container) {
      return;
    }

    const touch = this._isTouch(this.props);
    const tabs = this.props.tabs.length;

    let paddingLeft;
    if (!this.props.centered && tabs > 3) {
      paddingLeft = this._calcPaddingLeft(this._container, touch);
    }

    let overflowAtIndex;
    if (!touch) {
      overflowAtIndex = this._calcOverflowIndex(this._container, paddingLeft, this.props.desktopMenuOverflow);
    }

    this.setState({
      touch,
      paddingLeft,
      overflowAtIndex,
      ...this._calcIndicatorPosition(this._container, this._initialRender ? paddingLeft : 0),
    }, () => {
      this._initialRender = false;
      this._scrollActiveIntoView();
    });
  }

  _handleResize() {
    this._positionElements();
  }

  _extractTabProps(tab, index) {
    const { onChange, activeTabIndex } = this.props;
    const changeIndex = index + this.state.overflowAtIndex;
    const active = activeTabIndex === changeIndex;

    if (isValidElement(tab)) {
      const tabEl = Children.only(tab);
      return {
        active,
        primaryText: tabEl.props.label,
        onClick: function handleClick(event) {
          if (tabEl.props.onClick) {
            tabEl.props.onClick(changeIndex, event);
          }

          if (onChange) {
            onChange(changeIndex, tabEl.props.children, event);
          }
        },
      };
    }

    const valued = typeof tab === 'string';

    return {
      active,
      primaryText: valued ? tab : tab.label,
      onClick: function handleClick(event) {
        if (tab.onClick) {
          tab.onClick(changeIndex, event);
        }

        if (onChange) {
          onChange(changeIndex, valued ? tab : tab.children, event);
        }
      },
    };
  }

  _mapToTab(tab, i) {
    const index = i + this.state.overflowIndex;
    const active = index === this.props.activeTabIndex;
    const onTabClick = this.props.onChange;
    const props = { active, index, onTabClick };

    if (isValidElement(tab)) {
      return cloneElement(tab, props);
    }

    let otherProps;
    if (typeof tab === 'string') {
      otherProps = {
        label: tab,
        key: tab || index,
      };
    } else {
      otherProps = {
        ...tab,
        key: tab.key || typeof tab.label === 'string' ? tab.label : index,
      };
    }

    return <Tab {...props} {...otherProps} />;
  }

  _setContainer(container) {
    this._container = findDOMNode(container);
  }

  _showNextTabs() {
    const { overflowIndex, overflowAtIndex } = this.state;
    const visible = overflowAtIndex - overflowIndex;

    this.setState({ overflowIndex: overflowIndex + visible, overflowAtIndex: overflowAtIndex + visible });
  }

  _showPreviousTabs() {
    const { overflowIndex, overflowAtIndex } = this.state;
    const visible = overflowAtIndex - overflowIndex;
    this.setState({ overflowIndex: overflowIndex - visible, overflowAtIndex: overflowAtIndex - visible });
  }

  render() {
    const {
      indicatorWidth,
      indicatorOffset,
      paddingLeft,
      overflowIndex,
      overflowAtIndex,
    } = this.state;

    const {
      component: Component,
      style,
      className,
      tabs,
      centered,
      colored,
      activeTabIndex,
      desktopMenuOverflow,
      ...props,
    } = this.props;
    delete props.onChange;
    delete props.defaultMedia;
    delete props.desktopMinWidth;

    const children = (overflowAtIndex ? tabs.slice(overflowIndex, overflowAtIndex) : tabs).map(this._mapToTab);
    let overflow;
    if (desktopMenuOverflow && overflowAtIndex) {
      overflow = (
        <MenuTab
          active={activeTabIndex > overflowAtIndex}
          label={<IconSeparator label="More"><FontIcon key="icon">arrow_drop_down</FontIcon></IconSeparator>}
          tabs={tabs.slice(overflowAtIndex, tabs.length).map(this._extractTabProps)}
        />
      );
    }

    let previous;
    if (!desktopMenuOverflow && overflowIndex > 0) {
      previous = (
        <Button
          icon
          key="previous-tabs"
          className="md-icon--inherit md-btn--tab-overflow md-btn--tab-overflow-left"
          onClick={this._showPreviousTabs}
        >
          keyboard_arrow_left
        </Button>
      );
    }

    let next;
    if (!desktopMenuOverflow && tabs.length > 3 && overflowAtIndex + overflowIndex <= tabs.length) {
      next = (
        <Button
          icon
          className="md-icon--inherit md-btn--tab-overflow md-btn--tab-overflow-right"
          key="next-tabs"
          onClick={this._showNextTabs}
        >
          keyboard_arrow_right
        </Button>
      );
    }

    const indicatorVisible = overflowAtIndex ? isBetween(activeTabIndex, overflowIndex, overflowAtIndex) : true;

    return (
      <Component
        {...props}
        ref={this._setContainer}
        style={{ ...style, paddingLeft }}
        className={cn('md-tabs', {
          'md-tabs--centered': centered,
          'md-tabs--pagination': !desktopMenuOverflow && overflowAtIndex,
          'md-background--primary': colored,
        }, className)}
      >
        {previous}
        {children}
        {overflow}
        {next}
        <TabIndicator offset={indicatorOffset} width={indicatorWidth} visible={indicatorVisible} />
      </Component>
    );
  }
}
