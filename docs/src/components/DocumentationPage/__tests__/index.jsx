/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import DocumentationPage from '../';

describe('DocumentationPage', () => {
  it('should render correctly based on the loading prop', () => {
    let tree = createSnapshot(<DocumentationPage loading title="Hello" />);
    expect(tree).toMatchSnapshot();

    tree = createSnapshot(
      <DocumentationPage
        title="Hello"
        loading={false}
      >
        <h1>Hello, World!</h1>
      </DocumentationPage>
    );
    expect(tree).toMatchSnapshot();

    tree = createSnapshot(
      <DocumentationPage
        title="Hello"
        loading
      >
        <h1>Hello, World!</h1>
      </DocumentationPage>
    );
    expect(tree).toMatchSnapshot();
  });
});
