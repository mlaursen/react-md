/* eslint-env jest */
import React from 'react';
import { renderReduxRouterSnapshot } from 'utils/testing';

import ExampleCard from '../ExampleCard';

describe('ExampleCard', () => {
  it('should display correctly without a description', () => {
    const tree = renderReduxRouterSnapshot(
      <ExampleCard
        title="First Example"
        description=""
        code="<div />"
      >
        <div />
      </ExampleCard>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should display correctly with a description', () => {
    const code = `
      <h1>Hello, World!</h1>
      <div>This should have some content...</div>
    `;
    const description = `
    # Second Example
    That contains some markdown!

    - one
    - two
    - three

    > some note
    `;
    const tree = renderReduxRouterSnapshot(
      <ExampleCard
        title="Second Example"
        description={description}
        code={code}
      >
        <h1>Hello, World!</h1>
        <div>This should have some content...</div>
      </ExampleCard>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should display correctly as a table card', () => {
    const code = `
      <table className="md-data-table">
        <thead className="md-table-header">
          <tr className="md-table-row">
            <th className="md-table-column md-table-column--header">
              Hello!
            </th>
          </tr>
        </thead>
        <tbody className="md-table-body">
          <tr className="md-table-row">
            <td className="md-table-column md-table-column--header">
              Hello!
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const props = {
      code,
      tableCard: true,
      title: 'Table Example',
      description: '',
      children: (
        <table className="md-data-table">
          <thead className="md-table-header">
            <tr className="md-table-row">
              <th className="md-table-column md-table-column--header">
                Hello!
              </th>
            </tr>
          </thead>
          <tbody className="md-table-body">
            <tr className="md-table-row">
              <td className="md-table-column md-table-column--header">
                Hello!
              </td>
            </tr>
          </tbody>
        </table>
      ),
    };

    let tree = renderReduxRouterSnapshot(<ExampleCard {...props} />);
    expect(tree).toMatchSnapshot();

    tree = renderReduxRouterSnapshot(<ExampleCard {...props} description="Some **description** _markdown_" />);
    expect(tree).toMatchSnapshot();
  });
});
