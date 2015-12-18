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
  }

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
    for(let i = 0; i < contents.length; i++) {
      contents[i].style.transform = `translate3d(-${activeTabIndex * this.getContainerWidth()}px, 0, 0)`;
    }
  }

  getContainerWidth = () => {
    return ReactDOM.findDOMNode(this).offsetWidth;
  }

  updateSlider = () => {
    const { offsetWidth, offsetLeft } = ReactDOM.findDOMNode(this).querySelector('.md-tab.active');
    this.slide.style.width = `${offsetWidth}px`;
    this.slide.style.left = `${offsetLeft}px`;
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
        <ul className={tabsClassName}>
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
