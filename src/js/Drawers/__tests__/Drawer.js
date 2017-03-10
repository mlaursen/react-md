/* eslint-env jest */
jest.unmock('../Drawer');
jest.unmock('../../Dialogs/Dialog');
jest.unmock('../isType');
jest.unmock('../../Papers/Paper');

import React from 'react';
import { shallow } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import Drawer from '../Drawer';
import Dialog from '../../Dialogs/Dialog';
import Portal from '../../Helpers/Portal';

describe('Drawer', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test"><Drawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, Drawer);
    const { renderNode } = dialog.getChildContext();
    expect(drawer.context.renderNode).toBe(renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const drawer = shallow(<Drawer />);
    expect(drawer.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const drawer = shallow(<Drawer portal />);
    // One for overlay and one for the drawer itself
    expect(drawer.find(Portal).length).toBe(2);
  });

  it('should call the updateType function after initial mount', () => {
    const onVisibilityToggle = jest.fn();
    renderIntoDocument(
      <Drawer
        onVisibilityToggle={onVisibilityToggle}
        drawerType={Drawer.DrawerTypes.PERSISTENT}
      />
    );

    expect(onVisibilityToggle.mock.calls.length).toBe(1);
  });


  it('should not call the updateType function after mounting if defaultVisible is true', () => {
    const onVisibilityToggle = jest.fn();
    const onMediaTypeChange = jest.fn();
    const drawer = renderIntoDocument(
      <Drawer
        defaultVisible
        onMediaTypeChange={onMediaTypeChange}
        onVisibilityToggle={onVisibilityToggle}
        drawerType={Drawer.DrawerTypes.PERSISTENT}
      />
    );

    expect(onVisibilityToggle.mock.calls.length).toBe(0);
    expect(onMediaTypeChange.mock.calls.length).toBe(0);
    expect(drawer.state.visible).toBe(true);
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
