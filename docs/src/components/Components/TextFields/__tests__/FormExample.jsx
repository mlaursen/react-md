/* eslint-env jest */
import React from 'react';
import { renderReduxSnapshot } from 'utils/testing';

import FormExample from '../FormExample';

describe('FormExample', () => {
  it('should render correctly', () => {
    const tree = renderReduxSnapshot(<FormExample />);
    expect(tree).toMatchSnapshot();
  });
});
