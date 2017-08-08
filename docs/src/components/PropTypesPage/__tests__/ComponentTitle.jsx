/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import ComponentTitle from '../ComponentTitle';

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
    const tree1 = createSnapshot(<ComponentTitle {...PROPS} />);
    const tree2 = createSnapshot(<ComponentTitle {...PROPS} mobile />);
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
