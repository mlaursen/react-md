import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';

export default class FullPageDialogExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  openDialog = (e) => {
    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e;
    this.setState({ isOpen: true, pageX, pageY });
  };

  closeDialog = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, pageX, pageY } = this.state;
    const actionLeft = <Button icon onClick={this.closeDialog}>close</Button>;
    const actionRight = <Button flat label="Save" onClick={this.closeDialog} className="mla md-toolbar-item" />;

    return (
      <div>
        <Button raised label="Open full page dialog" onClick={this.openDialog} />
        <Dialog
          isOpen={isOpen}
          pageX={pageX}
          pageY={pageY}
          title="New Event"
          close={this.closeDialog}
          actionLeft={actionLeft}
          actionRight={actionRight}
        >
          <form>
            <TextField
              id="eventEmail"
              placeholder="Email"
              defaultValue="heyfromjonathan@gmail.com"
              block
            />
            <Divider />
            <TextField
              id="eventName"
              placeholder="Event name"
              block
            />
            <Divider />
            <TextField
              id="eventDescription"
              placeholder="Description"
              block
              rows={4}
              multiline
            />
          </form>
        </Dialog>
      </div>
    );
  }
}
