/* eslint-env jest */
jest.unmock('../Drawer');
jest.unmock('../../Dialogs/Dialog');
jest.unmock('../../Dialogs/DialogContainer');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import Drawer from '../Drawer';
import Dialog from '../../Dialogs/Dialog';
import DialogContainer from '../../Dialogs/DialogContainer';

describe('Drawer', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog><Drawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, Drawer);
    expect(drawer.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should inerhit and pass the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(
      <Dialog>
        <Drawer defaultVisible>
          <DialogContainer id="nested-dialog" visible onHide={jest.fn()} />
        </Drawer>
      </Dialog>
    );
    const drawer = findRenderedComponentWithType(dialog, Drawer);
    const dialogContainer = findRenderedComponentWithType(dialog, DialogContainer);
    const { renderNode } = dialog.getChildContext();
    expect(drawer.context.renderNode).toBe(renderNode);
    expect(dialogContainer.context.renderNode).toBe(renderNode);
  });
});
