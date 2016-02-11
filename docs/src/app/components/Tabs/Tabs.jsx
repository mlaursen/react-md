import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Tabs as TabsMD, Tab } from 'react-md/lib/Tabs';

import DocPage from 'react-md-documentation';
import TabsExamples from './TabsExamples';
import TabsExamplesRaw from '!!raw!./TabsExamples';
import PhoneExample from './PhoneExample';
import PhoneExampleRaw from '!!raw!./PhoneExample';
//import './_tabs.scss';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: TabsMD,
          desc: `This is a wrapper component for rendering tabs with specific content. The tabs
          inside this component will be used to figure out what tab content to display, initialize
          a valueLink for each tab if it does not exist, and decide if the tab is active.`,
          details: [{
            name: 'primary',
            pt: 'ba',
            desc: 'Boolean if the styling will be of the primary color.',
          }, {
            name: 'secondary',
            pt: 'ba',
            desc: 'Boolean if the styling will be of the secondary color.',
          }, {
            name: 'children',
            pt: 'arrayOf(node)',
            desc: 'The tabs you want to manage.',
          }, {
            name: 'activeTabIndex',
            pt: 'nu',
            desc: 'The active tab index if you want to externally manage this component.',
          }, {
            name: 'onTabChange',
            pt: 'f',
            desc: 'A function that is called when a tab is clicked. Called with `this.props.onTabChange(tabIndex, tabComponent)`',
          }],
        }, {
          component: Tab,
          desc: `This is the component for generating a tab label with some content to
          display when it is considered active. Anything can be rendered in here.`,
          details: [{
            name: 'label',
            pt: 's',
            desc: 'The tab label.',
          }, {
            name: 'valueLink',
            pt: 'shape({ checked: bool, requestChange: func })',
            desc: 'A valueLink to use for this tab. If it is not given, the Tabs component will generate one.',
          }],
        }]}
        examples={[{
          markdown: TabsExamplesRaw,
          children: <TabsExamples />,
        }, {
          markdown: PhoneExampleRaw,
          children: <PhoneExample />,
        }]}
        >
        Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.
      </DocPage>
    );
  }
}
