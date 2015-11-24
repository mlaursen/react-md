import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, FlatButton, RaisedButton, FloatingButton } from '../../../src/js/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <main>
        <FlatButton>normal</FlatButton>
        <FlatButton disabled>disabled</FlatButton>
        <FlatButton primary icon="chat_bubble_outline">Talk</FlatButton>
        <FlatButton primary disabled>primary disabled</FlatButton>
        <FlatButton secondary icon="chat_bubble_outline" iconBefore={false}>Talk</FlatButton>
        <FlatButton secondary disabled>secondary disabled</FlatButton>

        <RaisedButton>raised</RaisedButton>
        <RaisedButton disabled>raised</RaisedButton>
        <RaisedButton primary icon="chat_bubble_outline" iconBefore={false}>raised</RaisedButton>
        <RaisedButton primary disabled>raised</RaisedButton>
        <RaisedButton secondary icon="chat_bubble_outline">raised</RaisedButton>
        <RaisedButton secondary disabled>raised</RaisedButton>

        <FloatingButton icon="home" />
        <FloatingButton primary icon="grade" />
        <FloatingButton secondary icon="favorite" />
      </main>
    );
  }
}
