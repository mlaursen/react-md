/* eslint-env jest */
import React from 'react';

/* eslint-disable react/prop-types */

export default class Portal extends React.Component {
  render() {
    const { visible, children, style, className } = this.props;
    if (!visible) {
      return null;
    }

    return <span style={style} className={className}>{children}</span>;
  }
}
