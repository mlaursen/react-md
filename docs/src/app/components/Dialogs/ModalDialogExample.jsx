import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RaisedButton, FlatButton } from 'react-md/Buttons';
import Dialog from 'react-md/Dialogs';
import { RadioGroup, Radio } from 'react-md/SelectionControls';

const contents = [
  <p key="location">
    Let Google help apps determine location. This means sending anonymouse
    location data to Google, even when no apps are running.
  </p>,
  <RadioGroup>
    <Radio value="N" label="None" />
    <Radio value="C" label="Callisto" />
    <Radio value="G" label="Ganymede" />
    <Radio value="L" label="Luna" />
  </RadioGroup>,
];

const titles = ['Use Google\'s location service?', 'Phone Ringtone'];
const label1s = ['Turn on speed boost', 'Cancel'];
const label2s = ['No thanks', 'Ok'];

export default class ModalDialogExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isOpen: false,
      title: null,
      contents: null,
    };
  }

  open = (i) => {
    this.setState({
      isOpen: true,
      content: contents[i],
      title: titles[i],
      label1: label1s[i],
      label2: label2s[i],
    });
  };

  close = () => {
    this.setState({ isOpen: false, title: null, contents: null, label1: null, label2: null, maxHeight: null });
  };

  render() {
    const { isOpen, title, content, label1, label2 } = this.state;
    const actions = (!label1 && !label2) ? null : [
      <FlatButton key="first" onClick={this.close} primary label={label1} />,
      <FlatButton key="second" onClick={this.close} primary label={label2} />,
    ];

    return (
      <div>
        <RaisedButton label="Open modal dialog" onClick={this.open.bind(this, 0)} />
        <RaisedButton label="Change phone ringtone" onClick={this.open.bind(this, 1)} />
        <Dialog
          isOpen={isOpen}
          title={title}
          modal
          actions={actions}
          close={this.close}
          contentClassName="max-height-165"
          style={{ maxWidth: '280px' }}
          >
          {content}
        </Dialog>
      </div>
    );
  }
}
