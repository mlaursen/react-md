/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

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
  it('creates two timeouts when the _mountDialog function is called and the full page prop is false', () => {
    const props = Object.assign({}, PROPS, { visible: false });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    expect(container.state.dialogVisible).toBe(false);
    expect(container.state.overlay).toBe(false);
    expect(container.state.active).toBe(false);

    container._mountDialog(props);
    jest.runOnlyPendingTimers();
    expect(container.state.dialogVisible).toBe(true);
    expect(container.state.overlay).toBe(true);
    expect(container.state.active).toBe(false);

    jest.runOnlyPendingTimers();
    expect(container.state.dialogVisible).toBe(true);
    expect(container.state.overlay).toBe(true);
    expect(container.state.active).toBe(true);
  });

  it('creates a single timeout when the _muntDialog function is called and the full page prop is true', () => {
    const props = Object.assign({}, PROPS, { visible: false, fullPage: true });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    expect(container.state.dialogVisible).toBe(false);
    expect(container.state.overlay).toBe(false);
    expect(container.state.active).toBe(false);

    container._mountDialog(props);
    jest.runOnlyPendingTimers();
    expect(container.state.dialogVisible).toBe(true);
    expect(container.state.overlay).toBe(false);
    expect(container.state.active).toBe(false);

    jest.runOnlyPendingTimers();
    expect(container.state.dialogVisible).toBe(true);
    expect(container.state.overlay).toBe(false);
    expect(container.state.active).toBe(false);
  });


  it('renders a Dialog when the visible prop is true', () => {
    const props = Object.assign({}, PROPS, { visible: false });
    let container = renderIntoDocument(<DialogContainer {...props} />);
    let dialogs = scryRenderedComponentsWithType(container, Dialog);

    expect(dialogs.length).toBe(0);

    props.visible = true;
    container = renderIntoDocument(<DialogContainer {...props} />);
    jest.runAllTimers();
    dialogs = scryRenderedComponentsWithType(container, Dialog);
    expect(dialogs.length).toBe(1);
  });

  it('calls the onHide prop when the container is clicked', () => {
    const props = Object.assign({}, PROPS, { onHide: jest.fn() });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    const node = findDOMNode(findRenderedComponentWithType(container, CSSTransitionGroup));

    expect(props.onHide.mock.calls.length).toBe(0);

    Simulate.click(node);
    expect(props.onHide.mock.calls.length).toBe(1);
  });

  it('does not call the onHide prop when the container is clicked and the modal prop is true', () => {
    const props = Object.assign({}, PROPS, { onHide: jest.fn(), modal: true, visible: true });
    const container = renderIntoDocument(<DialogContainer {...props} />);
    const node = findDOMNode(findRenderedComponentWithType(container, CSSTransitionGroup));

    expect(props.onHide.mock.calls.length).toBe(0);

    Simulate.click(node);
    expect(props.onHide.mock.calls.length).toBe(0);
  });

  it('passes the styles and classNames correctly to the Dialog component', () => {
    const props = Object.assign({}, PROPS, {
      visible: true,
      style: { background: 'orange' },
      className: 'woop-woop',
      dialogStyle: { background: 'red' },
      dialogClassName: 'that-the-sound',
      contentStyle: { background: 'blue' },
      contentClassName: 'of-the-police',
    });

    const container = renderIntoDocument(<DialogContainer {...props} />);
    jest.runAllTimers();
    const dialog = findRenderedComponentWithType(container, Dialog);

    expect(dialog.props.style).toEqual(props.dialogStyle);
    expect(dialog.props.className).toContain(props.dialogClassName);
    expect(dialog.props.contentStyle).toEqual(props.contentStyle);
    expect(dialog.props.contentClassName).toBe(props.contentClassName);
  });

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test" aria-label="Test"><DialogContainer {...PROPS} /></Dialog>);
    const container = findRenderedComponentWithType(dialog, DialogContainer);
    expect(container.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const dialog = shallow(<DialogContainer id="test" visible onHide={jest.fn()} aria-label="Test" />);
    expect(dialog.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const dialog = shallow(<DialogContainer id="test" visible onHide={jest.fn()} portal aria-label="Test" />);
    expect(dialog.find(Portal).length).toBe(1);
  });
});
