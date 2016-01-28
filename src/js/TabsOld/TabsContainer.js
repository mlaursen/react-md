import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { mergeClassNames } from '../utils';

export default class TabsContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      tabStyle: {},
      indicatorStyle: {},
    };
  }

  static propTypes = {
    children: PropTypes.node,
    scrollable: PropTypes.bool.isRequired,
    fixedWidth: PropTypes.bool.isRequired,
    centered: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  render() {
    const { scrollable, fixedWidth, centered, style, children, ...props } = this.props;
    const { tabStyle, indicatorStyle } = this.state;
    return (
      <header className={mergeClassNames(props, 'md-tabs-scroll-container')} ref="container">
        <ul
          ref="tabs"
          className={classnames('md-tabs', {
            'fixed-width': fixedWidth,
            'tabs-scrollable': scrollable,
            'tabs-centered': !scrollable && centered,
          })}
          onTouchStart={this.handleTabScrollStart}
          onTouchMove={this.handleTabScrollMove}
          onTouchEnd={this.handleTabScrollEnd}
          style={Object.assign({}, style, tabStyle)}
        >
          {children}
          <span className="md-tab-indicator" style={indicatorStyle} />
        </ul>
      </header>
    );
  }
}
