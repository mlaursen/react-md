import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      activeTabIndex: 0,
      touchStart: 0,
      distance: 0,
    };
    this.slide = null;
    this.tabsContent = React.Children.map(props.children, (child, i) => (
      <div className="md-tab-content" ref={`tabContent${i}`} key={`tab-content-${i}`}>{child.props.children}</div>
    ));
  }

  static propTypes = {
    children: PropTypes.node,
    activeTabIndex: PropTypes.number,
    className: PropTypes.string,
    onTabChange: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  };

  componentDidMount() {
    this.slide = ReactDOM.findDOMNode(this.refs.slide);
    this.updateSlider();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevTabIndex = this.getActiveTabIndex({ props: prevProps, state: prevState });
    const activeTabIndex = this.getActiveTabIndex();
    if(prevTabIndex === activeTabIndex) {
      return;
    }

    this.updateSlider();
    const contents = ReactDOM.findDOMNode(this).querySelectorAll('.md-tab-content');
    const transform = `translate3d(-${activeTabIndex * this.getContainerWidth()}px, 0, 0)`;
    for(let i = 0; i < contents.length; i++) {
      contents[i].style.transform = transform;
    }
  }

  getContainerWidth = () => {
    return ReactDOM.findDOMNode(this).offsetWidth;
  };

  updateSlider = () => {
    const { offsetWidth, offsetLeft } = ReactDOM.findDOMNode(this).querySelector('.md-tab.active');
    this.slide.style.width = `${offsetWidth}px`;
    this.slide.style.left = `${offsetLeft}px`;
  };

  getActiveTabIndex = ({ props, state } = this) => {
    return typeof props.activeTabIndex === 'number' ? props.activeTabIndex : state.activeTabIndex;
  };

  handleTabChange = (i, tab) => {
    this.props.onTabChange && this.props.onTabChange(i, tab);
    if(!this.props.activeTabIndex) {
      this.setState({ activeTabIndex: i });
    }
  };

  handleTouchStart = (e) => {
    this.setState({ touchStart: e.changedTouches[0].pageX });
  };

  handleTouchMove = (e) => {
    this.moveTabs(e.changedTouches[0], 20);
  };

  handleTouchEnd = (e) => {
    this.setState({ distance: this.moveTabs(e.changedTouches[0]) });
  };

  moveTabs = ({ pageX }, threshold = 0) => {
    let distance = this.state.distance + (pageX - this.state.touchStart);
    const tabs = Array.prototype.slice.call(this.refs.tabs.querySelectorAll('.md-tab'));
    const maxWidth = tabs.reduce((prev, curr) => prev + curr.clientWidth, 0) + threshold - this.refs.tabs.clientWidth;
    if(distance > 0) {
      distance = Math.min(distance, threshold);
    } else {
      distance = Math.max(distance, -maxWidth);
    }

    const transform = `translate3d(${distance}px, 0, 0)`;
    this.slide.style.transform = transform;
    tabs.forEach(tab => tab.style.transform = transform);
    return distance;
  };

  render() {
    const { children, className, ...props } = this.props;
    const activeTabIndex = this.getActiveTabIndex();

    const tabs = React.Children.map(children, (tab, i) => {
      return React.cloneElement(tab, {
        key: i,
        valueLink: {
          checked: i === activeTabIndex,
          requestChange: this.handleTabChange.bind(this, i, tab),
        },
      });
    });

    const tabsClassName = classnames('md-tabs', {
      'md-tabs-primary': isPropEnabled(this.props, 'primary'),
      'md-tabs-secondary': isPropEnabled(this.props, 'secondary'),
    });
    return (
      <div {...props} className={classnames('md-tabs-container', className)}>
        <ul
          className={tabsClassName}
          ref="tabs"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          >
          {tabs}
          <span className="slide" ref="slide" />
        </ul>
        <div className="md-tab-content-container">
          {this.tabsContent}
        </div>
      </div>
    );
  }
}
