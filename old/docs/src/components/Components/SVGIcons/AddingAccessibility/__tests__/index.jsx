/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import AddingAccessibility from '../';

// Add custom mocks here so it shows up with nice snapshots in example.
jest.mock('icons/alarm.svg', () => ({
  url: '/icon-sprites.svg#alarm-usage',
}));

jest.mock('icons/twitter.svg', () => ({
  url: '/icon-sprites.svg#twitter-usage',
}));

describe('AddingAccessibility', () => {
  it('should render correctly', () => {
    expect(createSnapshot(<AddingAccessibility />)).toMatchSnapshot();
  });
});
