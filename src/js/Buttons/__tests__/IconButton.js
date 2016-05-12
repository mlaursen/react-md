/*eslint-env jest*/
jest.unmock('../../Tooltips');
jest.unmock('../../Tooltips/injectTooltip');
jest.unmock('../IconButton');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import IconButton from '../IconButton';

describe('IconButton', () => {
  it('it merges a className prop', () => {
    const button = TestUtils.renderIntoDocument(
      <IconButton label="Test" className="test" />
    );

    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.className).toBe('md-btn md-icon-btn test');
  });

  it('displays an icon in the button with iconClassName and children', () => {
    const button = TestUtils.renderIntoDocument(
      <IconButton>test</IconButton>
    );

    const button2 = TestUtils.renderIntoDocument(
      <IconButton iconClassName="fa fa-github" />
    );

    const buttonNode = ReactDOM.findDOMNode(button);
    const button2Node = ReactDOM.findDOMNode(button2);

    expect(buttonNode.textContent).toBe('test');
    expect(buttonNode.querySelector('.md-icon').className).toBe('md-icon material-icons');

    expect(button2Node.textContent).toBe('');
    expect(button2Node.querySelector('.md-icon').className).toBe('md-icon fa fa-github');
  });

  it('displays an children in the button', () => {
    const button = TestUtils.renderIntoDocument(
      <IconButton>test</IconButton>
    );

    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.querySelector('.md-icon')).toBeDefined();
  });

  it('converts the button into a link tag if the href prop is given', () => {
    const button = TestUtils.renderIntoDocument(
      <IconButton href="what">test</IconButton>
    );

    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.nodeName).toBe('A');
  });

  it('applies style to the button', () => {
    const style = { display: 'block' };
    const button = TestUtils.renderIntoDocument(
      <IconButton style={style}>test</IconButton>
    );

    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.style.display).toBe(style.display);
  });

  it('applies event listeners to the button', () => {
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onClick = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();

    const button = TestUtils.renderIntoDocument(
      <IconButton
        label="Test"
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    );

    const buttonNode = ReactDOM.findDOMNode(button);

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
      <IconButton tooltipLabel="Woop woop" />
    );

    const tooltip = ReactDOM.findDOMNode(button).querySelector('.md-tooltip');

    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toBe('Woop woop');
  });

  it('includes ink unless the button is disabled', () => {
    const button = TestUtils.renderIntoDocument(
      <IconButton />
    );

    const disabledButton = TestUtils.renderIntoDocument(
      <IconButton disabled={true} />
    );

    const buttonNode = ReactDOM.findDOMNode(button);
    const disabledButtonNode = ReactDOM.findDOMNode(disabledButton);

    expect(buttonNode.querySelector('.md-ink-container')).toBeDefined();
    expect(disabledButtonNode.querySelector('.md-ink-container')).toBe(null);
  });

  it('prevent button clicks if disabled', () => {
    const onClick = jest.genMockFunction();
    const button = TestUtils.renderIntoDocument(
      <IconButton disabled={true} onClick={onClick} />
    );

    const buttonNode = ReactDOM.findDOMNode(button);

    TestUtils.Simulate.click(buttonNode);
    expect(onClick).not.toBeCalled();
  });
});
