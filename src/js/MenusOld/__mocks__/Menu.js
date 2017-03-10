/* eslint-env jest */
/* eslint-disable react/prop-types */
jest.unmock('../Positions');

import React from 'react';

import Positions from '../Positions';

// Have to do class since it is used as refs
export default class Menu extends React.Component {
  static Positions = Positions;
  render() {
    const { isOpen, toggle, children, listStyle, listClassName, ...props } = this.props;
    delete props.position;
    delete props.fullWidth;
    delete props.onClose;
    delete props.close;
    delete props.contained;
    delete props.listId;
    delete props.autoclose;
    delete props.transitionName;
    delete props.transitionEnterTimeout;
    delete props.transitionLeaveTimeout;
    delete props.component;
    delete props.zDepth;


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
