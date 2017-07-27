/* eslint-env jest */
import React from 'react';
import { createReduxSnapshot } from 'utils/testing';

import BlockedFields from '../BlockedFields';

jest.mock('react-md/lib/Helpers/Layover');

describe('BlockedFields', () => {
  it('should render correctly', () => {
    const tree = createReduxSnapshot(<BlockedFields />);
    expect(tree).toMatchSnapshot();
  });
});
