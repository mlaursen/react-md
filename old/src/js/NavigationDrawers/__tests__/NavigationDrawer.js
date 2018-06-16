/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';

import matchMedia, { matchesMobile, matchesTablet, matchesDesktop } from '../../../../__mocks__/matchMedia';
import NavigationDrawer from '../NavigationDrawer';
import Drawer from '../../Drawers/Drawer';
import Overlay from '../../Drawers/Overlay';
import Dialog from '../../Dialogs/Dialog';
import Portal from '../../Helpers/Portal';

describe('NavigationDrawer', () => {
  beforeEach(() => {
    matchesMobile.mockClear();
    matchesTablet.mockClear();
    matchesDesktop.mockClear();
  });

  afterAll(() => {
    window.matchMedia = matchMedia;
  });

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test" aria-label="Test"><NavigationDrawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, NavigationDrawer);
    expect(drawer.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should not render in the Portal component by default', () => {
    window.matchMedia = matchesMobile;
    const drawer = mount(<NavigationDrawer />);
    expect(drawer.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    window.matchMedia = matchesMobile;
    const drawer = mount(<NavigationDrawer portal />);
    expect(drawer.find(Portal).length).toBe(1);
  });

  it('should provide the overlayStyle and overlayClassName to the Overlay', () => {
    const props = {
      type: NavigationDrawer.DrawerTypes.TEMPORARY,
      onMediaTypeChange: () => {},
      inline: true,
      overlayStyle: { background: 'red' },
      overlayClassName: 'overlay-class-name',
    };
    const drawer = mount(<NavigationDrawer {...props} />);
    const overlay = drawer.find(Overlay);
    expect(overlay.length).toBe(1);
    expect(overlay.hasClass(props.overlayClassName));
    expect(overlay.props().style).toBe(props.overlayStyle);
  });

  it('should always render the permanent drawers as visible even if defaultVisible is false', () => {
    window.matchMedia = matchesDesktop;
    const drawer = mount(
      <NavigationDrawer
        defaultVisible={false}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
      />
    );

    expect(drawer.state('visible')).toBe(true);
    drawer.unmount();
    window.matchMedia = matchesMobile;
    drawer.mount();
    expect(drawer.state('visible')).toBe(false);
  });

  describe('Drawer', () => {
    it('should correctly set the default visibility on mobile devices', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on tablets', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesTablet;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.PERSISTENT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.PERSISTENT, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on desktop', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.FULL_HEIGHT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityChange.mock.calls.length).toBe(1);
      expect(props.onVisibilityChange).toBeCalledWith(true);
    });

    it('should not update the visibility to false when the defaultVisible prop is enabled and the drawer type is temporary for any screen size', () => {
      const props = {
        defaultVisible: true,
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.TEMPORARY,
        desktopDrawerType: Drawer.DrawerTypes.TEMPORARY,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      let drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(props.tabletDrawerType, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(2);
      expect(props.onMediaTypeChange).toBeCalledWith(props.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);
    });

    it('should correctly update the visibility when the visible prop was defined and there was a media type change with visibility', () => {
      const props = {
        visible: false,
        defaultMedia: 'mobile',
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityChange).toBeCalledWith(true);

      window.matchMedia = matchesMobile;
      renderIntoDocument(<NavigationDrawer {...props} visible defaultMedia="desktop" />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.mobileDrawerType, { mobile: true, tablet: false, desktop: false });
      expect(props.onVisibilityChange).toBeCalledWith(true);
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
