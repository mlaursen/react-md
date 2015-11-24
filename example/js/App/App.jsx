import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { FlatButton, RaisedButton, FloatingButton } from '../../../src/js/index';
import { Tabs, Tab } from '../../../src/js/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { activeTabIndex: 0 };
  }

  handleTabChange = (i, tab) => {
    console.log('Clicked tab', tab);
    this.setState({ activeTabIndex: i });
  }

  render() {
    return (
      <main>
        <section className="buttons-section">
          <div className="flex-column">
            <h5>Flat Buttons</h5>
            <FlatButton>normal</FlatButton>
            <FlatButton primary icon="chat_bubble_outline">Talk</FlatButton>
            <FlatButton secondary icon="chat_bubble_outline" iconBefore={false}>Talk</FlatButton>
            <FlatButton disabled>disabled</FlatButton>
          </div>
          <div className="flex-column">
            <h5>Raised Buttons</h5>
            <RaisedButton>raised</RaisedButton>
            <RaisedButton primary icon="chat_bubble_outline" iconBefore={false}>raised</RaisedButton>
            <RaisedButton secondary icon="chat_bubble_outline">raised</RaisedButton>
            <RaisedButton disabled>raised</RaisedButton>
          </div>
          <div className="flex-column">
            <h5>Floating Buttons</h5>
            <FloatingButton icon="home" />
            <FloatingButton primary icon="grade" />
            <FloatingButton secondary icon="favorite" />
          </div>
        </section>
        <section className="tabs-section">
          <h5>Tabs - Unmanaged</h5>
          <Tabs>
            <Tab label="Tab 1">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Tab>
            <Tab label="Tab 2">
              <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
            </Tab>
          </Tabs>

          <h5>Tabs - Externally Managed</h5>
          <Tabs activeTabIndex={this.state.activeTabIndex} onTabChange={this.handleTabChange}>
            <Tab label="Tab 1 with a ridiculously long title that woops">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Tab>
            <Tab label="Tab 2">
              <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
            </Tab>
          </Tabs>
        </section>
      </main>
    );
  }
}
