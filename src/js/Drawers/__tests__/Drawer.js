/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';

import matchMedia, { matchesMobile, matchesTablet, matchesDesktop } from '../../../../__mocks__/matchMedia';
import Drawer from '../Drawer';
import Overlay from '../Overlay';
import Paper from '../../Papers/Paper';
import Dialog from '../../Dialogs/Dialog';
import Portal from '../../Helpers/Portal';

describe('Drawer', () => {
  beforeEach(() => {
    matchesMobile.mockClear();
    matchesTablet.mockClear();
    matchesDesktop.mockClear();
  });

  afterAll(() => {
    window.matchMedia = matchMedia;
  });

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test" aria-label="Test"><Drawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, Drawer);
    const { renderNode } = dialog.getChildContext();
    expect(drawer.context.renderNode).toBe(renderNode);
  });

  it('should not render in the Portal component by default', () => {
    window.matchMedia = matchesMobile;
    const drawer = mount(<Drawer />);
    expect(drawer.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    window.matchMedia = matchesMobile;
    const drawer = mount(<Drawer portal />);
    // One for the drawer itself
    expect(drawer.find(Portal).length).toBe(1);
  });

  it('should not apply the transition class names while mini or permanent', () => {
    window.matchMedia = matchesDesktop;
    // Have to do inline since this version of react-md still uses portals by default
    const drawer1 = mount(<Drawer type={Drawer.DrawerTypes.PERSISTENT} onMediaTypeChange={() => {}} inline />);
    const drawer2 = mount(<Drawer type={Drawer.DrawerTypes.TEMPORARY_MINI} inline />);
    const drawer3 = mount(<Drawer type={Drawer.DrawerTypes.FULL_HEIGHT} onMediaTypeChange={() => {}} />);

    const paper1 = drawer1.find(Paper);
    const paper2 = drawer2.find(Paper);
    const paper3 = drawer3.find(Paper);
    expect(paper1.length).toBe(1);
    expect(paper2.length).toBe(1);
    expect(paper3.length).toBe(1);

    expect(paper1.hasClass('md-transition--deceleration')).toBe(true);
    expect(paper1.hasClass('md-transition--acceleration')).toBe(false);
    expect(paper2.hasClass('md-transition--deceleration')).toBe(false);
    expect(paper2.hasClass('md-transition--acceleration')).toBe(false);
    expect(paper3.hasClass('md-transition--deceleration')).toBe(false);
    expect(paper3.hasClass('md-transition--acceleration')).toBe(false);
  });

  it('should provide the overlayStyle and overlayClassName to the Overlay', () => {
    const props = {
      type: Drawer.DrawerTypes.TEMPORARY,
      onMediaTypeChange: () => {},
      inline: true,
      overlayStyle: { background: 'red' },
      overlayClassName: 'overlay-class-name',
    };
    const drawer = mount(<Drawer {...props} />);
    const overlay = drawer.find(Overlay);
    expect(overlay.length).toBe(1);
    expect(overlay.hasClass(props.overlayClassName));
    expect(overlay.props().style).toBe(props.overlayStyle);
  });

  describe('zDepth', () => {
    it('should correctly set the zDepth when the prop is undefined based on the type prop', () => {
      const drawer = shallow(
        <Drawer
          visible
          type={Drawer.DrawerTypes.FULL_HEIGHT}
          onVisibilityChange={() => {}}
          onMediaTypeChange={() => {}}
        />
      );

      const getZDepth = () => drawer.find(Paper).props().zDepth;
      expect(getZDepth()).toBe(1);

      drawer.setProps({ type: Drawer.DrawerTypes.CLIPPED });
      expect(getZDepth()).toBe(1);

      drawer.setProps({ type: Drawer.DrawerTypes.FLOATING });
      expect(getZDepth()).toBe(0);

      drawer.setProps({ type: Drawer.DrawerTypes.PERSISTENT });
      expect(getZDepth()).toBe(1);

      drawer.setProps({ type: Drawer.DrawerTypes.PERSISTENT_MINI });
      expect(getZDepth()).toBe(1);

      drawer.setProps({ type: Drawer.DrawerTypes.TEMPORARY });
      expect(getZDepth()).toBe(5);

      drawer.setProps({ type: Drawer.DrawerTypes.TEMPORARY_MINI });
      expect(getZDepth()).toBe(1);

      drawer.setProps({ type: Drawer.DrawerTypes.FULL_HEIGHT, inline: true });
      expect(getZDepth()).toBe(0);
    });

    it('should always use the provided zDepth prop if it exists', () => {
      const drawer = shallow(
        <Drawer
          visible
          type={Drawer.DrawerTypes.FULL_HEIGHT}
          onVisibilityChange={() => {}}
          onMediaTypeChange={() => {}}
          zDepth={4}
        />
      );

      const getZDepth = () => drawer.find(Paper).props().zDepth;
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.CLIPPED });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.FLOATING });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.PERSISTENT });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.PERSISTENT_MINI });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.TEMPORARY });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.TEMPORARY_MINI });
      expect(getZDepth()).toBe(4);

      drawer.setProps({ type: Drawer.DrawerTypes.FULL_HEIGHT, inline: true });
      expect(getZDepth()).toBe(4);
    });
  });

  describe('updateType', () => {
    it('should correctly set the default visibility on mobile devices', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on tablets', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesTablet;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.PERSISTENT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.DrawerTypes.PERSISTENT, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on desktop', () => {
      const props = {
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.PERSISTENT,
        desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      const drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.FULL_HEIGHT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.DrawerTypes.FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityChange.mock.calls.length).toBe(1);
      expect(props.onVisibilityChange).toBeCalledWith(true);
    });

    it('should not update the visibility to false when the defaultVisible prop is enabled and the drawer type is temporary for any screen size', () => {
      const props = {
        defaultVisible: true,
        navItems: [],
        mobileType: Drawer.DrawerTypes.TEMPORARY,
        tabletType: Drawer.DrawerTypes.TEMPORARY,
        desktopType: Drawer.DrawerTypes.TEMPORARY,
        onMediaTypeChange: jest.fn(),
        onVisibilityChange: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      let drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(props.tabletType, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityChange.mock.calls.length).toBe(0);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.type).toBe(Drawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(2);
      expect(props.onMediaTypeChange).toBeCalledWith(props.desktopType, { mobile: false, tablet: false, desktop: true });
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
      renderIntoDocument(<Drawer {...props} />);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.defaultProps.desktopType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityChange).toBeCalledWith(true);

      window.matchMedia = matchesMobile;
      renderIntoDocument(<Drawer {...props} visible defaultMedia="desktop" />);
      expect(props.onMediaTypeChange).toBeCalledWith(Drawer.defaultProps.mobileType, { mobile: true, tablet: false, desktop: false });
      expect(props.onVisibilityChange).toBeCalledWith(true);
    });

    it('should update the overlayActive state correctly on initial mount when defaultVisible', () => {
      window.matchMedia = matchesMobile;
      const props = { defaultVisible: true, type: Drawer.DrawerTypes.TEMPORARY };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);
    });

    it('should set overlayActive to true on any screen size if the overlay prop is enabled', () => {
      window.matchMedia = matchesMobile;
      const props = { defaultVisible: true, type: Drawer.DrawerTypes.TEMPORARY, overlay: true };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);
    });

    it('should set overlayActive to false on any screen size if the overlay prop is enabled', () => {
      window.matchMedia = matchesMobile;
      const props = { defaultVisible: true, type: Drawer.DrawerTypes.TEMPORARY, overlay: false };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);
    });

    it('should update the overlayActive state correctly on initial mount when visible', () => {
      window.matchMedia = matchesMobile;
      const props = { visible: true, type: Drawer.DrawerTypes.TEMPORARY, onVisibilityChange: jest.fn() };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);
    });

    it('should set overlayActive to true on any screen size if the overlay prop is enabled', () => {
      window.matchMedia = matchesMobile;
      const props = { visible: true, type: Drawer.DrawerTypes.TEMPORARY, overlay: true, onVisibilityChange: jest.fn() };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(true);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(true);
    });

    it('should set overlayActive to false on any screen size if the overlay prop is enabled', () => {
      window.matchMedia = matchesMobile;
      const props = { visible: true, type: Drawer.DrawerTypes.TEMPORARY, overlay: false, onVisibilityChange: jest.fn() };
      let drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="mobile" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="tablet" />);
      expect(drawer.state.overlayActive).toBe(false);
      drawer = renderIntoDocument(<Drawer {...props} defaultMedia="desktop" />);
      expect(drawer.state.overlayActive).toBe(false);
    });
  });

  describe('matchesMedia', () => {
    beforeEach(() => {
      window.matchMedia.mockClear();
    });

    beforeAll(() => {
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
  });

  describe('getCurrentMedia', () => {
    it('should return the mobile drawer type when the media matches mobile', () => {
      window.matchMedia = matchesMobile;
      const expected = { mobile: true, tablet: false, desktop: false, type: Drawer.defaultProps.mobileType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    it('should return the tablet drawer type when the media matches tablet', () => {
      window.matchMedia = matchesTablet;
      const expected = { mobile: false, tablet: true, desktop: false, type: Drawer.defaultProps.tabletType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    it('should return the desktop drawer type when the media matches desktop', () => {
      window.matchMedia = matchesDesktop;
      const expected = { mobile: false, tablet: false, desktop: true, type: Drawer.defaultProps.desktopType };
      expect(Drawer.getCurrentMedia()).toEqual(expected);
    });

    it('should return the current type prop if constantType is enabled for any media', () => {
      const props = { ...Drawer.defaultProps, type: Drawer.DrawerTypes.TEMPORARY, constantType: true };
      window.matchMedia = matchesMobile;
      const expected = {
        mobile: true,
        tablet: false,
        desktop: false,
        type: props.type,
      };

      expect(Drawer.getCurrentMedia(props)).toEqual(expected);

      window.matchMedia = matchesTablet;
      expected.mobile = false;
      expected.tablet = true;
      expect(Drawer.getCurrentMedia(props)).toEqual(expected);

      window.matchMedia = matchesDesktop;
      expected.tablet = false;
      expected.desktop = true;
      expect(Drawer.getCurrentMedia(props)).toEqual(expected);
    });

    it('should still do the media type matches if constantType is not enabled', () => {
      const { TEMPORARY, PERSISTENT, FULL_HEIGHT } = Drawer.DrawerTypes;
      const props = {
        ...Drawer.defaultProps,
        type: TEMPORARY,
        constantType: false,
        mobileType: TEMPORARY,
        tabletType: PERSISTENT,
        desktopType: FULL_HEIGHT,
      };

      window.matchMedia = matchesMobile;
      const expected = {
        mobile: true,
        tablet: false,
        desktop: false,
        type: TEMPORARY,
      };

      expect(Drawer.getCurrentMedia(props)).toEqual(expected);

      window.matchMedia = matchesTablet;
      expected.mobile = false;
      expected.tablet = true;
      expected.type = PERSISTENT;
      expect(Drawer.getCurrentMedia(props)).toEqual(expected);

      window.matchMedia = matchesDesktop;
      expected.tablet = false;
      expected.desktop = true;
      expected.type = FULL_HEIGHT;
      expect(Drawer.getCurrentMedia(props)).toEqual(expected);
    });
  });
});
