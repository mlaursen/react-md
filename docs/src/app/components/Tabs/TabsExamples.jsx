import React, { Component } from 'react';
import { Tabs, Tab } from 'react-md/Tabs';

const lorems = [
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>,
  <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>,
];

export default class TabsDoc extends Component {
  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 1 };
  }

  render() {
    return (
      <div>
        <Tabs primary>
          <Tab label="Tab 1">
            {lorems[0]}
          </Tab>
          <Tab label="Tab 2">
            {lorems[1]}
          </Tab>
        </Tabs>
        <Tabs
          secondary
          activeTabIndex={this.state.activeTabIndex}
          onTabChange={(index) => this.setState({ activeTabIndex: index })}
          >
          <Tab label="Some Tab that has a Long Label">
            <p>This is an example of managing the active tab yourself.</p>
          </Tab>
          <Tab label="Another Tab that has a Long Label" />
          <Tab label="Woop Woop" />
        </Tabs>
      </div>
    );
  }
}
