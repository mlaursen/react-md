import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { Tabs, Tab } from '../../../../src/js';
import DocPage from '../../DocPage';

export default class TabsDoc extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { activeTabIndex: 2 };
  }

  handleTabChange = (i) => {
    this.setState({ activeTabIndex: i });
  }

  render() {
    return (
      <DocPage
        imports={['Tabs', 'Tab']}
        code={code}
        defaultImport="Tabs"
        examples={[
          <Tabs primary>
            <Tab label="Tab 1">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Tab>
            <Tab label="Tab 2">
              <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
            </Tab>
          </Tabs>,
          <Tabs secondary activeTabIndex={this.state.activeTabIndex} onTabChange={this.handleTabChange}>
            <Tab label="Some Tab that has a Long Label" />
            <Tab label="Another Tab that has a Long Label" />
            <Tab label="Woop Woop" />
          </Tabs>,
        ]}
        components={[{
          component: Tabs,
          desc: `This is a wrapper component for rendering tabs with specific content. The tabs
          inside this component will be used to figure out what tab content to display, initialize
          a valueLink for each tab if it does not exist, and decide if the tab is active.`,
          allRemaining: true,
          details: [{
            name: 'primary',
            propType: 'ba',
            desc: 'Boolean if the styling will be of the primary color.',
          }, {
            name: 'secondary',
            propType: 'ba',
            desc: 'Boolean if the styling will be of the secondary color.',
          }, {
            name: 'children',
            propType: 'arrayOf(node)',
            desc: 'The tabs you want to manage.',
          }, {
            name: 'activeTabIndex',
            propType: 'nu',
            desc: 'The active tab index if you want to externally manage this component.',
          }, {
            name: 'onTabChange',
            propType: 'f',
            desc: 'A function that is called when a tab is clicked. Called with `this.props.onTabChange(tabIndex, tabComponent)`',
          }],
        }, {
          component: Tab,
          desc: 'This is a component for generating a tab label with some content to display when it is active',
          allRemaining: true,
          details: [{
            name: 'label',
            propType: 's',
            desc: 'The tab label.',
          }, {
            name: 'valueLink',
            propType: 'shape({ checked: bool, requestChange: func })',
            desc: 'A valueLink to use for this tab. If it is not given, the Tabs component will generate one.',
          }],
        }]}
      />
    );
  }
}
