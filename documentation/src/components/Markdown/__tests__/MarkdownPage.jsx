/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import MarkdownPage from '../MarkdownPage';
import README from '../../../../README.md';

describe('MarkdownPage', () => {
  it('should render correctly', () => {
    const tree = createRouterSnapshot(<MarkdownPage markdown={README} />);
    expect(tree).toMatchSnapshot();
  });
});
