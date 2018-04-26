/* eslint-env jest */
import React from 'react';
import { renderRouterSnapshot } from 'utils/testing';

import EmulatorController from '../EmulatorController';

describe('EmulatorController', () => {
  it('should render correctly with the base required props', () => {
    const tree1 = renderRouterSnapshot(
      <EmulatorController mobile={false}>
        <h1>Wowza!</h1>
      </EmulatorController>
    );
    const tree2 = renderRouterSnapshot(
      <EmulatorController mobile>
        <h1>Wowza!</h1>
      </EmulatorController>
    );
    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
