/* eslint-env jest*/
jest.unmock('../Button');
jest.unmock('../RaisedButton');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import RaisedButton from '../RaisedButton';
import FontIcon from '../../FontIcons';

describe('RaisedButton', () => {
  it('it merges a className prop', () => {
    const button = TestUtils.renderIntoDocument(
      <RaisedButton label="Test" className="test" />
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.className).toBe('md-btn md-raised-btn test');
  });

  it('displays a label in the button', () => {
    const button = TestUtils.renderIntoDocument(
      <RaisedButton label="Hello, World!" />
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.textContent).toBe('Hello, World!');
  });

  it('displays an icon as children in the button', () => {
    const button = TestUtils.renderIntoDocument(
      <RaisedButton label="Test">
        <FontIcon>test</FontIcon>
      </RaisedButton>
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.querySelector('.md-icon')).toBeDefined();
  });

  it('can display an icon before or after the label in the button', () => {
    const iconBeforeButton = TestUtils.renderIntoDocument(
      <RaisedButton label="Test">
        <FontIcon>test</FontIcon>
      </RaisedButton>
    );

    const iconAfterButton = TestUtils.renderIntoDocument(
      <RaisedButton label="Test" iconBefore={false}>
        <FontIcon>test</FontIcon>
      </RaisedButton>
    );

    const [iconBeforeIcon, iconBeforeText] = findDOMNode(iconBeforeButton)
      .querySelector('.icon-separator').childNodes;
    const [iconAfterText, iconAfterIcon] = findDOMNode(iconAfterButton)
      .querySelector('.icon-separator').childNodes;

    expect(iconBeforeIcon.classList.contains('md-icon')).toBe(true);
    expect(iconBeforeText.textContent).toBe('Test');

    expect(iconAfterIcon.classList.contains('md-icon')).toBe(true);
    expect(iconAfterText.textContent).toBe('Test');
  });

  it('converts the button into a link tag if the href prop is given', () => {
    const button = TestUtils.renderIntoDocument(
      <RaisedButton label="Test" href="what" />
    );

    const buttonNode = findDOMNode(button);

    expect(buttonNode.nodeName).toBe('A');
  });

  it('appends md-primary or md-secondary depending on which prop is set to true', () => {
    const primaryButton = TestUtils.renderIntoDocument(
      <RaisedButton primary className="test" label="Test" />
    );

    const secondaryButton = TestUtils.renderIntoDocument(
      <RaisedButton secondary className="test" label="Test" />
    );

    const primaryButtonNode = findDOMNode(primaryButton);
    const secondaryButtonNode = findDOMNode(secondaryButton);

    expect(primaryButtonNode.classList.contains('md-primary')).toBe(true);
    expect(primaryButtonNode.classList.contains('test')).toBe(true);

    expect(secondaryButtonNode.classList.contains('md-secondary')).toBe(true);
    expect(secondaryButtonNode.classList.contains('test')).toBe(true);
  });

  it('applies style to the button', () => {
    const style = { display: 'block' };
    const button = TestUtils.renderIntoDocument(
      <RaisedButton style={style} label="Test" />
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
      <RaisedButton
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

  it('prevent button clicks if disabled', () => {
    const onClick = jest.fn();
    const button = TestUtils.renderIntoDocument(
      <RaisedButton label="test" disabled onClick={onClick} />
    );

    const buttonNode = findDOMNode(button);

    TestUtils.Simulate.click(buttonNode);
    expect(onClick).not.toBeCalled();
  });
});
