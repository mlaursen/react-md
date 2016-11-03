/* eslint-env jest */
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';

export default class Paper extends PureComponent {
  static defaultProps = {
    component: 'div',
  };
  render() {
    const { component: Component, ...props } = this.props;
    delete props.zDepth;
    delete props.raiseOnHover;
    return <Component {...props} />;
  }
}
