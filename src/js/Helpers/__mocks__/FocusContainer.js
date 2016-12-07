/* eslint-env jest */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

export default class FocusContainer extends PureComponent {
  static defaultProps = {
    component: 'div',
  };
  render() {
    const { component: Component, ...props } = this.props;
    delete props.initialFocus;
    delete props.focusOnMount;
    delete props.additionalFocusKeys;

    return (
      <Component {...props} />
    );
  }
}
