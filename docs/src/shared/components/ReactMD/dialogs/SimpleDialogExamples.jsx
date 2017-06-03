import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

export default class SimpleDialogExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  openDialog = () => {
    this.setState({ visible: true });
  };

  closeDialog = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    const items = [
      'Single line text goes here',
      'Two line wrapped text goes here making it wrap to next line',
      'Single line text goes here',
      'Three line wrapped text goes here making it wrap to the next line and continues longer to be here',
    ].map((primaryText, i) => (
      <ListItem key={i} onClick={this.closeDialog} primaryText={primaryText} />
    ));
    return (
      <div>
        <Button raised onClick={this.openDialog}>Open Simple Dialog</Button>
        <Dialog
          id="simpleDialogExample"
          visible={visible}
          title="Simple Title"
          onHide={this.closeDialog}
        >
          <List>
            {items}
          </List>
        </Dialog>
      </div>
    );
  }
}
