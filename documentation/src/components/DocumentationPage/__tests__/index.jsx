/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import DocumentationPage from '../';

describe('DocumentationPage', () => {
  it('should render correctly based on the loading prop', () => {
    let tree = renderer.create(<DocumentationPage loading title="Hello" />).toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer.create(
      <DocumentationPage
        title="Hello"
        loading={false}
      >
        <h1>Hello, World!</h1>
      </DocumentationPage>
    ).toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer.create(
      <DocumentationPage
        title="Hello"
        loading
      >
        <h1>Hello, World!</h1>
      </DocumentationPage>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
