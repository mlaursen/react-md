import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Slider from 'react-md/lib/Sliders';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';

export default class IconExamples extends PureComponent {
  state = { visible: false };

  _openVolumes = () => {
    this.setState({ visible: true });
  };

  _closeVolumes = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button
          raised
          label="Change Some Volues"
          onClick={this._openVolumes}
          secondary
          className="margin-centered"
        />
        <Dialog
          id="volumeChanger"
          visible={visible}
          onHide={this._closeVolumes}
          dialogStyle={{ width: 320 }}
          title="Volumes"
          contentClassName="padding-top-24"
        >
          <Slider
            id="mediaVolume"
            label="Media volume"
            leftIcon={<FontIcon>volume_up</FontIcon>}
            defaultValue={5}
            max={12}
          />
          <Slider
            id="alarmVolume"
            label="Alarm volume"
            leftIcon={<FontIcon>alarm</FontIcon>}
            defaultValue={8}
            max={12}
          />
          <Slider
            id="ringVolume"
            label="Ring volume"
            leftIcon={<FontIcon>vibration</FontIcon>}
            defaultValue={10}
            max={12}
          />
        </Dialog>
      </div>
    );
  }
}
