import React, { PureComponent } from 'react';
import {
  Button,
  DialogContainer,
  Divider,
  TextField,
  Toolbar,
} from 'react-md';

export default class SimpleFullPageDialog extends PureComponent {
  state = { visible: false, pageX: null, pageY: null };
  show = (e) => {
    // provide a pageX/pageY to the dialog when making visible to make the
    // dialog "appear" from that x/y coordinate
    let { pageX, pageY } = e;
    if (e.changedTouches) {
      pageX = e.changedTouches[0].pageX;
      pageY = e.changedTouches[0].pageY;
    }

    this.setState({ visible: true, pageX, pageY });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, pageX, pageY } = this.state;

    return (
      <div>
        <Button raised onClick={this.show} aria-controls="simple-full-page-dialog">
          Open the Dialog
        </Button>
        <DialogContainer
          id="simple-full-page-dialog"
          visible={visible}
          pageX={pageX}
          pageY={pageY}
          fullPage
          onHide={this.hide}
          aria-labelledby="simple-full-page-dialog-title"
        >
          <Toolbar
            fixed
            colored
            title="New Event"
            titleId="simple-full-page-dialog-title"
            nav={<Button icon onClick={this.hide}>close</Button>}
            actions={<Button flat onClick={this.hide}>Save</Button>}
          />
          <section className="md-toolbar-relative">
            <TextField id="event-email" placeholder="Email" block paddedBlock />
            <Divider />
            <TextField id="event-name" placeholder="Event name" block paddedBlock />
            <Divider />
            <TextField id="event-desc" placeholder="Description" block paddedBlock rows={4} />
          </section>
        </DialogContainer>
      </div>
    );
  }
}
