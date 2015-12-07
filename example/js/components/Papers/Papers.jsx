import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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
        examples={[0, 1, 2, 3, 4, 5].map(i => <Paper zDepth={i}>zDepth = {i}</Paper>)}
        component={Paper}
        propsDesc={[
          { name: 'zDepth', desc: 'The zDepth of the paper. This should be a number from 0 - 5', propType: 's' },
        ]}
      />
    );
    //return (
    //  <section className="examples paper-examples">
    //    <Paper zDepth={0}>zDepth = 0</Paper>
    //    <Paper zDepth={1}>zDepth = 1</Paper>
    //    <Paper zDepth={2}>zDepth = 2</Paper>
    //    <Paper zDepth={3}>zDepth = 3</Paper>
    //    <Paper zDepth={4}>zDepth = 4</Paper>
    //    <Paper zDepth={5}>zDepth = 5</Paper>
    //  </section>
    //);
  }
}
