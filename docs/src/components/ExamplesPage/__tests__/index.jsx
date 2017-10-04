/* eslint-env jest */
import React from 'react';
import { renderReduxRouterSnapshot } from 'utils/testing';

import ExamplesPage from '../';

describe('ExamplesPage', () => {
  it('should render correctly', () => {
    const examples = [{
      title: 'First Example',
      description: 'Something that has some **markdown** and __other stuff__.',
      code: '<h1>Wowwwwwwwwwwwwww</h1>',
      children: <h1>Wowwwwwwwwwwwwww</h1>,
    }];

    const props = {
      examples,
      description: `
      ## Some Example page
      That has content

      And some amazing **markdown**!

      - one
      - two
      - three
      `,
    };
    const tree = renderReduxRouterSnapshot(<ExamplesPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
