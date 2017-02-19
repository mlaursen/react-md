/* eslint-env jest */
jest.unmock('../Layover');

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { shallow } from 'enzyme';
import Layover from '../Layover';

describe('Layover', () => {
  it('should render the CSSTransitionGroup component', () => {
    const layover = shallow(
      <Layover toggle={<div />} onClose={() => {}} visible>
        <div />
      </Layover>
    );

    expect(layover.exists(CSSTransitionGroup)).toBe(true);
  });

  it('should apply the style and className', () => {
    const style = { width: '100%' };
    const className = 'my-amazing-test';
    const layover = shallow(
      <Layover toggle={<div />} onClose={() => {}} visible style={style} className={className}>
        <div />
      </Layover>
    );

    expect(layover.getNode().props.style).toEqual(style);
    expect(layover.hasClass(className)).toBe(true);
  });

  it('should apply the md-inline-block className if block is not specified', () => {
    const layover = shallow(
      <Layover toggle={<div />} onClose={() => {}} visible>
        <div />
      </Layover>
    );

    expect(layover.hasClass('md-inline-block')).toBe(true);

    layover.setProps({ block: true });
    expect(layover.hasClass('md-inline-block')).toBe(false);
  });

  it('should always render the toggle prop', () => {
    const toggle = <div id="toggle" />;
    const layover = shallow(
      <Layover toggle={toggle} onClose={() => {}} visible>
        <div />
      </Layover>
    );

    expect(layover.containsMatchingElement(toggle)).toBe(true);

    layover.setProps({ visible: false });
    expect(layover.containsMatchingElement(toggle)).toBe(true);
  });

  it('should only render the children when the visible prop is true', () => {
    const children = <div id="children" />;
    const layover = shallow(
      <Layover toggle={<div />} onClose={() => {}} visible>
        {children}
      </Layover>
    );

    expect(layover.containsMatchingElement(children)).toBe(true);

    layover.setProps({ visible: false });
    expect(layover.containsMatchingElement(children)).toBe(false);
  });
});
