/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Greeting from '../Greeting';

jest.mock('react-md/lib/Inks/InkContainer');

describe('Greeting', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Greeting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
