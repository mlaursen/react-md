/* eslint-env jest */
/* eslint-disable max-len */
jest.unmock('../Drawer');
jest.unmock('../DrawerTypes');
jest.unmock('../isType');
jest.unmock('../../constants/media');
jest.unmock('../../Dialogs/Dialog');
jest.unmock('../../Papers/Paper');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import Drawer from '../Drawer';
import Dialog from '../../Dialogs/Dialog';

describe('Drawer', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog><Drawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, Drawer);
    const { renderNode } = dialog.getChildContext();
    expect(drawer.context.renderNode).toBe(renderNode);
  });

  describe('updateType', () => {
    const MATCH_MEDIA = window.matchMedia;
    const matchesMobile = jest.fn(query => ({
      matches: query.indexOf(Drawer.defaultProps.mobileMinWidth) !== -1,
    }));
    const matchesTablet = jest.fn(query => ({
      matches: query.indexOf(Drawer.defaultProps.tabletMinWidth) !== -1,
    }));
    const matchesDesktop = jest.fn(query => ({
      matches: query.indexOf('max') === -1
        && query.indexOf(Drawer.defaultProps.desktopMinWidth) !== -1,
    }));
    afterAll(() => {
      window.matchMedia = MATCH_MEDIA;
    });

    it('should correctly set the default visibility on mobile devices', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on tablets', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesTablet;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.PERSISTENT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.DrawerTypes.PERSISTENT, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on desktop', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.FULL_HEIGHT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.DrawerTypes.FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(1);
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });

    it('should not update the visibility to false when the defaultVisible prop is enabled and the drawer type is temporary for any screen size', () => {
      const props = {
        defaultVisible: true,
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.TEMPORARY,
        desktopType: Drawer.DrawerTypes.TEMPORARY,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      let drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(props.tabletType, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(2);
      expect(props.onMediaTypeChange).toBeCalledWith(props.desktopType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly update the visibility when the visible prop was defined and there was a media type change with visibility', () => {
      const props = {
        visible: false,
        defaultMedia: 'mobile',
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      renderIntoDocument(<Drawer {...props} />);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.defaultProps.desktopType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle).toBeCalledWith(true);

      window.matchMedia = matchesMobile;
      renderIntoDocument(<Drawer {...props} visible defaultMedia="desktop" />);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.defaultProps.mobileType, { mobile: true, tablet: false, desktop: false });
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });
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
