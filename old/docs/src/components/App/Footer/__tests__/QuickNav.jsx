/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import { PureQuickNav } from '../QuickNav';

describe('PureQuickNav', () => {
  it('should render as null when at the home page', () => {
    const tree = createRouterSnapshot(<PureQuickNav home previousName="Hello" nextName="World" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render as null when there is no previous name and no next name', () => {
    const tree = createRouterSnapshot(<PureQuickNav />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly on non-mobile devices', () => {
    const tree = createRouterSnapshot(
      <PureQuickNav
        previousTo="/previous"
        previousName="Previous"
        nextTo="/next"
        nextName="Next"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly on mobile devices', () => {
    const tree = createRouterSnapshot(
      <PureQuickNav
        mobile
        previousTo="/previous"
        previousName="Previous"
        nextTo="/next"
        nextName="Next"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
