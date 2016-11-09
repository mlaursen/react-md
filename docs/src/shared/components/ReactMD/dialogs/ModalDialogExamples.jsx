import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';

export default class ModalDialogExamples extends PureComponent {
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
    return (
      <div>
        <Button raised onClick={this.openDialog} label="Open Modal Dialog" />
        <Dialog
          id="speedBoost"
          visible={visible}
          title="Use Google's location service?"
          onHide={this.closeDialog}
          aria-labelledby="speedBoostDescription"
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
          <p id="speedBoostDescription" className="md-color--secondary-text">
            Let Google help apps determine location. This means sending anonymouse
            location data to Google, even when no apps are running.
          </p>
        </Dialog>
      </div>
    );
  }
}
