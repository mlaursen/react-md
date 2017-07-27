/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import ScssMarkdown from '../ScssMarkdown';

describe('ScssMarkdown', () => {
  it('should render correctly', () => {
    const styles = `
@mixin react-md-something($var-one: blue, $var-two: orange) {
  background: $var-two;
  color: $var-one;
}
    `;
    const tree = createRouterSnapshot(<ScssMarkdown markdown={styles} />);
    expect(tree).toMatchSnapshot();
  });
});
