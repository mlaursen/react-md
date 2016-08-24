/* eslint-env jest*/
jest.unmock('../../Tooltips');
jest.unmock('../../Tooltips/injectTooltip');
jest.unmock('../IconButton');
jest.unmock('../FloatingButton');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import FloatingButton from '../FloatingButton';

describe('FloatingButton', () => {
  it('it merges a className prop', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton label="Test" className="test" />
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.className).toBe('md-btn md-icon-btn md-floating-btn test');
  });

  it('displays an icon in the button with iconClassName and children', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton>test</FloatingButton>
    );

    const button2 = TestUtils.renderIntoDocument(
      <FloatingButton iconClassName="fa fa-github" />
    );

    const buttonNode = findDOMNode(button);
    const button2Node = findDOMNode(button2);

    expect(buttonNode.textContent).toBe('test');
    expect(buttonNode.querySelector('.md-icon').className).toBe('md-icon material-icons');

    expect(button2Node.textContent).toBe('');
    expect(button2Node.querySelector('.md-icon').className).toBe('md-icon fa fa-github');
  });

  it('displays an children in the button', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton>test</FloatingButton>
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.querySelector('.md-icon')).toBeDefined();
  });

  it('appends md-primary or md-secondary depending on which prop is set to true', () => {
    const primaryButton = TestUtils.renderIntoDocument(
      <FloatingButton primary className="test" label="Test" />
    );

    const secondaryButton = TestUtils.renderIntoDocument(
      <FloatingButton secondary className="test" label="Test" />
    );

    const primaryButtonNode = findDOMNode(primaryButton);
    const secondaryButtonNode = findDOMNode(secondaryButton);

    expect(primaryButtonNode.classList.contains('md-primary')).toBe(true);
    expect(primaryButtonNode.classList.contains('test')).toBe(true);

    expect(secondaryButtonNode.classList.contains('md-secondary')).toBe(true);
    expect(secondaryButtonNode.classList.contains('test')).toBe(true);
  });

  it('converts the button into a link tag if the href prop is given', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton href="what">test</FloatingButton>
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.nodeName).toBe('A');
  });

  it('applies style to the button', () => {
    const style = { display: 'block' };
    const button = TestUtils.renderIntoDocument(
      <FloatingButton style={style}>test</FloatingButton>
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.style.display).toBe(style.display);
  });

  it('applies event listeners to the button', () => {
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();

    const button = TestUtils.renderIntoDocument(
      <FloatingButton
        label="Test"
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    );

    const buttonNode = findDOMNode(button);

    TestUtils.Simulate.click(buttonNode);
    expect(onClick).toBeCalled();

    TestUtils.Simulate.mouseOver(buttonNode);
    TestUtils.Simulate.mouseLeave(buttonNode);
    expect(onMouseOver).toBeCalled();
    expect(onMouseLeave).toBeCalled();

    TestUtils.Simulate.touchStart(buttonNode, { changedTouches: [{}] });
    TestUtils.Simulate.touchEnd(buttonNode, { changedTouches: [{}] });
    expect(onTouchStart).toBeCalled();
    expect(onTouchEnd).toBeCalled();
  });

  it('includes a tooltip if the tooltipLabel prop is given', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton tooltipLabel="Woop woop" />
    );

    const tooltip = findDOMNode(button).querySelector('.md-tooltip');

    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toBe('Woop woop');
  });

  it('includes ink unless the button is disabled', () => {
    const button = TestUtils.renderIntoDocument(
      <FloatingButton />
    );

    const disabledButton = TestUtils.renderIntoDocument(
      <FloatingButton disabled />
    );

    const buttonNode = findDOMNode(button);
    const disabledButtonNode = findDOMNode(disabledButton);

    expect(buttonNode.querySelector('.md-ink-container')).toBeDefined();
    expect(disabledButtonNode.querySelector('.md-ink-container')).toBe(null);
  });

  it('prevent button clicks if disabled', () => {
    const onClick = jest.fn();
    const button = TestUtils.renderIntoDocument(
      <FloatingButton disabled onClick={onClick} />
    );

    const buttonNode = findDOMNode(button);

    TestUtils.Simulate.click(buttonNode);
    expect(onClick).not.toBeCalled();
  });
});
