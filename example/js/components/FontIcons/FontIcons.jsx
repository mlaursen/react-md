import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { FontIcon } from '../../../../src/js';

import DocPage from '../../DocPage';

export default class FontIcons extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['FontIcon']}
        code={code}
        examples={[
          <FontIcon>home</FontIcon>,
          <FontIcon iconClassName="fa fa-star-o" />,
        ]}
        components={[{
          component: FontIcon,
          details: [{
            name: 'iconClassName',
            propType: 's',
            desc: 'The icon className to use.',
          }, {
            name: 'children',
            propType: 'no',
            desc: 'The optional children to use to display a Font Icon.',
          }],
        }]}
      />
    );
  }
}
