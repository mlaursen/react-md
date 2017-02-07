/* eslint-env jest */
jest.unmock('../BottomNavigation');
jest.unmock('../../Dialogs/Dialog');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import BottomNavigation from '../BottomNavigation';
import Dialog from '../../Dialogs/Dialog';

describe('BottomNavigation', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const links = [{ label: '' }, { label: '' }, { label: '' }];
    const dialog = renderIntoDocument(<Dialog><BottomNavigation links={links} /></Dialog>);
    const bottomNav = findRenderedComponentWithType(dialog, BottomNavigation);
    expect(bottomNav.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });
});

