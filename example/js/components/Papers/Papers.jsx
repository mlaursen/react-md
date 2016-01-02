import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { Paper } from '../../../../src/js/index';
import DocPage from '../../DocPage';

export default class Papers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Paper']}
        code={code}
        examples={[0, 1, 2, 3, 4, 5].map(i => <Paper zDepth={i}>zDepth = {i}</Paper>)}
        components={[{
          component: Paper,
          details: [{
            name: 'zDepth',
            desc: 'The zDepth of the paper. This should be a number from 0 - 5',
            propType: 's',
          }],
        }]}
      />
    );
  }
}
