/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';
import QuickNavLink from '../QuickNavLink';

describe('QuickNavLink', () => {
  it('should render as null if there is no to prop', () => {
    const tree = createRouterSnapshot(<QuickNavLink />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when provided props for the left', () => {
    const tree = createRouterSnapshot(
      <QuickNavLink
        to="/woop"
        name="Something"
        titles
        label="Previous"
        left
        icon="arrow_back"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when provided props for the right', () => {
    const tree = createRouterSnapshot(
      <QuickNavLink
        to="/woop"
        name="Something"
        titles
        label="Next"
        icon="arrow_forward"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
