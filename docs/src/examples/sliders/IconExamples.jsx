import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Slider from 'react-md/lib/Sliders';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';

export default class IconExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this._openVolumes = this._openVolumes.bind(this);
    this._closeVolumes = this._closeVolumes.bind(this);
  }

  _openVolumes() {
    this.setState({ isOpen: true });
  }

  _closeVolumes() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

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
          isOpen={isOpen}
          onClose={this._closeVolumes}
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
