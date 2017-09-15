/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import ComponentTitle from '../ComponentTitle';

const PROPS = {
  id: 'autocompletes',
  component: 'Autocomplete',
  mobile: false,
  source: 'https://github.com/malursen/react-md/master/tree/src/js/Autocompletes/Autocomplete.js',
  propFilter: '',
  onFilter: () => {},
  mobileFilterVisible: false,
  onMobileFilterShow: () => {},
  onMobileFilterHide: () => {},
};
describe('ComponentTitle', () => {
  it('should render correctly', () => {
    const tree1 = createRouterSnapshot(<ComponentTitle {...PROPS} />);
    const tree2 = createRouterSnapshot(<ComponentTitle {...PROPS} mobile />);
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
