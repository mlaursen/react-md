import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

export default class SimpleListDialog extends PureComponent {
  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button raised onClick={this.show}>Open the dialog</Button>
        <DialogContainer
          id="simple-list-dialog"
          visible={visible}
          title="Simple List Dialog"
          onHide={this.hide}
        >
          <List onClick={this.hide}>
            <ListItem primaryText="Single line text goes here" />
            <ListItem primaryText="Two line wrapped text goes here making it wrap to the next line" />
            <ListItem primaryText="Single line text goes here" />
            <ListItem primaryText="Three line wrapped text goes here making it wrap to the next line and continues longer to be here" />
          </List>
        </DialogContainer>
      </div>
    );
  }
}
