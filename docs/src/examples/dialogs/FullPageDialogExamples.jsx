import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import { RaisedButton, IconButton, FlatButton } from 'react-md/lib/Buttons';
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
    const actionLeft = <IconButton onClick={this.closeDialog}>close</IconButton>;
    const actionRight = <FlatButton label="Save" onClick={this.closeDialog} className="justify-end md-toolbar-item" />;

    return (
      <div>
        <RaisedButton label="Open full page dialog" onClick={this.openDialog} />
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
              label="Email"
              defaultValue="heyfromjonathan@gmail.com"
              block
              floatingLabel={false}
            />
            <Divider />
            <TextField
              label="Event name"
              block
              floatingLabel={false}
            />
            <Divider />
            <TextField
              placeholder="Description"
              block
              rows={4}
              maxRows={-1}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}
