/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import EmulatorController from '../EmulatorController';

describe('EmulatorController', () => {
  it('should render correctly with the base required props', () => {
    const tree1 = createRouterSnapshot(
      <EmulatorController mobile={false}>
        <h1>Wowza!</h1>
      </EmulatorController>
    );
    const tree2 = createRouterSnapshot(
      <EmulatorController mobile>
        <h1>Wowza!</h1>
      </EmulatorController>
    );
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
