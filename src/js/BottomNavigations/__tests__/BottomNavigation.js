/*eslint-env jest*/
jest.unmock('../BottomNavigation');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import BottomNavigation from '../BottomNavigation';
import BottomNav from '../BottomNav';

describe('BottomNavigation', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const containerStyle = { background: 'red' };
    const containerClassName = 'test-container';
    const nav = renderIntoDocument(
      <BottomNavigation
        style={style}
        className={className}
        containerStyle={containerStyle}
        containerClassName={containerClassName}
        actions={[{ label: 'a' }, { label: 'b' }, { label: 'c' }]}
      />
    );

    const navNode = findDOMNode(nav);
    expect(navNode.style.background).toBe(containerStyle.background);
    expect(navNode.className).toContain(containerClassName);

    const bottomNav = findRenderedDOMComponentWithClass(nav, 'md-bottom-navigation');
    expect(bottomNav.className).toContain(className);
    expect(bottomNav.style.display).toBe(style.display);
  });

  it('can be a controlled component', () => {
    const props = {
      active: 'A',
      actions: [{
        label: 'A',
      }, {
        label: 'B',
      }, {
        label: 'C',
      }],
      onChange: jest.fn(),
      activeIndex: 0,
    };

    const nav = renderIntoDocument(<BottomNavigation {...props} />);

    nav.handleNavChange(2);
    expect(props.onChange.mock.calls.length).toBe(1);
    expect(props.onChange.mock.calls[0][0]).toBe(2);
  });

  it('generates a BottomNav component for each action', () => {
    let actions = [{
      label: 'A',
    }, {
      label: 'B',
    }, {
      label: 'C',
    }];

    let nav = renderIntoDocument(<BottomNavigation actions={actions} />);
    let navs = scryRenderedComponentsWithType(nav, BottomNav);

    expect(navs.length).toBe(actions.length);

    actions = actions.concat([{ label: 'D' }, { label: 'E' }]);
    nav = renderIntoDocument(<BottomNavigation actions={actions} />);
    navs = scryRenderedComponentsWithType(nav, BottomNav);

    expect(navs.length).toBe(actions.length);
  });

  it('only displays the bottom navigation when visible', () => {
    const actions = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
    const nav = renderIntoDocument(<BottomNavigation actions={actions} />);

    let navs = scryRenderedDOMComponentsWithTag(nav, 'footer');
    expect(navs.length).toBe(1);

    nav.setState({ visible: false });
    jest.runAllTimers();

    navs = scryRenderedDOMComponentsWithTag(nav, 'footer');
    expect(navs.length).toBe(0);
  });

  it('updates the state when the onTouchStart is called', () => {
    const actions = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
    const nav = renderIntoDocument(<BottomNavigation actions={actions} />);

    nav.handleTouchStart({ changedTouches: [{ pageY: 32 }]});
    expect(nav.state.scrolling).toBe(true);
    expect(nav.state.pageY).toBe(32);
  });

  it('updates the state when the onTouchMove is called only if already scrolling', () => {
    const actions = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
    const nav = renderIntoDocument(<BottomNavigation actions={actions} />);

    const startEvent = { changedTouches: [{ pageY: 32 }] };
    // scrolling downwards
    const moveEvent = { changedTouches: [{ pageY: 20 }] };
    expect(nav.state.visible).toBe(true);

    nav.handleTouchMove(moveEvent);

    expect(nav.state.visible).toBe(true);
    expect(nav.state.scrolling).toBe(false);
    expect(nav.state.pageY).toBe(null);

    nav.handleTouchStart(startEvent);
    expect(nav.state.visible).toBe(true);
    expect(nav.state.scrolling).toBe(true);
    expect(nav.state.pageY).toBe(32);

    nav.handleTouchMove(moveEvent);
    expect(nav.state.visible).toBe(false);
    expect(nav.state.pageY).toBe(20);
    expect(nav.state.scrolling).toBe(true);
  });

  it('resets the scrolling state onTouchEnd', () => {
    const actions = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
    const nav = renderIntoDocument(<BottomNavigation actions={actions} />);

    nav.handleTouchStart({ changedTouches: [{ pageY: 32 }] });
    nav.handleTouchEnd();
    expect(nav.state.visible).toBe(true);
    expect(nav.state.pageY).toBe(null);
    expect(nav.state.scrolling).toBe(false);
  });
});
