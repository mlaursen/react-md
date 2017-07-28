/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';

import Configuration from '../Configuration';

const PROPS = {
  onChange: () => {},
  onSelectChange: () => {},
  filteredPrimaries: ['red', 'blue', 'brown'],
  filteredSecondaries: ['red', 'blue'],
};

describe('Configuration', () => {
  it('should render correctly', () => {
    const tree1 = render(
      <Configuration
        {...PROPS}
        primary="light-blue"
        secondary="pink"
        hue={200}
        light
        saved
        saveDisabled={false}
      />
    );
    const tree2 = render(
      <Configuration
        {...PROPS}
        primary="light-blue"
        secondary="pink"
        hue={200}
        light
        saved={false}
        saveDisabled
      />
    );
    const tree3 = render(
      <Configuration
        {...PROPS}
        primary="light-blue"
        secondary="pink"
        hue={200}
        light={false}
        saved
        saveDisabled={false}
      />
    );
    const tree4 = render(
      <Configuration
        {...PROPS}
        primary="light-blue"
        secondary="pink"
        hue={200}
        light={false}
        saved={false}
        saveDisabled={false}
      />
    );
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
    expect(tree3).toMatchSnapshot();
    expect(tree4).toMatchSnapshot();
  });
});
