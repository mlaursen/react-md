/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import DisabledFields from '../DisabledFields';

describe('DisabledFields', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<DisabledFields />);
    expect(tree).toMatchSnapshot();
  });
});
