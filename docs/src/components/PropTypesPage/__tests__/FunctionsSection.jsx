/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import FunctionsSection from '../FunctionsSection';

const PROPS = {
  id: 'some-test-id',
  name: 'welcomeToTheTestingClass',
  description: 'This does stuff. Yah',
};

const returns = { type: 'string', description: 'SOmethingk sdafjkad jflkadsjf' };

describe('FunctionsSection', () => {
  it('should render correctly', () => {
    const tree1 = createRouterSnapshot(<FunctionsSection {...PROPS} params={[]} />);
    expect(tree1).toMatchSnapshot();

    const tree2 = createRouterSnapshot(<FunctionsSection {...PROPS} params={[]} returns={returns} />);
    expect(tree2).toMatchSnapshot();

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
    const tree3 = createRouterSnapshot(<FunctionsSection {...PROPS} params={params} />);
    expect(tree3).toMatchSnapshot();

    const tree4 = createRouterSnapshot(<FunctionsSection {...PROPS} params={params} returns={returns} />);
    expect(tree4).toMatchSnapshot();
  });
});
