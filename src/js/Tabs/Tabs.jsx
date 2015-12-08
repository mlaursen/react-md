import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      activeTabIndex: 0,
    };
    this.slide = null;
  }

  static propTypes = {
    children: PropTypes.node,
    activeTabIndex: PropTypes.number,
    className: PropTypes.string,
    onTabChange: PropTypes.func,
    component: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    transitionName: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  }

  static defaultProps = {
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 0,
    transitionEnter: true,
    transitionLeave: false,
    transitionName: 'tab',
    component: 'div',
  }

  componentDidMount() {
    this.slide = ReactDOM.findDOMNode(this.refs.slide);
    const tabs = ReactDOM.findDOMNode(this).querySelectorAll('.md-tab');
    for(let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if(tab.classList.contains('active')) {
        this.slide.style.width = `${tab.offsetWidth}px`;
        return;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevTabIndex = this.getActiveTabIndex({ props: prevProps, state: prevState });
    const activeTabIndex = this.getActiveTabIndex();
    if(prevTabIndex === activeTabIndex) {
      return;
    }
    const tab = this.getActiveTab();
    this.slide.style.width = `${tab.offsetWidth}px`;
    this.slide.style.left = `${tab.offsetLeft}px`;
  }

  getActiveTab = () => {
    return ReactDOM.findDOMNode(this).querySelector('.md-tab.active');
  }

  getActiveTabIndex = ({ props, state } = this) => {
    return typeof props.activeTabIndex === 'number' ? props.activeTabIndex : state.activeTabIndex;
  }

  handleTabChange = (i, tab) => {
    this.props.onTabChange && this.props.onTabChange(i, tab);
    if(!this.props.activeTabIndex) {
      this.setState({ activeTabIndex: i });
    }
  }

  render() {
    const { children, className, ...props } = this.props;
    const activeTabIndex = this.getActiveTabIndex();

    let tabContent = null;
    const tabs = React.Children.map(children, (tab, i) => {
      const isActive = i === activeTabIndex;
      if(isActive) {
        tabContent = <div className="md-tab-content" key={i}>{tab.props.children}</div>;
      }

      return React.cloneElement(tab, {
        key: i,
        valueLink: {
          checked: isActive,
          requestChange: this.handleTabChange.bind(this, i, tab),
        },
      });
    });

    const tabsClassName = classnames('md-tabs', {
      'md-tabs-primary': isPropEnabled(this.props, 'primary'),
      'md-tabs-secondary': isPropEnabled(this.props, 'secondary'),
    });
    return (
      <CSSTransitionGroup {...props} className={classnames('md-tabs-container', className)}>
        <ul className={tabsClassName}>
          {tabs}
          <span className="slide" ref="slide" />
        </ul>
        {tabContent}
      </CSSTransitionGroup>
    );
  }
}
