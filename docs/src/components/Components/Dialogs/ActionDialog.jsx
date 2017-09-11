import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';

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
    // Actions can either be an object of props to build a Button,
    // or valid react components. When the action is a set of props,
    // it defaults to creating a flat button. Unique keys will automatically
    // be cloned into the buttons along with an additional class name for styling

    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    actions.push(<Button flat primary onClick={this.hide}>Confirm</Button>);

    return (
      <div>
        <Button raised onClick={this.show}>Open the Dialog</Button>
        <DialogContainer
          id="simple-action-dialog"
          visible={visible}
          onHide={this.hide}
          actions={actions}
          title="Change something?"
        >
          <TextField
            id="simple-action-dialog-field"
            label="Some content to change"
            placeholder="Content..."
            defaultValue="Hello, world!"
          />
        </DialogContainer>
      </div>
    );
  }
}
