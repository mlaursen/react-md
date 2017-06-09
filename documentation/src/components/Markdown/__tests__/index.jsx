/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';
import Markdown from '../';

describe('Markdown', () => {
  it('should render correctly with simple markdown', () => {
    const markdown = `
    # Title

    - list
    - of
    - items

    ### Subheader
    This is stuff.

    * another
    * list
    * of
    * stuff


    > NOTE!
    `;
    const tree = createRouterSnapshot(<Markdown markdown={markdown} />);
    expect(tree).toMatchSnapshot();
  });
});
