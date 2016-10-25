/* eslint-env jest */
jest.unmock('../SwitchTrack');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
} from 'react-addons-test-utils';

import SwitchTrack from '../SwitchTrack';

describe('SwitchTrack', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
    };

    const track = renderIntoDocument(<SwitchTrack {...props} />);

    const trackNode = findDOMNode(track);
    expect(trackNode.style.background).toBe(props.style.background);
    expect(trackNode.className).toContain(props.className);
  });

  it('adds the correct stateful classnames', () => {
    const props = { disabled: false, checked: false };
    let track = renderIntoDocument(<SwitchTrack {...props} />);
    let className = findDOMNode(track).className;

    expect(className).toContain('md-switch-track');
    expect(className).toContain('md-pointer--hover');
    expect(className).not.toContain('--disabled');
    expect(className).not.toContain('--on');
    expect(className).toContain('--off');

    props.disabled = true;
    track = renderIntoDocument(<SwitchTrack {...props} />);
    className = findDOMNode(track).className;

    expect(className).toContain('md-switch-track');
    expect(className).not.toContain('md-pointer--hover');
    expect(className).toContain('--disabled');
    expect(className).not.toContain('--on');
    expect(className).toContain('--off');

    props.checked = true;
    track = renderIntoDocument(<SwitchTrack {...props} />);
    className = findDOMNode(track).className;

    expect(className).toContain('md-switch-track');
    expect(className).not.toContain('md-pointer--hover');
    expect(className).toContain('--disabled');
    expect(className).toContain('--on');
    expect(className).not.toContain('--off');
  });
});
