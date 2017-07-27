/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import ShowcaseCard from '../ShowcaseCard';

const PROPS = {
  link: 'https://react-md.mlaursen.com',
  logo: 'https://react-md.mlaursen.com/assets/logo.svg',
  name: 'react-md Documentation website',
  author: 'MIkkel Laursen',
  description: 'It is a website about documenting react-md. Who\'da thunk?',
};

describe('ShowcaseCard', () => {
  it('should render correctly', () => {
    let tree = createRouterSnapshot(<ShowcaseCard {...PROPS} />);
    expect(tree).toMatchSnapshot();

    const author = { name: PROPS.author, github: 'https://github.com/mlaursen/react-md' };
    tree = createRouterSnapshot(<ShowcaseCard {...PROPS} author={author} />);
    expect(tree).toMatchSnapshot();
  });
});
