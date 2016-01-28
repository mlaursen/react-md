import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled, isMobile } from '../utils';
import FontIcon from '../FontIcons';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      indicatorStyle: {},
      touchDistance: 0,
      swipeDistance: 0,
    };

    if(typeof props.value === 'undefined') {
      const { label, value } = React.Children.toArray(props.children)[0].props;
      this.state.value = props.defaultValue || (typeof value !== 'undefined' ? value : label);
    }

    if(isPropEnabled(props, 'slide')) {
      this.state.tabsContent = this.getSlideTabContent(props);
    } else {
      this.state.tabsContent = this.getActiveTabContent(props, this.state);
    }
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnter: PropTypes.bool,
    transitionEnterTimeout: PropTypes.number,
    transitionLeave: PropTypes.bool,
    transitionLeaveTimeout: PropTypes.number,
    fixedWidth: PropTypes.bool,
    scrollable: PropTypes.bool,
    centered: PropTypes.bool,
    slide: PropTypes.bool,
    tabsOffset: PropTypes.string,
    scrollIconLeft: PropTypes.node,
    scrollIconRight: PropTypes.node,
  };

  static defaultProps = {
    slide: true,
    transitionName: 'opacity',
    transitionEnterTimeout: 150,
    transitionLeave: false,
    isMobile: isMobile,
    scrollIconLeft: <FontIcon>chevron_left</FontIcon>,
    scrollIconRight: <FontIcon>chevron_right</FontIcon>,
  };

  componentDidMount() {
    this.updateIndicator();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(this.props.children !== nextProps.children) {
      let newNextState = {};
      if(isPropEnabled(nextProps, 'slide')) {
        newNextState.tabsContent = this.getSlideTabContent(nextProps);
      } else {
        newNextState.tabsContent = this.getActiveTabContent(nextProps, nextState);
      }

      this.setState(newNextState);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(!isPropEnabled(nextProps, 'slide') && this.getValue() !== this.getValue(nextProps, nextState)) {
      nextState.tabsContent = this.getActiveTabContent(nextProps, nextState);
      this.setState(nextState);
    } else if(isPropEnabled(nextProps, 'slide') && nextState.contentTransform !== this.state.contentTransform) {
      nextState.tabsContent = this.getSlideTabContent(nextProps, nextState);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const value = this.getValue();
    const prevValue = this.getValue(prevProps, prevState);
    if(value === prevValue) { return; }

    this.updateIndicator();
  }

  handleTouchStart = ({ changedTouches }) => {
    this.setState({ touchStart: changedTouches[0].pageX });
  };

  handleTouchMove = ({ changedTouches }) => {
    const touchDistance = this.moveTabs(changedTouches[0], 20);
    this.setState({
      tabTransform: `translate3d(${touchDistance}px, 0, 0)`,
    });
  };

  handleTouchEnd = ({ changedTouches }) => {
    const touchDistance = this.moveTabs(changedTouches[0]);
    this.setState({
      touchDistance,
      tabTransform: `translate3d(${touchDistance}px, 0, 0)`,
    });
  };

  handleTabChange = ({ value, label, onChange }) => {
    let params = { label };
    if(typeof value !== 'undefined') {
      params.value = value;
    }

    if(onChange) {
      onChange(...params);
    }

    if(this.props.onChange) {
      this.props.onChange(...params);
    }

    if(typeof this.props.value === 'undefined') {
      this.setState({ value: value || label });
    }
  };


  getValue = (props = this.props, state = this.state) => {
    return (typeof props.value !== 'undefined' ? props : state).value;
  };

  getSlideTabContent = ({ children } = this.props, { contentTransform } = this.state) => {
    return React.Children.map(children, (tab, i) => {
      return (
        <div
          className="md-tab-content"
          key={`tab-content-${i}`}
          style={{
            MozTransform: contentTransform,
            WebkitTransform: contentTransform,
            transform: contentTransform,
          }}
          >
          {tab.props.children}
        </div>
      );
    });
  };

  getActiveTabContent = (props = this.props, state = this.state) => {
    const value = this.getValue(props, state);
    let content;
    React.Children.toArray(props.children).some(({ props }) => {
      const isActive = value === (props.value || props.label);
      if(isActive) { content = props.children; }
      return isActive;
    });
    return content;
  };

  isTabChecked = ({ checked, label, value }) => {
    if(typeof checked !== 'undefined') { return checked; }
    const stateValue = this.state.value;

    const tabValue = typeof value !== 'undefined' ? value : label;
    return stateValue === tabValue;
  };

  updateIndicator = () => {
    const { offsetWidth, offsetLeft } = this.refs.tabs.querySelector('.md-tab.active');
    this.setState({
      indicatorStyle: {
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      },
    });
  };

  moveTabs = ({ pageX }, threshold = 0) => {
    let distance = this.state.touchDistance + (pageX - this.state.touchStart);
    const tabs = Array.prototype.slice.call(this.refs.tabs.querySelectorAll('.md-tab'));
    const maxWidth = tabs.reduce((prev, curr) => prev + curr.clientWidth, 0) + threshold - this.refs.tabs.clientWidth - parseInt(this.props.tabsOffset);

    if(distance > 0) {
      distance = Math.min(distance, threshold);
    } else {
      distance = Math.max(distance, -maxWidth);
    }

    return distance;
  };

  calcSwipeDistance = ({ pageX }, buffer = 24, { scrollWidth, offsetWidth } = ReactDOM.findDOMNode(this.refs.swipeContainer)) => {
    const distance = this.state.swipeDistance + (pageX - this.state.swipeStart);
    return Math.max(Math.min(distance, buffer), -scrollWidth - buffer + offsetWidth);
  };

  handleSwipeStart = ({ changedTouches }) => {
    this.setState({ swiping: true, swipeStart: changedTouches[0].pageX });
  };

  handleSwipeMove = ({ changedTouches }) => {
    if(!this.state.swiping) { return; }

    this.setState({
      contentTransform: `translateX(${this.calcSwipeDistance(changedTouches[0])}px)`,
    });
  };

  handleSwipeEnd = ({ changedTouches }) => {
    const container = ReactDOM.findDOMNode(this.refs.swipeContainer);
    const { offsetWidth, scrollWidth } = container;
    const deltaX = offsetWidth * .45;
    let distance = this.calcSwipeDistance(changedTouches[0], 0, container);
    console.log('scrollWidth / offsetWidth:', scrollWidth / offsetWidth);
    if(Math.abs(distance * deltaX) > offsetWidth) {
      distance = -offsetWidth;
    }


    this.setState({
      contentTransform: `translateX(${distance}px)`,
      swiping: false,
      swipeDistance: distance,
    });
  };

  render() {
    const { indicatorStyle, tabsContent, tabTransform } = this.state;
    const { className, children, tabsOffset, scrollIconLeft, scrollIconRight, ...props } = this.props;
    const { transitionName, transitionEnter, transitionEnterTimeout, transitionLeave, transitionLeaveTimeout, ...remainingProps } = props;
    console.log('tabsOffset:', tabsOffset);

    const isScrollable = isPropEnabled(remainingProps, 'scrollable');
    const swipeable = isPropEnabled(remainingProps, 'slide');

    const tabs = React.Children.map(children, (tab, i) => {
      return React.cloneElement(tab, {
        key: tab.key || `tab-${i}`,
        checked: this.isTabChecked(tab.props),
        onChange: this.handleTabChange.bind(this, tab.props),
      });
    });

    return (
      <div className={classnames('md-tabs-container', className)} {...remainingProps}>
        <header
          className={classnames('md-tabs-scroll-container', {
            'md-primary': isPropEnabled(remainingProps, 'primary'),
            'md-secondary': isPropEnabled(remainingProps, 'secondary'),
          })}
          ref="scrollContainer"
          >
          <ul
            ref="tabs"
            className={classnames('md-tabs', {
              'fixed-width': isPropEnabled(remainingProps, 'fixedWidth'),
              'tabs-scrollable': isScrollable,
              'tabs-centered': !isScrollable && isPropEnabled(remainingProps, 'centered'),
            })}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            style={{ marginLeft: tabsOffset, transform: tabTransform }}
            >
            {tabs}
            <span className="md-tab-indicator" style={indicatorStyle} />
          </ul>
        </header>
        <CSSTransitionGroup
          ref="swipeContainer"
          component="div"
          className={classnames('md-tab-content-container', { swipeable })}
          transitionName={transitionName}
          transitionEnter={transitionEnter}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeave={transitionLeave}
          transitionLeaveTimeout={transitionLeaveTimeout}
          onTouchStart={this.handleSwipeStart}
          onTouchMove={this.handleSwipeMove}
          onTouchEnd={this.handleSwipeEnd}
          >
          {tabsContent}
        </CSSTransitionGroup>
      </div>
    );
  }
}
