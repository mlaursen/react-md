/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import FunctionParameterTable from '../FunctionParameterTable';

describe('FunctionParameterTable', () => {
  it('should render correctly', () => {
    const nullTree = createRouterSnapshot(<FunctionParameterTable params={[]} />);
    expect(nullTree).toMatchSnapshot();

    const params = [{
      name: 'something',
      description: 'It is something that does something. Quite amazing',
      type: 'string',
      required: false,
    }, {
      name: 'requiredSomething',
      description: 'This is a param that is required.',
      type: 'boolean',
      required: true,
    }];
    const renderedTree = createRouterSnapshot(<FunctionParameterTable params={params} />);
    expect(renderedTree).toMatchSnapshot();
  });
});
