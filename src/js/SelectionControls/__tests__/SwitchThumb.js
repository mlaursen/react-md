/* eslint-env jest */
jest.unmock('../SwitchThumb');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import SwitchThumb from '../SwitchThumb';
import AccessibleFakeInkedButton from '../../Helpers/AccessibleFakeInkedButton';

const noop = () => {};
describe('SwitchThumb', () => {
  it('renders an AccessibleFakeInkedButton', () => {
    const thumb = renderIntoDocument(<SwitchThumb onClick={noop} />);
    const btns = scryRenderedComponentsWithType(thumb, AccessibleFakeInkedButton);
    expect(btns.length).toBe(1);
  });

  it('renders an AccessibleFakeInkedButton with the correct classNames', () => {
    const props = { disabled: false, checked: false, onClick: noop };
    let thumb = renderIntoDocument(<SwitchThumb {...props} />);
    let btn = findRenderedComponentWithType(thumb, AccessibleFakeInkedButton);
    expect(btn.props.className).toContain('md-switch-thumb');
    expect(btn.props.className).not.toContain('--disabled');
    expect(btn.props.className).not.toContain('--on');
    expect(btn.props.className).toContain('--off');

    props.disabled = true;
    thumb = renderIntoDocument(<SwitchThumb {...props} />);
    btn = findRenderedComponentWithType(thumb, AccessibleFakeInkedButton);
    expect(btn.props.className).toContain('md-switch-thumb');
    expect(btn.props.className).toContain('--disabled');
    expect(btn.props.className).not.toContain('--on');
    expect(btn.props.className).toContain('--off');

    props.checked = true;
    thumb = renderIntoDocument(<SwitchThumb {...props} />);
    btn = findRenderedComponentWithType(thumb, AccessibleFakeInkedButton);
    expect(btn.props.className).toContain('md-switch-thumb');
    expect(btn.props.className).toContain('--disabled');
    expect(btn.props.className).toContain('--on');
    expect(btn.props.className).not.toContain('--off');
  });
});
