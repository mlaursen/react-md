import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Toolbar from 'react-md/Toolbars';

import DocPage from 'react-md-documentation';
import ToolbarExamples from './ToolbarExamples';
import ToolbarExamplesRaw from '!!raw!./ToolbarExamples';
import ToolbarWithTabs from '../../ToolbarWithTabs';
import ToolbarWithTabsRaw from '!!raw!../../ToolbarWithTabs/ToolbarWithTabs';

import { isMobile } from 'react-md/utils';

import './_toolbar.scss';

export default class Toolbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { primary: false, secondary: false };
  }

  next = () => {
    let nextState = Object.assign({}, this.state);
    if(nextState.primary) {
      nextState.primary = false;
      nextState.secondary = true;
    } else if(nextState.secondary) {
      nextState.secondary = false;
    } else {
      nextState.primary = true;
    }

    this.setState(nextState);
  };

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
            name: 'leftNode',
            pt: 'no',
            desc: `Any react node that you want to display to the farthest left
            in the app bar. This **should** probably be an IconButton or a menu.
            But it can be whatever.`,
          }, {
            name: 'rightNode',
            pt: 'no',
            desc: `Any react node that you want to display to the farthest right
            in the app bar. This **should** probably be an IconButton or a menu.
            But it can be whatever.`,
          }, {
            name: 'children',
            pt: 'no',
            desc: `Any children that you want to display in the center of the
            app bar.`,
          }],
        }]}
        examples={[{
          markdown: ToolbarExamplesRaw,
          children: <ToolbarExamples />,
        }, {
          markdown: ToolbarWithTabsRaw,
          children: <ToolbarWithTabs fixedWidth={isMobile} />,
        }]}
        >
        Another version of the toolbar that has additional functionality built
        into it to help style and render components.
      </DocPage>
    );
  }
}
