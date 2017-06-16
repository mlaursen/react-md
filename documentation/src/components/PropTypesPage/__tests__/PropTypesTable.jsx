/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import PropTypesTable from '../PropTypesTable';

describe('PropTypesTable', () => {
  it('should render correctly with no props', () => {
    const tree = createRouterSnapshot(<PropTypesTable ascending visibleProps={[]} baseId="wowza" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when there are props', () => {
    const props = [{
      description: 'An optional style to apply.',
      propName: 'style',
      required: false,
      type: 'object',
    }, {
      description: 'An optional className to apply to the `FontIcon`.',
      propName: 'className',
      required: false,
      type: 'string',
    }, {
      defaultValue: "'material-icons'",
      description: 'The icon font library className to use to display the icon.',
      propName: 'iconClassName',
      required: true,
      type: 'string',
    }, {
      description: 'Any children required to display the icon with the font library.',
      propName: 'children',
      required: false,
      type: 'node',
    }, {
      description: 'Boolean if the `FontIcon` should gain the disabled colors.',
      propName: 'disabled',
      required: false,
      type: 'bool',
    }, {
      description: 'Either a boolean that will enforce the 24x24 size of the font icon or a number of the size\nto enforce. This is useful when using other font icon libraries that do not have a consistent\nsize.',
      propName: 'forceSize',
      required: false,
      type: 'oneOfType([bool, number])',
    }, {
      description: 'Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and `height`.',
      propName: 'forceFontSize',
      required: false,
      type: 'custom',
    }];

    const tree = createRouterSnapshot(<PropTypesTable ascending visibleProps={props} baseId="font-icons-proptypes" />);
    expect(tree).toMatchSnapshot();
  });
});
