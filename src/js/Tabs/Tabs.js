import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TabHeader from './TabHeader';
import SwipeableView from '../SwipeableViews';

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
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    initialActiveTabIndex: PropTypes.number,
    activeTabIndex: PropTypes.number,
    containerStyle: PropTypes.object,
    style: PropTypes.object,
    onChange: PropTypes.func,
    primary: PropTypes.bool,
    fixedWidth: PropTypes.bool,
    centered: PropTypes.bool,
  };

  static defaultProps = {
    primary: true,
    initialActiveTabIndex: 0,
    style: {},
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
    maxWidth -= (tabContainer.offsetWidth - parseInt(this.props.style.marginLeft));

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
