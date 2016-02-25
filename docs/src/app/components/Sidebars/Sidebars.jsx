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
          details: [{
            name: 'isOpen',
            pt: 'b',
            desc: `Boolean if the sidebar is currently open.`,
          }, {
            name: 'items',
            pt: 'array',
            desc: `This is an array of properties to use to generate
            a list of items for the sidebar. If an item has the prop \`divider\`
            set to true, it will use the \`Divider\` component and
            any remaining props. If the \`subheader\` prop is set to true,
            it will use the \`ListSubheader\` component and pass any
            remaining props to that component. Finally, it will use the
            \`ListItem\` component and pass all props to it.`,
          }, {
            name: 'children',
            pt: 'no',
            desc: `Any children you want to be displayed after the \`items\``,
          }, {
            name: 'responsive',
            pt: 'b',
            desc: 'Boolean if the sidebar should be responsive.',
          }, {
            name: 'fixed',
            pt: 'b',
            desc: `Boolean if the sidebar is fixed to the page.`,
          }, {
            name: 'overlay',
            pt: 'b',
            desc: `boolean if the overlay should be included. (It is included
            automatically if it is responsive and open.)`,
          }, {
            name: 'align',
            pt: 'one(\'left\', \'right\')',
            desc: `The side of the screen the Sidebar should be fixed to.`,
          }, {
            name: 'onOverlayClick',
            pt: 'f',
            desc: `An optional function to call when the overlay is clicked. You
            must this function with a close ability if you want the user to
            be able to close the sidebar on overlay click.`,
          }, {
            name: 'transitionName',
            pt: 's',
            desc: `The overlay transition name.`,
          }, {
            name: 'transitionEnterTimeout',
            pt: 'nu',
            desc: `The timeout for the overlay entering.`,
          }, {
            name: 'transitionLeaveTimeout',
            pt: 'nu',
            desc: `The timeout for the overlay leaving.`,
          }, {
            name: 'header',
            pt: 'no',
            desc: `An optional header to include in the sidebar.`,
          }],
        }]}
        examples={[{
          markdown: SidebarNavRaw,
          children: <p>View the source code of the main sidebar</p>,
          name: 'Main Sidebar',
        }, {
          markdown: SidebarExamplesRaw,
          children: <SidebarExamples {...this.props} />,
        }]}
        >
          Sidebars are generally components used for navigation. The main example
          of a sidebar is the main navigation sidebar for this documentation
          wesbsite.  The Sidebar component is a controlled component that forces
          you to keep track of if it is open or not.
      </DocPage>
    );
  }
}
