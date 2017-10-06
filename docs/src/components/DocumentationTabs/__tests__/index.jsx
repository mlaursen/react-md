/* eslint-env jest */
import React from 'react';
import { renderRouterSnapshot, mountWithRouter } from 'utils/testing';

import DocumentationTabs from '../';

describe('DocumentationTabs', () => {
  it('should render as null when not visible', () => {
    const tree = renderRouterSnapshot(<DocumentationTabs visible={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('should correctly render on customization routes', () => {
    const tree1 = renderRouterSnapshot(<DocumentationTabs visible />, '/customization/colors');
    const tree2 = renderRouterSnapshot(<DocumentationTabs visible />, '/customization/grids');
    const tree3 = renderRouterSnapshot(<DocumentationTabs visible />, '/customization/themes');
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
    expect(tree3).toMatchSnapshot();
  });

  it('should render correctly on component routes', () => {
    const tree1 = renderRouterSnapshot(<DocumentationTabs visible />, '/components/autocompletes');
    const tree2 = renderRouterSnapshot(<DocumentationTabs visible />, '/components/helpers/layovers');
    const tree3 = renderRouterSnapshot(<DocumentationTabs visible />, '/components/helpers/portals');
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
    expect(tree3).toMatchSnapshot();
  });

  it('should add the Prop Types tab when not on customization routes', () => {
    const tabs = mountWithRouter(<DocumentationTabs visible />, '/components/autocompletes');
    expect(tabs.find('#documentation-prop-types').length).toBeGreaterThan(0);
  });

  it('should add the Sass Doc tab on the correct routes', () => {
    const tabs1 = mountWithRouter(<DocumentationTabs visible />, '/components/autocompletes');
    const tabs2 = mountWithRouter(<DocumentationTabs visible />, '/components/helpers/portals');
    const tabs3 = mountWithRouter(<DocumentationTabs visible />, '/components/helpers/layovers');
    const tabs4 = mountWithRouter(<DocumentationTabs visible />, '/customization/colors');

    expect(tabs1.find('#documentation-sassdoc').length).toBeGreaterThan(0);
    expect(tabs2.find('#documentation-sassdoc').length).toBe(0);
    expect(tabs3.find('#documentation-sassdoc').length).toBeGreaterThan(0);
    expect(tabs4.find('#documentation-sassdoc').length).toBeGreaterThan(0);
  });
});
