import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import TabHeader from './TabHeader';
import SwipeableView from '../SwipeableViews';

/**
 * The `Tabs` component is a container for the `Tab` component. It will
 * manage selecting the current active tab and allow the tab content
 * to be swiped to change.
 *
 * > Tabs should not be used for indicating navigation.
 */
export default class Tabs extends PureComponent {
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
     * The list of tabs to manage.
     */
    children: PropTypes.arrayOf(PropTypes.node).isRequired,

    /**
     * The initial index of the tab that is active.
     */
    initialActiveTabIndex: PropTypes.number.isRequired,

    /**
     * The active tab index if you want to control the tabs yourself.
     */
    activeTabIndex: PropTypes.number,

    /**
     * An optional function to call when the tab is changed. The next active
     * tab index and the change event will be given.
     *
     * `onChange(tabIndex, event)`.
     */
    onChange: PropTypes.func,

    /**
     * Boolean if the tabs should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the tabs are fixed width. This means that all of them will
     * be the same size.
     */
    fixedWidth: PropTypes.bool,

    /**
     * Boolean if the tabs should be centered so there is extra whitespace
     * around the tabs.
     */
    centered: PropTypes.bool,
  };

  static defaultProps = {
    primary: true,
    initialActiveTabIndex: 0,
    style: {},
    fixedWidth: false,
    centered: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: props.initialActiveTabIndex,
      headerStyle: {},
      indicatorStyle: {},
      tabMoveDistance: 0,
      tabScrolling: false,
    };
    this._updateIndicator = this._updateIndicator.bind(this);
    this._calcTabMoveDistance = this._calcTabMoveDistance.bind(this);
    this._handleTabChange = this._handleTabChange.bind(this);
    this._handleTabScrollEnd = this._handleTabScrollEnd.bind(this);
    this._handleTabScrollMove = this._handleTabScrollMove.bind(this);
    this._handleTabScrollStart = this._handleTabScrollStart.bind(this);
    this._handleSwipeChange = this._handleSwipeChange.bind(this);
  }

  componentDidMount() {
    this._updateIndicator();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this._getActiveIndex(this.props, this.state) !== this._getActiveIndex(nextProps, nextState)) {
      const node = findDOMNode(this);
      const tabContainer = node.querySelector('.md-tabs-scroll-container');
      const tabs = findDOMNode(this).querySelectorAll('.md-tab');
      const active = tabs[this._getActiveIndex(nextProps, nextState)];
      const containerWidth = tabContainer.offsetWidth - parseInt(nextProps.style.marginLeft, 10);
      const activePosition = active.offsetLeft + active.offsetWidth;
      const { tabMoveDistance } = nextState;
      if (activePosition > containerWidth + Math.abs(tabMoveDistance)) {
        const newDistance = containerWidth - activePosition;
        this.setState({
          headerStyle: this._getHeaderStyle(newDistance),
          tabMoveDistance: newDistance,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._getActiveIndex(this.props, this.state) !== this._getActiveIndex(prevProps, prevState)) {
      this._updateIndicator();
    }
  }

  _getActiveIndex(props, state) {
    return typeof props.activeTabIndex === 'undefined' ? state.activeTabIndex : props.activeTabIndex;
  }

  _getHeaderStyle(tabMoveDistance) {
    const transform = `translateX(${tabMoveDistance}px)`;
    return {
      WebkitTransform: transform,
      MozTransform: transform,
      transform,
    };
  }

  _updateIndicator() {
    const { offsetWidth, offsetLeft } = findDOMNode(this).querySelector('.md-tab.active');
    this.setState({
      indicatorStyle: {
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      },
    });
  }

  _calcTabMoveDistance({ pageX }, threshold = 0) {
    let distance = this.state.tabMoveDistance + (pageX - this.state.tabStartX);
    const node = findDOMNode(this);
    const tabContainer = node.querySelector('.md-tabs-scroll-container');
    const tabs = Array.prototype.slice.call(node.querySelectorAll('.md-tab'));
    let maxWidth = tabs.reduce((prev, curr) => prev + curr.offsetWidth, 0) + threshold;
    maxWidth -= (tabContainer.offsetWidth - parseInt(this.props.style.marginLeft || 0, 10));

    if (distance > 0) { // moving content left
      distance = Math.min(distance, threshold);
    } else { // moving content right
      distance = Math.max(distance, -maxWidth);
    }

    return distance;
  }

  _handleTabChange(tabIndex, tabOnChange, e) {
    const { activeTabIndex, onChange } = this.props;
    if (tabOnChange) {
      tabOnChange(tabIndex, e);
    }

    if (onChange) {
      onChange(tabIndex, e);
    }

    if (typeof activeTabIndex === 'undefined') {
      this.setState({ activeTabIndex: tabIndex });
    }
  }

  _handleTabScrollStart({ changedTouches }) {
    this.setState({
      tabStartX: changedTouches[0].pageX,
      tabScrolling: true,
    });
  }

  _handleTabScrollMove({ changedTouches }) {
    const tabMoveDistance = this._calcTabMoveDistance(changedTouches[0], 24);
    this.setState({ headerStyle: this.getHeaderStyle(tabMoveDistance) });
  }

  _handleTabScrollEnd({ changedTouches }) {
    const tabMoveDistance = this._calcTabMoveDistance(changedTouches[0], 0);
    this.setState({
      headerStyle: this._getHeaderStyle(tabMoveDistance),
      tabMoveDistance,
      tabScrolling: false,
    });
  }

  _handleSwipeChange(index) {
    const { activeTabIndex, onChange } = this.props;
    if (onChange) {
      onChange(index);
    }

    if (typeof activeTabIndex === 'undefined') {
      this.setState({ activeTabIndex: index });
    }
  }

  render() {
    const { className, children, style, fixedWidth, centered, primary, ...remainingProps } = this.props;
    delete remainingProps.scrollable;
    delete remainingProps.initialActiveTabIndex;

    const { headerStyle, indicatorStyle, tabScrolling } = this.state;
    const activeTabIndex = this._getActiveIndex(remainingProps, this.state);

    let tabsContent = [];
    const tabs = React.Children.map(children, (tab, i) => {
      tabsContent.push(
        <div className="md-tab-content" key={`content-${i}`}>
          {tab.props.children}
        </div>
      );

      return React.cloneElement(tab, {
        key: tab.key || `tab-${i}`,
        checked: i === activeTabIndex,
        onChange: this._handleTabChange.bind(this, i, tab.props.onChange), // eslint-disable-line react/jsx-no-bind
      });
    });

    return (
      <div
        className={cn('md-tabs-container', className)}
        {...remainingProps}
      >
        <TabHeader
          className={cn('md-tabs-scroll-container', { 'md-primary': primary })}
          fixedWidth={fixedWidth}
          centered={centered}
          scrolling={tabScrolling}
          onTouchStart={this._handleTabScrollStart}
          onTouchMove={this._handleTabScrollMove}
          onTouchEnd={this._handleTabScrollEnd}
          style={Object.assign({}, style, headerStyle)}
          indicatorStyle={indicatorStyle}
        >
          {tabs}
        </TabHeader>
        <SwipeableView
          className="md-tab-content-container"
          activeIndex={activeTabIndex}
          onChange={this._handleSwipeChange}
        >
          {tabsContent}
        </SwipeableView>
      </div>
    );
  }
}
