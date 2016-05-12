/*eslint-env jest*/
jest.unmock('../RadioGroup');
jest.unmock('../Radio');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

describe('RadioGroup', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const radioGroup = renderIntoDocument(
      <RadioGroup style={style} className={className}>
        <Radio value="A" />
        <Radio value="B" />
      </RadioGroup>
    );

    const radioGroupNode = findDOMNode(radioGroup);
    expect(radioGroupNode.style.display).toBe(style.display);
    expect(radioGroupNode.classList.contains(className)).toBe(true);
  });

  it('injects a name into all the radio buttons', () => {
    const radioGroup = renderIntoDocument(
      <RadioGroup name="test">
        <Radio value="A" />
        <Radio value="B" />
      </RadioGroup>
    );

    const radios = scryRenderedComponentsWithType(radioGroup, Radio);
    expect(radios.length).toBe(2);
    expect(radios[0].props.name).toBe('test');
    expect(radios[1].props.name).toBe('test');
  });
});
