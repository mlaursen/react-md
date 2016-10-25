/* eslint-env jest*/
jest.unmock('../BottomNav');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import BottomNav from '../BottomNav';

describe('BottomNav', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const bottomNav = renderIntoDocument(
      <BottomNav
        style={style}
        className={className}
        label="A"
        active={false}
        onNavChange={jest.fn()}
        fixed={false}
        index={0}
      />
    );

    const bottomNavNode = findDOMNode(bottomNav);
    expect(bottomNavNode.style.display).toBe(style.display);
    expect(bottomNavNode.classList.contains(className)).toBe(true);
  });

  it('passes the index and click event to the onClick and onNavChange props', () => {
    const props = {
      onNavChange: jest.fn(),
      onClick: jest.fn(),
      label: 'a',
      fixed: false,
      active: false,
      index: 0,
    };

    const nav = renderIntoDocument(<BottomNav {...props} />);
    const navNode = findDOMNode(nav);

    Simulate.click(navNode);

    expect(props.onNavChange.mock.calls.length).toBe(1);
    expect(props.onNavChange.mock.calls[0][0]).toBe(props.index);

    expect(props.onClick.mock.calls.length).toBe(1);
    expect(props.onClick.mock.calls[0][0]).toBe(props.index);
  });

  it('renders as a button by default', () => {
    const nav = renderIntoDocument(
      <BottomNav label="A" active={false} fixed={false} onNavChange={jest.fn()} index={0} />
    );
    const btns = scryRenderedDOMComponentsWithTag(nav, 'button');
    expect(btns.length).toBe(1);
  });

  it('renders as the component prop', () => {
    /* eslint-disable react/prop-types, react/prefer-stateless-function */
    class Link extends React.Component {
      render() {
        const { to, ...props } = this.props;
        return <a href={to} {...props} />;
      }
    }

    const props = {
      label: 'a',
      to: '/test',
      active: false,
      fixed: false,
      component: Link,
      onNavChange: jest.fn(),
      index: 0,
    };

    const nav = renderIntoDocument(<BottomNav {...props} />);
    const links = scryRenderedComponentsWithType(nav, Link);
    expect(links.length).toBe(1);
  });

  it('passes alll event listener props to the component', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const props = {
      onClick,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      active: false,
      fixed: false,
      label: 'A',
      onNavChange: jest.fn(),
      index: 0,
    };

    const nav = renderIntoDocument(<BottomNav {...props} />);
    const navNode = findDOMNode(nav);

    Simulate.click(navNode);
    expect(onClick.mock.calls.length).toBe(1);

    Simulate.focus(navNode);
    expect(onFocus.mock.calls.length).toBe(1);

    Simulate.blur(navNode);
    expect(onBlur.mock.calls.length).toBe(1);

    Simulate.mouseDown(navNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.mouseUp(navNode);
    expect(onMouseUp.mock.calls.length).toBe(1);

    Simulate.mouseOver(navNode);
    expect(onMouseOver.mock.calls.length).toBe(1);

    Simulate.mouseLeave(navNode);
    expect(onMouseLeave.mock.calls.length).toBe(1);

    Simulate.touchStart(navNode);
    expect(onTouchStart.mock.calls.length).toBe(1);

    Simulate.touchEnd(navNode);
    expect(onTouchEnd.mock.calls.length).toBe(1);

    Simulate.touchCancel(navNode);
    expect(onTouchCancel.mock.calls.length).toBe(1);
  });

  it('renders the label prop when fixed or active', () => {
    const props = {
      label: 'Hello, World!',
      onNavChange: jest.fn(),
      index: 0,
    };

    let nav = renderIntoDocument(<BottomNav {...props} active={false} fixed={false} />);
    let navNode = findDOMNode(nav);
    expect(navNode.textContent).toBe('');

    nav = renderIntoDocument(<BottomNav {...props} active fixed={false} />);
    navNode = findDOMNode(nav);
    expect(navNode.textContent).toBe(props.label);

    nav = renderIntoDocument(<BottomNav {...props} active fixed />);
    navNode = findDOMNode(nav);
    expect(navNode.textContent).toBe(props.label);

    nav = renderIntoDocument(<BottomNav {...props} active={false} fixed />);
    navNode = findDOMNode(nav);
    expect(navNode.textContent).toBe(props.label);
  });
});
