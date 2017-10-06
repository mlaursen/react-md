/* eslint-env jest */
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { shallow } from 'enzyme';
import Layover from '../Layover';

jest.mock('../../utils/Positioning/getSelectedTextPosition');

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

    expect(layover.instance().props.style).toEqual(style);
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

  it('should clone the id into the child if the child does not have an id prop defined', () => {
    const children = <div />;
    const expected = <div id="test-layover" />;
    const layover = shallow(
      <Layover id="test" toggle={<div id="toggle" />} visible onClose={() => {}}>
        {children}
      </Layover>
    );

    expect(layover.containsMatchingElement(expected)).toBe(true);
  });

  it('should render with a class name of md-layover', () => {
    const layover = shallow(
      <Layover id="test" toggle={<div />} visible onClose={() => {}}>
        <div />
      </Layover>
    );
    expect(layover.hasClass('md-layover')).toBe(true);
  });

  it('should not touch the id of the child if it already has one', () => {
    const children = <ul id="some-list"><li>woop</li></ul>;
    const layover = shallow(
      <Layover id="test" toggle={<div id="toggle" />} visible onClose={() => {}}>
        {children}
      </Layover>
    );

    expect(layover.containsMatchingElement(children)).toBe(true);
  });

  it('should apply the md-inline-block class name only if both block and full width are not specified', () => {
    const layover = shallow(
      <Layover id="test" toggle={<div />} block fullWidth visible={false} onClose={() => {}}>
        <div />
      </Layover>
    );
    expect(layover.hasClass('md-inline-block')).toBe(false);

    layover.setProps({ block: false });
    expect(layover.hasClass('md-inline-block')).toBe(false);

    layover.setProps({ fullWidth: false });
    expect(layover.hasClass('md-inline-block')).toBe(true);
  });

  it('should render with the md-full-width class name if the fullWidth prop is provided', () => {
    const layover = shallow(
      <Layover id="test" toggle={<div />} fullWidth visible={false} onClose={() => {}}>
        <div />
      </Layover>
    );
    expect(layover.hasClass('md-full-width')).toBe(true);

    layover.setProps({ fullWidth: false });
    expect(layover.hasClass('md-full-width')).toBe(false);
  });

  it('should call preventDefault on a context menu\'s event unless the preventContextMenu prop is false', () => {
    const props = {
      id: 'test',
      onContextMenu: jest.fn(),
      visible: false,
      toggle: <div />,
      onClose: jest.fn(),
      preventContextMenu: false,
    };
    const layover = shallow(<Layover {...props}><div id="children" /></Layover>);
    const event = { target: {}, preventDefault: jest.fn() };
    layover.simulate('contextMenu', event);
    expect(event.preventDefault.mock.calls.length).toBe(0);

    layover.setProps({ preventContextMenu: true });
    layover.simulate('contextMenu', event);
    expect(event.preventDefault.mock.calls.length).toBe(1);
  });
});
