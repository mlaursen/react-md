/* eslint-env jest */
/* eslint-disable max-len */
jest.unmock('../NavigationDrawer');
jest.unmock('../../Dialogs/Dialog');
jest.unmock('../../Drawers/Drawer');
jest.unmock('../../Drawers/DrawerTypes');
jest.unmock('../../Drawers/isType');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import NavigationDrawer from '../NavigationDrawer';
import Drawer from '../../Drawers/Drawer';
import Dialog from '../../Dialogs/Dialog';

describe('NavigationDrawer', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog><NavigationDrawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, NavigationDrawer);
    expect(drawer.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  describe('Drawer', () => {
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
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on tablets', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesTablet;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.PERSISTENT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.PERSISTENT, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on desktop', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.FULL_HEIGHT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(1);
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });

    it('should not update the visibility to false when the defaultVisible prop is enabled and the drawer type is temporary for any screen size', () => {
      const props = {
        defaultVisible: true,
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.TEMPORARY,
        desktopDrawerType: Drawer.DrawerTypes.TEMPORARY,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      let drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(props.tabletDrawerType, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(2);
      expect(props.onMediaTypeChange).toBeCalledWith(props.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
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
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle).toBeCalledWith(true);

      window.matchMedia = matchesMobile;
      renderIntoDocument(<NavigationDrawer {...props} visible defaultMedia="desktop" />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.mobileDrawerType, { mobile: true, tablet: false, desktop: false });
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });

    it('should not attempt to update the drawer type be the media drawer type if constantDrawerType is enabled', () => {
      const { TEMPORARY } = NavigationDrawer.DrawerTypes;
      const onMediaTypeChange = jest.fn();
      renderIntoDocument(<NavigationDrawer constantDrawerType drawerType={TEMPORARY} onMediaTypeChange={onMediaTypeChange} />);
      expect(onMediaTypeChange.mock.calls.length).toBe(0);
    });

    it('should attempt to update the drawer type to be the media drawer type if the constantDrawerType is not enabled', () => {
      window.matchMedia = matchesMobile;
      const { TEMPORARY, PERSISTENT, FULL_HEIGHT } = NavigationDrawer.DrawerTypes;
      const onMediaTypeChange = jest.fn();
      const props = {
        drawerType: TEMPORARY,
        mobileDrawerType: TEMPORARY,
        tabletDrawerType: PERSISTENT,
        desktopDrawerType: FULL_HEIGHT,
        onMediaTypeChange,
        constantDrawerType: false,
      };
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(onMediaTypeChange.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(onMediaTypeChange.mock.calls.length).toBe(1);
      expect(onMediaTypeChange).toBeCalledWith(PERSISTENT, { mobile: false, tablet: true, desktop: false });

      window.matchMedia = matchesDesktop;
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(onMediaTypeChange.mock.calls.length).toBe(2);
      expect(onMediaTypeChange).toBeCalledWith(FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
    });
  });
});
