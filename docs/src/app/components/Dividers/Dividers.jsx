import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Divider from 'react-md/lib/Dividers';

import DocPage from 'react-md-documentation';
import ComposeReply from '../../commonExamples/ComposeReply';
import ComposeReplyRaw from '!!raw!../../commonExamples/ComposeReply';

export default class Dividers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Divider,
          details: [{
            name: 'inset',
            pt: 'ba',
            desc: `Boolean if the divider should be inset. This will
            use relative components to calculate the inset distance.`,
          }, {
            name: 'vertical',
            pt: 'ba',
            desc: `Boolean if the divider is a vertical divider instead
            of horizontal.`,
          }],
        }]}
        examples={[{
          markdown: ComposeReplyRaw,
          children: <ComposeReply />,
        }]}
        >
        Dividers group and separate content within lists and page layouts.
        The divider is a thin rule, lightweight yet sufficient to distinguish
        content visually and spatially.
      </DocPage>
    );
  }
}
