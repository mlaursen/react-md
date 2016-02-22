import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tooltip from 'react-md/lib/Tooltips';

import DocPage from 'react-md-documentation';
import TooltipExamples from './TooltipExamples';
import TooltipExamplesRaw from '!!raw!./TooltipExamples';
import './_tooltip.scss';

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
          details: [{
            name: 'children',
            pt: 'element',
            desc: `This should be a single element that is used to render the tooltip on tab
            focus or hover. This component wil be modified with event handlers and the
            \`className\` \`.md-tooltip-control\``,
          }, {
            name: 'text',
            pt: 's',
            desc: `The text to display in a tooltip.`,
          }, {
            name: 'position',
            pt: `one('top', 'right', 'bottom', 'left')`,
            desc: `The tooltip position relative to the child. You can also use
            \`Tooltip.TOP\`, \`Tooltip.RIGHT\`, \`Tooltip.BOTTOM\`, \`Tooltip.LEFT\`.`,
          }, {
            name: 'delay',
            pt: 'nu',
            desc: `An optional delay for showing the tooltip on hover or tab focus.`,
          }],
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
