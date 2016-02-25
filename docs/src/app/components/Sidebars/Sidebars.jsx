import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Sidebar from 'react-md/lib/Sidebars';

import DocPage from 'react-md-documentation';
import SidebarNavRaw from '!!raw!../../App/SidebarNav';
import SidebarExamples from './SidebarExamples';
import SidebarExamplesRaw from '!!raw!./SidebarExamples';
import './_sidebar.scss';

export default class Sidebars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Sidebar,
          details: [],
        }]}
        examples={[{
          markdown: SidebarNavRaw,
          children: (
            <p>
              The main example of a sidebar is the main navigation sidebar for this documentation wesbsite.
              The Sidebar component is a controlled component that forces you to keep track of
              if it is open or not.
            </p>
          ),
        }, {
          markdown: SidebarExamplesRaw,
          children: <SidebarExamples {...this.props} />,
        }]}
        >
          Sidebars are generally components used for navigation.
      </DocPage>
    );
  }
}
