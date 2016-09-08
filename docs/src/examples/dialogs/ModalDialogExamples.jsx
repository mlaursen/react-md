import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';

import './_speed-boost.scss';

export default class ModalDialogExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  openDialog = () => {
    this.setState({ isOpen: true });
  };

  closeDialog = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button raised onClick={this.openDialog} label="Open Modal Dialog" />
        <Dialog
          isOpen={isOpen}
          dialogClassName="speed-boost"
          contentClassName="speed-boost-content"
          title="Use Google's location service?"
          close={this.closeDialog}
          modal
          actions={[{
            onClick: this.closeDialog,
            primary: true,
            label: 'Turn on speed boost',
          }, {
            onClick: this.closeDialog,
            primary: true,
            label: 'No thanks',
          }]}
        >
          <p>
            Let Google help apps determine location. This means sending anonymouse
            location data to Google, even when no apps are running.
          </p>
        </Dialog>
      </div>
    );
  }
}
