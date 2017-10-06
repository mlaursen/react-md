/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import DialogContainer from '../DialogContainer';
import Dialog from '../Dialog';
import Portal from '../../Helpers/Portal';

const PROPS = {
  id: 'test',
  visible: true,
  onHide: jest.fn(),
  'aria-label': 'Test',
  focusOnMount: false,
};
jest.useFakeTimers();

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
      <Dialog id="dialog-1" aria-label="Parent Dialog">
        <DialogContainer {...PROPS} />
      </Dialog>
    );

    const { renderNode } = dialog.instance().getChildContext();

    const container = dialog.find(DialogContainer);
    expect(container.instance().context.renderNode).toBe(renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const dialog = shallow(<DialogContainer {...PROPS} />);
    expect(dialog.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const dialog = shallow(<DialogContainer {...PROPS} portal />);
    expect(dialog.find(Portal).length).toBe(1);
  });

  it('should correctly reset the timeout if the dialog is closed before the enter animation finishes', () => {
    // Get parallel errors otherwise
    jest.runAllTimers();
    setTimeout.mockClear();
    clearTimeout.mockClear();

    const container = mount(
      <DialogContainer
        id="dialog-1"
        aria-labelledby="dialog-title"
        visible={false}
        onHide={() => {}}
        focusOnMount={false}
      >
        <h1 id="dialog-title">Hello</h1>
      </DialogContainer>
    );

    expect(setTimeout.mock.calls.length).toBe(0);
    container.setProps({ visible: true });

    expect(setTimeout.mock.calls.length).toBe(1);
    container.setProps({ visible: false });

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(clearTimeout.mock.calls.length).toBe(1);
    jest.runAllTimers();

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(clearTimeout.mock.calls.length).toBe(1);
  });
});
