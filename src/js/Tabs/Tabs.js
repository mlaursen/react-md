import React, { PureComponent, PropTypes, isValidElement, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import Tab from './Tab';

export default class Tabs extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    activeTabIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    fixedWidth: PropTypes.bool,
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.node,
      }),
    ])).isRequired,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    colored: PropTypes.bool,
  };

  static defaultProps = {
    component: 'ul',
    colored: true,
  };

  constructor(props) {
    super(props);

    this.state = { indicatorStyle: null };
    this._mapToTab = this._mapToTab.bind(this);
    this._setContainer = this._setContainer.bind(this);
    this._updateIndicator = this._updateIndicator.bind(this);
  }

  componentDidMount() {
    this._updateIndicator();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeTabIndex !== prevProps.activeTabIndex) {
      this._updateIndicator();
    }
  }

  _mapToTab(tab, index) {
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

  _updateIndicator() {
    if (!this._container) {
      return;
    }

    const { offsetWidth, offsetLeft } = this._container.querySelector('.md-tab--active');
    const transform = `translate3d(${offsetLeft}px, 0, 0)`;
    this.setState({
      indicatorStyle: {
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        transform,
        width: `${offsetWidth}px`,
      },
    });
  }

  render() {
    const { indicatorStyle } = this.state;
    const {
      component: Component,
      className,
      tabs,
      colored,
      ...props,
    } = this.props;
    delete props.activeTabIndex;
    delete props.onChange;

    const children = tabs.map(this._mapToTab);

    return (
      <Component
        {...props}
        ref={this._setContainer}
        className={cn('md-tabs', {
          'md-background--primary': colored,
        }, className)}
      >
        {children}
        <span style={indicatorStyle} className="md-tab-indicator" />
      </Component>
    );
  }
}
