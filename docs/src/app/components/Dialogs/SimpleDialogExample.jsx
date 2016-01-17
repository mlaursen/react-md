import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RaisedButton } from 'react-md/Buttons';
import { List, ListItem } from 'react-md/Lists';
import Dialog from 'react-md/Dialogs';

export default class SimpleDialogExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    return (
      <div>
        <RaisedButton label="Open Simple Dialog" onClick={this.open} />
        <Dialog
          isOpen={this.state.isOpen}
          title="Title"
          close={this.close}
          style={{ maxWidth: '320px' }}
          >
          <List>
            <ListItem onClick={this.close} primaryText="Single line text goes here" />
            <ListItem onClick={this.close} primaryText="Two line wrapped text goes here making it wrap to next line" />
            <ListItem onClick={this.close} primaryText="Single line text goes here" />
            <ListItem onClick={this.close} primaryText="Three line wrapped text goes here making it wrap to the next line and continues longer to be here" />
          </List>
        </Dialog>
      </div>
    );
  }
}
