/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';

import Portal from '../Portal';

describe('Portal', () => {
  it('should call the onOpen prop when the visibility changes from false to true', () => {
    const onOpen = jest.fn();
    const portal = shallow(<Portal visible={false} onOpen={onOpen}><div /></Portal>);

    expect(onOpen.mock.calls.length).toBe(0);

    portal.setProps({ visible: true });
    expect(onOpen.mock.calls.length).toBe(1);
  });

  it('should call the onClose prop when the visibility changes from true to false', () => {
    const onClose = jest.fn();
    const portal = shallow(<Portal visible onClose={onClose}><div /></Portal>);

    expect(onClose.mock.calls.length).toBe(0);

    portal.setProps({ visible: false });
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should create a span element as the first child in the body when using the default props', () => {
    const portal = shallow(<Portal visible={false}><div /></Portal>);
    expect(portal.instance()._container).toBe(null);

    portal.setProps({ visible: true });
    expect(portal.instance()._container).not.toBe(null);
    expect(portal.instance()._container.tagName).toBe('SPAN');
    expect(document.body.firstChild).toEqual(portal.instance()._container);
  });

  it('should create a span element as the last child in the body when using default props but specifying lastChild', () => {
    const portal = shallow(<Portal visible={false} lastChild><div /></Portal>);
    expect(portal.instance()._container).toBe(null);

    portal.setProps({ visible: true });
    expect(portal.instance()._container).not.toBe(null);
    expect(portal.instance()._container.tagName).toBe('SPAN');
    expect(document.body.lastChild).toEqual(portal.instance()._container);
  });

  it('should apply the className prop to the created element', () => {
    const className = 'my-super-amazing-class-name';
    const portal = shallow(<Portal visible={false} className={className}><div /></Portal>);
    expect(portal.instance()._container).toBe(null);
    portal.setProps({ visible: true });
    expect(portal.instance()._container).not.toBe(null);
    expect(portal.instance()._container.className).toBe(className);
  });
});
