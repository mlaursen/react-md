import React, { PureComponent, PropTypes } from 'react';

export default class IconSeparator extends PureComponent {
  static propTypes = {
    label: PropTypes.node,
    iconBefore: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const { label, iconBefore, children } = this.props;
    return (
      <div className="md-icon-separator">
        {iconBefore && children}
        <span className="md-icon-text">{label}</span>
        {!iconBefore && children}
      </div>
    );
  }
}
