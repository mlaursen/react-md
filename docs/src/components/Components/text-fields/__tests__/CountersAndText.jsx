/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import CountersAndText from '../CountersAndText';

describe('CountersAndText', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<CountersAndText />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
