/* eslint-env jest */
jest.unmock('../Dialog');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Dialog from '../Dialog';
import FocusContainer from '../../Helpers/FocusContainer';
import Paper from '../../Papers/Paper';

describe('Dialog', () => {
  it('renders as a Paper component', () => {
    const dialog = renderIntoDocument(<Dialog />);
    const papers = scryRenderedComponentsWithType(dialog, Paper);
    expect(papers.length).toBe(1);
  });

  it('merges style and className in the Paper component', () => {
    const props = {
      style: { display: 'none' },
      className: 'womba-juice',
    };

    const dialog = renderIntoDocument(<Dialog {...props} />);
    const paper = findRenderedComponentWithType(dialog, Paper);
    expect(paper.props.style).toEqual(props.style);
    expect(paper.props.className).toContain(props.className);
  });

  it('renders the Paper component as the FocusContainer component', () => {
    const dialog = renderIntoDocument(<Dialog />);
    const paper = findRenderedComponentWithType(dialog, Paper);
    expect(paper.props.component).toBe(FocusContainer);
  });
});
