/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('react-md/lib/Inks/InkContainer');

describe('App', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
