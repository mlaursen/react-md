jest.unmock('classnames');
jest.unmock('../../src/js/constants/keyCodes');
jest.unmock('../../src/js/Tooltips');
jest.unmock('../../src/js/Tooltips/injectTooltip');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { injectTooltip } from '../../src/js/Tooltips';
import { TAB } from '../../src/js/constants/keyCodes';

const findClass = TestUtils.findRenderedDOMComponentWithClass;

class Link extends React.Component {
  render() {
    const { children, tooltip, ...props } = this.props;
    return <a {...props}>{children}{tooltip}</a>;
  }
}

const TooltipLink = injectTooltip(Link);

describe('injectTooltip', () => {
  it('updates the aria-visible attribute when hovered and sets the tooltip style and hides on mouse leave', () => {
    const tooltipLink = TestUtils.renderIntoDocument(
      <TooltipLink href="#" tooltipLabel="Hello, world!">Woop</TooltipLink>
    );

    const tooltipLinkNode = ReactDOM.findDOMNode(tooltipLink);

    const getTooltip = () => findClass(tooltipLink, 'md-tooltip');
    let tooltip = getTooltip();

    expect(tooltipLink.state.style).toBe(null);
    expect(tooltip).toBeDefined();

    expect(tooltip.getAttribute('aria-hidden')).toBe('true');

    TestUtils.Simulate.mouseOver(tooltipLinkNode);
    expect(setTimeout.mock.calls.length).toBe(1);
    // 0 delay
    expect(setTimeout.mock.calls[0][1]).toBe(0);

    jest.runOnlyPendingTimers();

    tooltip = getTooltip();
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
    expect(tooltipLink.state.style).not.toBe(null);
    expect(tooltipLink.state.style.top).toBeDefined();
    expect(tooltipLink.state.style.left).toBeDefined();

    TestUtils.Simulate.mouseLeave(tooltipLinkNode);
    tooltip = getTooltip();
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });

  it('can have a delay before making the tooltip visible ', () => {
    const tooltipLink = TestUtils.renderIntoDocument(
      <TooltipLink href="#" tooltipLabel="Hello, world!" tooltipDelay={150}>Woop</TooltipLink>
    );

    const tooltipLinkNode = ReactDOM.findDOMNode(tooltipLink);

    const getTooltip = () => findClass(tooltipLink, 'md-tooltip');
    let tooltip = getTooltip();

    expect(tooltipLink.state.style).toBe(null);
    expect(tooltip).toBeDefined();

    expect(tooltip.getAttribute('aria-hidden')).toBe('true');

    TestUtils.Simulate.mouseOver(tooltipLinkNode);
    expect(setTimeout.mock.calls.length).toBe(1);
    // 150 delay
    expect(setTimeout.mock.calls[0][1]).toBe(150);

    jest.runOnlyPendingTimers();

    tooltip = getTooltip();
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
    expect(tooltipLink.state.style).not.toBe(null);
    expect(tooltipLink.state.style.top).toBeDefined();
    expect(tooltipLink.state.style.left).toBeDefined();
  });

  it('will make the tooltip visible on keyboard focus and invisible on blur', () => {
    const tooltipLink = TestUtils.renderIntoDocument(
      <TooltipLink href="#" tooltipLabel="Hello, world!">Woop</TooltipLink>
    );

    const tooltipLinkNode = ReactDOM.findDOMNode(tooltipLink);

    const getTooltip = () => findClass(tooltipLink, 'md-tooltip');
    let tooltip = getTooltip();

    expect(tooltipLink.state.style).toBe(null);
    expect(tooltip).toBeDefined();

    expect(tooltip.getAttribute('aria-hidden')).toBe('true');

    TestUtils.Simulate.keyUp(tooltipLinkNode, { which: TAB, keyCode: TAB });
    expect(setTimeout.mock.calls.length).toBe(1);
    // 0 delay
    expect(setTimeout.mock.calls[0][1]).toBe(0);

    jest.runOnlyPendingTimers();

    tooltip = getTooltip();
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
    expect(tooltipLink.state.style).not.toBe(null);
    expect(tooltipLink.state.style.top).toBeDefined();
    expect(tooltipLink.state.style.left).toBeDefined();

    TestUtils.Simulate.blur(tooltipLinkNode);
    tooltip = getTooltip();
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });
});
