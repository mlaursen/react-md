/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ComponentTitle from '../ComponentTitle';

jest.mock('react-md/lib/TextFields/TextField');

const PROPS = {
  id: 'autocompletes',
  component: 'Autocomplete',
  mobile: false,
  source: 'https://github.com/malursen/react-md/master/tree/src/js/Autocompletes/Autocomplete.js',
  propFilter: '',
  onFilter: () => {},
};
describe('ComponentTitle', () => {
  it('should render correctly', () => {
    const tree1 = renderer.create(<ComponentTitle {...PROPS} />).toJSON();
    const tree2 = renderer.create(<ComponentTitle {...PROPS} mobile />).toJSON();
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
