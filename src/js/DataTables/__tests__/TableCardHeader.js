/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import TableCardHeader from '../TableCardHeader';

const PROPS = {
  title: 'Title',
  visible: true,
};

const NODES = [ // different things that pass as `PropTypes.node`
  123,
  'string',
  undefined,
  false,
  [],
  <span key="span" />,
  [<div key="div" />, null, 'bar'],
  null,
];

describe('TableCardHeader', () => {
  it('should render with different types of children', () => {
    mount((
      <TableCardHeader
        {...PROPS}
      >
        {NODES}
      </TableCardHeader>
    ));

    for (const node of NODES) {
      mount((
        <TableCardHeader
          {...PROPS}
        >
          {node}
        </TableCardHeader>
      ));
    }
  });
});
