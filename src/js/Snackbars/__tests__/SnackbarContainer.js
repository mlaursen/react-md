/* eslint-env jest */
jest.unmock('../SnackbarContainer');
jest.unmock('../../Dialogs/Dialog');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import SnackbarContainer from '../SnackbarContainer';
import Snackbar from '../Snackbar';
import Dialog from '../../Dialogs/Dialog';

const PROPS = { onDismiss: jest.fn(), toasts: [] };
describe('SnackbarContainer', () => {
  it('creates a single timeout for the _initAndToast function that sets the visibility and current toast', () => {
    const container = renderIntoDocument(<SnackbarContainer {...PROPS} />);
    expect(container.state.toast).toBe(null);
    expect(container.state.visible).toBe(false);

    const toast = { text: 'Hello, World!' };
    container._initAndToast(toast);
    expect(container.state.toast).toBe(null);
    expect(container.state.visible).toBe(true);

    jest.runOnlyPendingTimers();
    expect(container.state.toast).toEqual(toast);
    expect(container.state.visible).toBe(true);
  });

  it('creates a single timeout when the _createLeaveTimer is called', () => {
    const container = renderIntoDocument(<SnackbarContainer {...PROPS} />);
    const toast = { text: 'Hello, World!' };
    container._initAndToast(toast);
    jest.runAllTimers();
    expect(container.state.toast).toEqual(toast);
    expect(container.state.visible).toBe(true);

    container._createLeaveTimer();
    expect(container.state.toast).toBe(null);
    expect(container.state.visible).toBe(true);

    jest.runOnlyPendingTimers();
    expect(container.state.toast).toBe(null);
    expect(container.state.visible).toBe(false);
  });

  it('swaps toasts when the _createSwapTimer is called', () => {
    const container = renderIntoDocument(<SnackbarContainer {...PROPS} />);
    const toast = { text: 'Hello, World!' };
    container._initAndToast(toast);
    jest.runAllTimers();
    expect(container.state.toast).toEqual(toast);
    expect(container.state.visible).toBe(true);

    const toast2 = { text: 'Woop Woop' };
    container._createSwapTimer(toast2);
    expect(container.state.toast).toBe(null);
    expect(container.state.visible).toBe(true);

    jest.runOnlyPendingTimers();
    expect(container.state.toast).toEqual(toast2);
    expect(container.state.visible).toBe(true);
  });

  it('calls the _isMultiline with the toast when the _initAndToast function is called', () => {
    const container = renderIntoDocument(<SnackbarContainer {...PROPS} />);
    container._isMultiline = jest.fn();
    expect(container._isMultiline.mock.calls.length).toBe(0);

    const toast = { text: 'Hello, World!' };
    container._initAndToast(toast);
    jest.runAllTimers();
    expect(container._isMultiline.mock.calls.length).toBe(1);
    expect(container._isMultiline.mock.calls[0][0]).toEqual(toast);
  });

  it('renders a Snackbar component with the stle and className', () => {
    const props = Object.assign({}, PROPS, { style: { background: 'orange' }, className: 'test' });
    const container = renderIntoDocument(<SnackbarContainer {...props} />);
    let snackbars = scryRenderedComponentsWithType(container, Snackbar);
    expect(snackbars.length).toBe(0);

    const toast = { text: 'Hello, World!' };
    container._initAndToast(toast);
    jest.runAllTimers();

    snackbars = scryRenderedComponentsWithType(container, Snackbar);
    expect(snackbars.length).toBe(1);
    expect(snackbars[0].props.style).toEqual(props.style);
    expect(snackbars[0].props.className).toContain(props.className);
  });

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog><SnackbarContainer {...PROPS} /></Dialog>);
    const snackbar = findRenderedComponentWithType(dialog, SnackbarContainer);
    expect(snackbar.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });
});
