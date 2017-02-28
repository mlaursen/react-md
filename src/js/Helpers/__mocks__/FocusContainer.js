/* eslint-env jest */
/* eslint-disable react/prop-types */
import React, { PureComponent, PropTypes } from 'react';

export default class FocusContainer extends PureComponent {
  static propTypes = {
    additionalFocusKeys: PropTypes.arrayOf(PropTypes.number),
    focusOnMount: PropTypes.bool,
    initialFocus: PropTypes.string,
    containFocus: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
  };
  render() {
    const { component: Component, ...props } = this.props;
    delete props.containFocus;
    delete props.initialFocus;
    delete props.focusOnMount;
    delete props.additionalFocusKeys;

    return (
      <Component {...props} />
    );
  }
}
