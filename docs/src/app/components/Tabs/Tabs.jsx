import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Tabs as TabsMD, Tab } from 'react-md/Tabs';

import DocPage from 'react-md-documentation';
import TabsExamples from './TabsExamples';
import TabsExamplesRaw from '!!raw!./TabsExamples';
//import './_tabs.scss';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: TabsMD,
          details: [],
        }, {
          component: Tab,
          details: [],
        }]}
        examples={[{
          markdown: TabsExamplesRaw,
          children: <TabsExamples />,
        }]}
        >
        Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.
      </DocPage>
    );
  }
}
