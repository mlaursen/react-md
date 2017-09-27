import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

const controls = [{
  label: 'Auto',
  value: '',
}, {
  label: 'Field 1',
  value: 'field-1',
}, {
  label: 'Field 2',
  value: 'field-2',
}, {
  label: 'Cancel Button',
  value: 'dialog-cancel',
}, {
  label: 'Ok Button',
  value: 'dialog-ok',
}];

export default class FocusControlDialog extends PureComponent {
  state = {
    visible: false,
    focusOnMount: true,
    containFocus: true,
    initialFocus: undefined,
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleMountChange = (checked) => {
    this.setState({ focusOnMount: checked });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  render() {
    const { visible, initialFocus, focusOnMount, containFocus } = this.state;
    const actions = [{
      id: 'dialog-cancel',
      secondary: true,
      children: 'Cancel',
      onClick: this.hide,
    }, {
      id: 'dialog-ok',
      primary: true,
      children: 'Ok',
      onClick: this.hide,
    }];

    return (
      <div>
        <form className="md-grid" onSubmit={this.handleSubmit}>
          <SelectionControlGroup
            id="focus-target"
            name="focus-targets"
            type="radio"
            controls={controls}
            disabled={!containFocus}
            onChange={this.handleTargetChange}
          />
          <SelectionControl
            id="focus-on-mount"
            name="focus-dialog-controls"
            type="checkbox"
            label="Focus on mount"
            checked={focusOnMount}
            onChange={this.handleMountChange}
          />
          <SelectionControl
            id="focus-dialog-contain"
            name="focus-dialog-controls"
            type="checkbox"
            label="Contain focus"
            checked={containFocus}
            onChange={this.handleFocusChange}
          />
        </form>
        <Button raised onClick={this.show}>Open the Dialog</Button>
        <DialogContainer
          id="focus-control-dialog"
          title="Focus Control Example"
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus={initialFocus}
          focusOnMount={focusOnMount}
          containFocus={containFocus}
          contentClassName="md-grid"
        >
          <TextField id="field-1" label="Field 1" placeholder="Lorem ipsum" className="md-cell md-cell--12" />
          <TextField id="field-2" label="Field 2" placeholder="Multiline text here" rows={2} className="md-cell md-cell--12" />
        </DialogContainer>
      </div>
    );
  }
}
