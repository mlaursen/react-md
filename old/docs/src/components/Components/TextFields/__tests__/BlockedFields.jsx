/* eslint-env jest */
import React from 'react';
import { renderReduxSnapshot } from 'utils/testing';

import BlockedFields from '../BlockedFields';

jest.mock('react-md/lib/Helpers/Layover');

describe('BlockedFields', () => {
  it('should render correctly', () => {
    const tree = renderReduxSnapshot(<BlockedFields />);
    expect(tree).toMatchSnapshot();
  });
});
