/* eslint-env jest */
jest.unmock('../Chip');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import Chip from '../Chip';

describe('Chip', () => {
  it('adds className and style onto the container component', () => {
    const style = { display: 'block' };
    const chip = renderIntoDocument(
      <Chip className="test" label="Test" style={style} />
    );

    const chipNode = findDOMNode(chip);

    expect(chipNode.className).toBe('md-chip-container test');
    expect(chipNode.style.display).toBe(style.display);
  });

  it('toggles a focus className on chip focus and blur', () => {
    const chip = renderIntoDocument(<Chip label="Test" />);
    const chipNode = findDOMNode(chip);

    Simulate.focus(chipNode.querySelector('button'));

    expect(chipNode.classList.contains('focus')).toBe(true);

    Simulate.blur(chipNode.querySelector('button'));
    expect(chipNode.classList.contains('focus')).toBe(false);
  });

  it('injects a remove icon button if the remove prop is not undefined', () => {
    const remove = jest.genMockFunction();
    const chip = renderIntoDocument(
      <Chip label="Test" remove={remove} />
    );

    const chipNode = findDOMNode(chip);
    const [chipBtn, removeBtn] = chipNode.querySelectorAll('button');

    expect(chipBtn.textContent).toBe('Test');
    expect(chipBtn.classList.contains('with-remove')).toBe(true);

    expect(removeBtn.className).toBe('md-chip-remove');

    Simulate.click(removeBtn);

    expect(remove).toBeCalled();
  });

  it('allows for customizable remove icons', () => {
    const remove = jest.genMockFunction();
    const chip = renderIntoDocument(
      <Chip
        label="Test"
        remove={remove}
        removeIconClassName="fa fa-close"
        removeIconChildren={null}
      />
    );

    const chipNode = findDOMNode(chip);
    const removeButton = chipNode.querySelectorAll('button')[1];

    const removeIcon = removeButton.querySelector('i');

    expect(removeIcon).not.toBe(null);
    expect(removeIcon.className).toBe('md-icon fa fa-close');
    expect(removeIcon.textContent).toBe('');
  });

  it('passes all remaining props to the button component', () => {
    const onClick = jest.genMockFunction();
    const onFocus = jest.genMockFunction();
    const onBlur = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const chip = renderIntoDocument(
      <Chip
        label="Test"
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      />
    );

    const chipNode = findDOMNode(chip).querySelector('button');

    Simulate.click(chipNode);
    expect(onClick).toBeCalled();

    Simulate.focus(chipNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(chipNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(chipNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(chipNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(chipNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(chipNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(chipNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(chipNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(chipNode);
    expect(onTouchCancel).toBeCalled();
  });
});
