/*eslint-env jest*/
jest.unmock('../DialogFooter');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import DialogFooter from '../DialogFooter';
import FlatButton from '../../Buttons/FlatButton';

describe('DialogFooter', () => {
  it('renders an actions object prop as a flat button', () => {
    const actions = {
      onClick: jest.genMockFunction(),
      label: 'Test',
    };

    const footer = renderIntoDocument(
      <DialogFooter actions={actions} />
    );

    const buttons = scryRenderedComponentsWithType(footer, FlatButton);
    expect(buttons.length).toBe(1);
  });

  it('renders an actions element in the footer', () => {
    const actions = <button>Hello</button>;
    const footer = renderIntoDocument(
      <DialogFooter actions={actions} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(footer, 'button');
    expect(buttons.length).toBe(1);
  });

  it('renders a list of action objects as flat buttons', () => {
    const actions = [{
      onClick: jest.genMockFunction(),
      label: 'Test 1',
    }, {
      onClick: jest.genMockFunction(),
      label: 'Test 2',
    }];

    const footer = renderIntoDocument(
      <DialogFooter actions={actions} />
    );

    const buttons = scryRenderedComponentsWithType(footer, FlatButton);
    expect(buttons.length).toBe(2);
  });

  it('renders a list of elements in the footer', () => {
    const actions = [
      <button key={0}>Test 1</button>,
      <button key={1}>Test 2</button>,
    ];

    const footer = renderIntoDocument(
      <DialogFooter actions={actions} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(footer, 'button');
    expect(buttons.length).toBe(2);
  });

  it('renders a mixed list of action objects and valid elements', () => {
    const actions = [{
      onClick: jest.genMockFunction(),
      label: 'Test 1',
    },
      <button key={2}>Test 2</button>,
    ];

    const footer = renderIntoDocument(
      <DialogFooter actions={actions} />
    );

    const flats = scryRenderedComponentsWithType(footer, FlatButton);
    const buttons = scryRenderedDOMComponentsWithTag(footer, 'button');
    expect(flats.length).toBe(1);
    expect(buttons.length).toBe(1);
  });
});
