import React, { PureComponent, PropTypes, Children, isValidElement, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import Tabs from './Tabs';

export default class ControlledTabs extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,

    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    contentComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    defaultTabIndex: PropTypes.number.isRequired,
    activeTabIndex: controlled(PropTypes.number, 'onChange'),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    component: 'div',
    contentComponent: 'div',
    defaultTabIndex: 0,
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.activeTabIndex === 'undefined') {
      this.state.activeTabIndex = props.defaultTabIndex;
    }

    this._handleChange = this._handleChange.bind(this);
    this._setContainer = this._setContainer.bind(this);
  }

  _setContainer(container) {
    if (container === null) {
      return;
    }

    this._container = findDOMNode(container);

    this._container.scrollLeft = getField(this.props, this.state, 'activeTabIndex') * this._container.offsetWidth;
  }

  _handleChange(activeTabIndex, children, event) {
    if (this.props.onChange) {
      this.props.onChange(activeTabIndex, children, event);
    }

    if (typeof this.props.activeTabIndex === 'undefined') {
      this._container.scrollLeft = activeTabIndex * this._container.offsetWidth;
      this.setState({ activeTabIndex });
    }
  }

  render() {
    const {
      component: Component,
      contentComponent: ContentComponent,
      style,
      className,
      contentStyle,
      contentClassName,
      ...props,
    } = this.props;
    delete props.activeTabIndex;
    delete props.defaultTabIndex;
    delete props.onChange;

    const activeTabIndex = getField(this.props, this.state, 'activeTabIndex');

    const children = Children.map(Children.toArray(props.children), (tab, index) => {
      if (isValidElement(tab.props.children)) {
        return cloneElement(tab.props.children, {
          className: cn('md-tab-wrapper', Children.only(tab.props.children).props.className),
        });
      }

      return <div key={`tab-wrapper-${tab.key || index}`} className="md-tab-wrapper">{tab.props.children}</div>;
    });

    return (
      <Component style={style} className={cn('md-tabs-container', className)}>
        <Tabs {...props} activeTabIndex={activeTabIndex} onChange={this._handleChange} />
        <ContentComponent
          ref={this._setContainer}
          style={contentStyle}
          className={cn('md-tabs-content', contentClassName)}
        >
          {children}
        </ContentComponent>
      </Component>
    );
  }
}
