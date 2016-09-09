/* eslint-env jest */
/* eslint-disable react/prop-types */
import React from 'react';

// Have to do class since it is used as refs
export default class Menu extends React.Component {
  static Positions = {
    TOP_RIGHT: 'tr',
    TOP_LEFT: 'tl',
    BOTTOM_RIGHT: 'br',
    BOTTOM_LEFT: 'bl',
    BELOW: 'below',
  };
  render() {
    const { isOpen, toggle, children, listStyle, listClassName, ...props } = this.props;
    delete props.position;
    delete props.fullWidth;
    delete props.limitHeight;

    let items;
    if (isOpen) {
      items = (
        <ul style={listStyle} className={listClassName}>
          {children}
        </ul>
      );
    }
    return (
      <div {...props}>
        {toggle}
        {items}
      </div>
    );
  }
}
