import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Toolbar, { ActionArea } from 'react-md/Toolbars';

import DocPage from 'react-md-documentation';
import ToolbarExamples from './ToolbarExamples';
import ToolbarExamplesRaw from '!!raw!./ToolbarExamples';
import FakeTextEditor from '../../FakeTextEditor';
import FakeTextEditorRaw from '!!raw!../../FakeTextEditor';
import ToolbarWithTabs from '../../ToolbarWithTabs';
import ToolbarWithTabsRaw from '!!raw!../../ToolbarWithTabs/ToolbarWithTabs';

import { isMobile } from 'react-md/utils';

import './_toolbar.scss';

export default class Toolbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Toolbar,
          details: [{
            name: 'primary',
            pt: 'ba',
            desc: 'Boolean if the app bar is styled with the primary color.',
          }, {
            name: 'secondary',
            pt: 'ba',
            desc: 'Boolean if the app bar is styled with the secondary color.',
          }, {
            name: 'title',
            pt: 's',
            desc: 'An Optional title to display in the left node.',
          }, {
            name: 'actionLeft',
            pt: 'no',
            desc: `Any action that should be the button to the left of the title.
            In most cases, this *should* be an \`IconButton\`.`,
          }, {
            name: 'actionsRight',
            pt: 'no',
            desc: `Any react node that you want to the right of the title. It is usually
            helpful to wrap these actions in the \`ActionArea\` component.`,
          }, {
            name: 'children',
            pt: 'no',
            desc: `Any children that you want to display in the \`.md-toolbar-container\` on
            the line after the \`actionLeft\`, \`title\`, and \`actionsRight\`.`,
          }, {
            name: 'fixed',
            pt: 'ba',
            desc: `Boolean if the toolbar should be fixed.`,
          }],
        }, {
          component: ActionArea,
          desc: `This is just and optional wrapper for the \`actionsRight\` in an app bar. It
          is a flexbox that expands to remaining space and is right aligned.`,
          details: [],
        }]}
        examples={[{
          markdown: ToolbarExamplesRaw,
          children: <ToolbarExamples />,
        }, {
          markdown: FakeTextEditorRaw,
          children: <FakeTextEditor />,
        }, {
          markdown: ToolbarWithTabsRaw,
          children: <ToolbarWithTabs fixedWidth={isMobile} />,
        }]}
        >
        <p>A toolbar is a container that has an optional title and 1 to many actionable areas.</p>
        <p>A toolbar has the functionality to automatically align tab children</p>
      </DocPage>
    );
  }
}
