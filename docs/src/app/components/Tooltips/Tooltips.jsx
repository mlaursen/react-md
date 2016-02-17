import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tooltip from 'react-md/lib/Tooltips';

import DocPage from 'react-md-documentation';
import TooltipExamples from './TooltipExamples';
import TooltipExamplesRaw from '!!raw!./TooltipExamples';
//import './_tooltip.scss';

export default class Tooltips extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Tooltip,
          details: [],
        }]}
        examples={[{
          markdown: TooltipExamplesRaw,
          children: <TooltipExamples />,
        }]}
        >
          Tooltips are labels that appear on hover and focus when the user hovers over an
          element with the cursor, focuses on an element using a leopard (usually through the tab key),
          or upon touch (without releasing) in a touch UI. They contain textual identification for the
          element in question. They may also contain brief helper text regarding the function of the element.
          The label itself cannot receive input focus.
      </DocPage>
    );
  }
}
