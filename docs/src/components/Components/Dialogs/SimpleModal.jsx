import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';

export default class SimpleModal extends PureComponent {
  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const actions = [{
      onClick: this.hide,
      primary: true,
      children: 'Turn on speed boost',
    }, {
      onClick: this.hide,
      primary: true,
      children: 'No thanks',
    }];

    return (
      <div>
        <Button raised onClick={this.show}>Open the Dialog</Button>
        <DialogContainer
          id="speed-boost"
          visible={visible}
          title="Use Google's location service?"
          onHide={this.hide}
          aria-describedby="speed-boost-description"
          modal
          actions={actions}
        >
          <p id="speed-boost-description" className="md-color--secondary-text">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </p>
        </DialogContainer>
      </div>
    );
  }
}
