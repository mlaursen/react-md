import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const DEFAULT_WIDTH = 160;
const DEFAULT_LEFT = 0;

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      activeTabIndex: 0,
      slideStyle: {
        width: DEFAULT_WIDTH,
        left: DEFAULT_LEFT,
      },
    };
    this.slide = null;
  }

  static propTypes = {
    children: PropTypes.node,
    activeTabIndex: PropTypes.number,
    className: PropTypes.string,
    onTabChange: PropTypes.func,
    component: PropTypes.string.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
    transitionEnter: PropTypes.bool.isRequired,
    transitionLeave: PropTypes.bool.isRequired,
    transitionName: PropTypes.string.isRequired,
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
    Array.from(ReactDOM.findDOMNode(this).querySelectorAll('.md-tab')).some(tab => {
      if(tab.classList.contains('active')) {
        this.slide.style.width = `${tab.offsetWidth}px`;
        return true;
      }
    });
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
    if(this.props.onTabChange) {
      this.props.onTabChange(i, tab);
    } else {
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
    return (
      <CSSTransitionGroup {...props} className={classnames('md-tabs-container', className)}>
        <ul className="md-tabs">
          {tabs}
          <span className="slide" ref="slide" />
        </ul>
        {tabContent}
      </CSSTransitionGroup>
    );
  }
}
