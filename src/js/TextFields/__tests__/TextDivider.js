/*eslint-env jest*/
jest.unmock('../TextDivider');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import TextDivider from '../TextDivider';

describe('TextDivider', () => {
  it('updates the className with the stateful classNames', () => {
    let props = {
      lineDirection: 'left',
      active: false,
      error: false,
      icon: false,
    };

    let divider = renderIntoDocument(<TextDivider {...props} />);
    let className = findDOMNode(divider).className;

    expect(className).toContain('md-text-divider');
    expect(className).toContain('from-left');
    expect(className).not.toContain('active');
    expect(className).not.toContain('error');
    expect(className).not.toContain('icon-offset');

    props = Object.assign({}, props, { active: true, error: true, icon: true });

    divider = renderIntoDocument(<TextDivider {...props} />);
    className = findDOMNode(divider).className;

    expect(className).toContain('md-text-divider');
    expect(className).toContain('from-left');
    expect(className).toContain('active');
    expect(className).toContain('error');
    expect(className).toContain('icon-offset');
  });
});
