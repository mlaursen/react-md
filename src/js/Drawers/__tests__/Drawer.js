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

  describe('matchesMedia', () => {
    const MATCH_MEDIA = window.matchMedia;
    let matchMedia;
    beforeEach(() => {
      matchMedia = jest.fn(() => ({ matches: false }));
      window.matchMedia = matchMedia;
    });

    it('should call the window.matchMedia with a min width', () => {
      Drawer.matchesMedia(320);
      expect(matchMedia.mock.calls.length).toBe(1);
      expect(matchMedia.mock.calls[0][0]).toBe('screen and (min-width: 320px)');

      Drawer.matchesMedia(800);
      expect(matchMedia.mock.calls.length).toBe(2);
      expect(matchMedia.mock.calls[1][0]).toBe('screen and (min-width: 800px)');
    });

    it('should call window.matchMedia with the min and max width', () => {
      Drawer.matchesMedia(320, 800);
      expect(matchMedia.mock.calls.length).toBe(1);
      expect(matchMedia.mock.calls[0][0]).toBe('screen and (min-width: 320px) and (max-width: 800px)');
    });

    afterAll(() => {
      window.matchMedia = MATCH_MEDIA;
    });
  });

  describe('getCurrentMedia', () => {
    const { mobileMinWidth, tabletMinWidth, desktopMinWidth } = Drawer.defaultProps;
    const MATCH_MEDIA = window.matchMedia;
    it('should return the mobile drawer type when the media matches mobile', () => {
      window.matchMedia = jest.fn(query => ({
        matches: !!query.match(`min-width: ${mobileMinWidth}`),
      }));
      const expected = { mobile: true, tablet: false, desktop: false, type: Drawer.defaultProps.mobileType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    it('should return the tablet drawer type when the media matches tablet', () => {
      window.matchMedia = jest.fn(query => ({
        matches: !!query.match(`min-width: ${tabletMinWidth}`),
      }));
      const expected = { mobile: false, tablet: true, desktop: false, type: Drawer.defaultProps.tabletType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    it('should return the desktop drawer type when the media matches desktop', () => {
      window.matchMedia = jest.fn(query => ({
        matches: !!query.match(`min-width: ${desktopMinWidth}`),
      }));
      const expected = { mobile: false, tablet: false, desktop: true, type: Drawer.defaultProps.desktopType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    afterAll(() => {
      window.matchMedia = MATCH_MEDIA;
    });
  });
});
