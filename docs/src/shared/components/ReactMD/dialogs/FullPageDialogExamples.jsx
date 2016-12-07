import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import loremIpsum from 'lorem-ipsum';

export default class FullPageDialogExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false, pageX: null, pageY: null };
    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
  }

  _openDialog(e) {
    let { pageX, pageY } = e;
    if (e.changedTouches) {
      const [touch] = e.changedTouches;
      pageX = touch.pageX;
      pageY = touch.pageY;
    }

    this.setState({ visible: true, pageX, pageY });
  }

  _closeDialog() {
    this.setState({ visible: false });
  }

  render() {
    const nav = <Button waitForInkTransition icon onClick={this._closeDialog}>close</Button>;
    const action = <Button waitForInkTransition flat label="Save" onClick={this._closeDialog} />;

    return (
      <div>
        <Button raised label="Open full page dialog" onClick={this._openDialog} />
        <Dialog
          id="fullPageExample"
          {...this.state}
          onHide={this._closeDialog}
          fullPage
          aria-label="New Event"
        >
          <Toolbar
            colored
            nav={nav}
            actions={action}
            title="New Event"
            fixed
          />
          <form className="md-toolbar-relative">
            <TextField
              id="eventEmail"
              placeholder="Email"
              defaultValue="heyfromjonathan@gmail.com"
              block
              paddedBlock
            />
            <Divider />
            <TextField
              id="eventName"
              placeholder="Event name"
              block
              paddedBlock
            />
            <Divider />
            <TextField
              id="eventDescription"
              placeholder="Description"
              block
              paddedBlock
              rows={4}
              defaultValue={loremIpsum({ count: 1, units: 'paragraphs' })}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}
