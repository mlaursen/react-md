/* eslint-env jest */
jest.unmock('../DialogContainer');
jest.unmock('../Dialog');

import React from 'react';
import { shallow, mount } from 'enzyme';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import DialogContainer from '../DialogContainer';
import Dialog from '../Dialog';

const PROPS = { id: 'test', visible: true, onHide: jest.fn() };

describe('DialogContainer', () => {
  it('should merge style and className correctly', () => {
    const props = {
      ...PROPS,
      style: { background: 'black' },
      className: 'test-class-name',
    };

    const container = shallow(<DialogContainer {...props} />);
    const group = container.find(CSSTransitionGroup);
    expect(group.length).toBe(1);
    expect(group.props().style).toEqual(props.style);
    expect(group.hasClass(props.className)).toBe(true);
  });

  it('should merge style and className correctly for the nested dialog', () => {
    const props = { ...PROPS, dialogStyle: { background: 'red' }, dialogClassName: 'some-test-name' };
    const container = shallow(<DialogContainer {...props} />);
    const dialog = container.find(Dialog);
    expect(dialog.props().style).toEqual(props.dialogStyle);
    expect(dialog.hasClass(props.dialogClassName)).toBe(true);
  });

  it('should create two timeouts when a non-full page dialog is rendered visible', () => {
    const props = { ...PROPS, visible: false };
    const container = shallow(<DialogContainer {...props} />);
    expect(container.state('dialogVisible')).toBe(false);
    expect(container.state('overlay')).toBe(false);
    expect(container.state('active')).toBe(false);

    container.setProps({ visible: true });
    jest.runOnlyPendingTimers();
    expect(container.state('dialogVisible')).toBe(true);
    expect(container.state('overlay')).toBe(true);
    expect(container.state('active')).toBe(false);

    jest.runOnlyPendingTimers();
    expect(container.state('dialogVisible')).toBe(true);
    expect(container.state('overlay')).toBe(true);
    expect(container.state('active')).toBe(true);
  });

  it('should create a single timeout when a full page dialog is rendered visible', () => {
    const props = { ...PROPS, visible: false, fullPage: true };
    const container = shallow(<DialogContainer {...props} />);
    expect(container.state('dialogVisible')).toBe(false);
    expect(container.state('overlay')).toBe(false);
    expect(container.state('active')).toBe(false);

    container.setProps({ visible: true });
    jest.runOnlyPendingTimers();
    expect(container.state('dialogVisible')).toBe(true);
    expect(container.state('overlay')).toBe(false);
    expect(container.state('active')).toBe(false);

    jest.runOnlyPendingTimers();
    expect(container.state('dialogVisible')).toBe(true);
    expect(container.state('overlay')).toBe(false);
    expect(container.state('active')).toBe(false);
  });

  it('should call the onHide prop when the container is clicked', () => {
    const onHide = jest.fn();
    const container = mount(<DialogContainer {...PROPS} onHide={onHide} />);
    container.find(CSSTransitionGroup).simulate('click');
    expect(onHide.mock.calls.length).toBe(1);
  });

  it('should not call the onHide prop when the modal prop is enabled and the container is clicked', () => {
    const onHide = jest.fn();
    const container = mount(<DialogContainer {...PROPS} onHide={onHide} modal />);
    container.find(CSSTransitionGroup).simulate('click');
    expect(onHide.mock.calls.length).toBe(0);
  });

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = mount(
      <Dialog id="dialog-1">
        <DialogContainer {...PROPS} />
      </Dialog>
    );

    const { renderNode } = dialog.get(0).getChildContext();

    const container = dialog.find(DialogContainer);
    expect(container.get(0).context.renderNode).toBe(renderNode);
  });
});
