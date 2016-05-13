import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TabHeader from './TabHeader';
import SwipeableView from '../SwipeableViews';

/**
 * The `Tabs` component is a container for the `Tab` component. It will
 * manage selecting the current active tab and allow the tab content
 * to be swiped to change.
 *
 * > Tabs should not be used for indicating navigation.
 */
export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      activeTabIndex: props.initialActiveTabIndex,
      headerStyle: {},
      indicatorStyle: {},
      tabMoveDistance: 0,
      tabScrolling: false,
    };
  }

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

  componentDidMount() {
    this.updateIndicator();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.activeTabIndex !== nextProps.activeTabIndex || this.state.activeTabIndex !== nextState.activeTabIndex) {
      const node = ReactDOM.findDOMNode(this);
      const tabContainer = node.querySelector('.md-tabs-scroll-container');
      const tabs = ReactDOM.findDOMNode(this).querySelectorAll('.md-tab');
      const active = tabs[this.getActiveTabIndex(nextProps, nextState)];
      const containerWidth = tabContainer.offsetWidth - parseInt(nextProps.style.marginLeft);
      const activePosition = active.offsetLeft + active.offsetWidth;
      const { tabMoveDistance } = nextState;
      if(activePosition > containerWidth + Math.abs(tabMoveDistance)) {
        const newDistance = containerWidth - activePosition;
        this.setState({
          headerStyle: this.getHeaderStyle(newDistance),
          tabMoveDistance: newDistance,
        });
      }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevProps.activeTabIndex !== this.props.activeTabIndex || this.state.activeTabIndex !== prevState.activeTabIndex) {
      this.updateIndicator();
    }
  }

  updateIndicator = () => {
    const { offsetWidth, offsetLeft } = ReactDOM.findDOMNode(this).querySelector('.md-tab.active');
    this.setState({
      indicatorStyle: {
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      },
    });
  };

  getActiveTabIndex = (props = this.props, state = this.state) => {
    return typeof props.activeTabIndex === 'undefined' ? state.activeTabIndex : props.activeTabIndex;
  };

  calcTabMoveDistance = ({ pageX }, threshold = 0) => {
    let distance = this.state.tabMoveDistance + (pageX - this.state.tabStartX);
    const node = ReactDOM.findDOMNode(this);
    const tabContainer = node.querySelector('.md-tabs-scroll-container');
    const tabs = Array.prototype.slice.call(node.querySelectorAll('.md-tab'));
    let maxWidth = tabs.reduce((prev, curr) => prev + curr.offsetWidth, 0) + threshold;
    maxWidth -= (tabContainer.offsetWidth - parseInt(this.props.style.marginLeft || 0));

    if(distance > 0) { // moving content left
      distance = Math.min(distance, threshold);
    } else { // moving content right
      distance = Math.max(distance, -maxWidth);
    }

    return distance;
  };

  getHeaderStyle = (tabMoveDistance) => {
    const transform = `translateX(${tabMoveDistance}px)`;
    return {
      WebkitTransform: transform,
      MozTransform: transform,
      transform,
    };
  };

  handleTabChange = (tabIndex, tabOnChange, e) => {
    const { activeTabIndex, onChange } = this.props;
    if(tabOnChange) {
      tabOnChange(tabIndex, e);
    }

    if(onChange) {
      onChange(tabIndex, e);
    }

    if(typeof activeTabIndex === 'undefined') {
      this.setState({ activeTabIndex: tabIndex });
    }
  };

  handleTabScrollStart = ({ changedTouches }) => {
    this.setState({
      tabStartX: changedTouches[0].pageX,
      tabScrolling: true,
    });
  };

  handleTabScrollMove = ({ changedTouches }) => {
    const tabMoveDistance = this.calcTabMoveDistance(changedTouches[0], 24);
    this.setState({ headerStyle: this.getHeaderStyle(tabMoveDistance) });
  };

  handleTabScrollEnd = ({ changedTouches }) => {
    const tabMoveDistance = this.calcTabMoveDistance(changedTouches[0], 0);
    this.setState({
      headerStyle: this.getHeaderStyle(tabMoveDistance),
      tabMoveDistance,
      tabScrolling: false,
    });
  };

  handleSwipeChange = (index) => {
    const { activeTabIndex, onChange } = this.props;
    if(onChange) {
      onChange(index);
    }

    if(typeof activeTabIndex === 'undefined') {
      this.setState({ activeTabIndex: index });
    }
  };

  render() {
    const { className, children, style, fixedWidth, centered, primary, ...remainingProps } = this.props;
    const { headerStyle, indicatorStyle, tabScrolling } = this.state;
    const activeTabIndex = this.getActiveTabIndex(remainingProps, this.state);

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
        onChange: this.handleTabChange.bind(this, i, tab.props.onChange),
      });
    });

    return (
      <div
        className={classnames('md-tabs-container', className)}
        {...remainingProps}
      >
        <TabHeader
          className={classnames('md-tabs-scroll-container', { 'md-primary': primary })}
          fixedWidth={fixedWidth}
          centered={centered}
          scrolling={tabScrolling}
          onTouchStart={this.handleTabScrollStart}
          onTouchMove={this.handleTabScrollMove}
          onTouchEnd={this.handleTabScrollEnd}
          style={Object.assign({}, style, headerStyle)}
          indicatorStyle={indicatorStyle}
        >
          {tabs}
        </TabHeader>
        <SwipeableView
          className="md-tab-content-container"
          activeIndex={activeTabIndex}
          onChange={this.handleSwipeChange}
        >
          {tabsContent}
        </SwipeableView>
      </div>
    );
  }
}
