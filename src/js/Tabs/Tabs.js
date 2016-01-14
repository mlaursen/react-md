import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      indicatorStyle: {
        left: '0px',
        width: '72px',
      },
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
  };

  static defaultProps = {
    transitionName: 'opacity',
    transitionEnterTimeout: 150,
    transitionLeave: false,
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const value = this.getValue();
    const prevValue = this.getValue(prevProps, prevState);
    if(value === prevValue) { return; }

    this.updateIndicator();
  }

  getValue = (props = this.props, state = this.state) => {
    return (typeof props.value !== 'undefined' ? props : state).value;
  };

  getSlideTabContent = ({ children } = this.props) => {
    return React.Children.map(children, (tab, i) => {
      return (
        <div
          className="md-tab-content"
          key={`tab-content-${i}`}
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

  updateIndicator = () => {
    const { offsetWidth, offsetLeft } = this.refs.tabs.querySelector('.md-tab.active');
    this.setState({
      indicatorStyle: {
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      },
    });
  };

  render() {
    const { indicatorStyle, tabsContent } = this.state;
    const { className, children, tabsOffset, ...props } = this.props;
    const { transitionName, transitionEnter, transitionEnterTimeout, transitionLeave, transitionLeaveTimeout, ...remainingProps } = props;

    const isScrollable = isPropEnabled(remainingProps, 'scrollable');

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
            style={{ marginLeft: tabsOffset }}
            >
            {tabs}
            <span className="md-tab-indicator" style={indicatorStyle} />
          </ul>
        </header>
        <CSSTransitionGroup
          className="md-tab-content-container"
          transitionName={transitionName}
          transitionEnter={transitionEnter}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeave={transitionLeave}
          transitionLeaveTimeout={transitionLeaveTimeout}
          >
          {tabsContent}
        </CSSTransitionGroup>
      </div>
    );
  }
}
