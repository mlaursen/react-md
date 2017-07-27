/* eslint-env jest */
import React from 'react';
import { createReduxSnapshot } from 'utils/testing';

import FormExample from '../FormExample';

describe('FormExample', () => {
  it('should render correctly', () => {
    const tree = createReduxSnapshot(<FormExample />);
    expect(tree).toMatchSnapshot();
  });
});
