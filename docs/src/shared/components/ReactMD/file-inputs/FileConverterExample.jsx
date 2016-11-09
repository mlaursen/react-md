import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons';
import FileInput from 'react-md/lib/FileInputs';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Dialog from 'react-md/lib/Dialogs';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

const FILE_TYPES = ['webm', 'mkv', 'flv', 'avi', 'mov', 'mp4'];

/**
 * This example was copied from
 * https://www.reddit.com/r/MaterialDesign/comments/4odb1j/wip_file_converter/
 */
export default class FileConverterExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileName: '',
      visible: false,
      progress: 0,
    };

    this._interval = null;
  }

  componentWillUnmount() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  _selectFile = (file) => {
    if (!file) { return; }
    this.setState({ file, fileName: file.name });
  };

  _updateFileName = (value) => {
    this.setState({ fileName: value });
  };

  _fakeSubmit = (e) => {
    e.preventDefault();

    this._interval = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 });
    }, 2000);
    this.setState({ visible: true, progress: 0 });
  };

  _close = () => {
    if (this._interval) {
      clearInterval(this._interval);
    }

    this._interval = null;
    this.setState({ visible: false, progress: 0 });
  };

  render() {
    const { file, fileName, visible, progress } = this.state;
    const dialogProps = {
      id: 'fileConverterDialog',
      visible,
      onHide: this._close,
      title: 'Converting...',
      actions: [{ onClick: this._close, primary: true, label: 'Cancel' }],
      dialogStyle: { width: 360 },
    };

    if (visible) {
      dialogProps.children = [
        <LinearProgress key="progress" value={progress} />,
        <span key="counter">{progress}%</span>,
      ];
    }

    return (
      <form className="converter-form md-text-container md-grid">
        <SelectField
          id="videoIn"
          label="Input file"
          defaultValue={FILE_TYPES[0]}
          menuItems={FILE_TYPES}
          position={SelectField.Positions.TOP_LEFT}
          className="md-cell md-cell--4 md-cell--6-desktop"
        />
        <SelectField
          id="videoOut"
          label="Output file"
          defaultValue={FILE_TYPES[FILE_TYPES.length - 1]}
          menuItems={FILE_TYPES}
          position={SelectField.Positions.TOP_LEFT}
          className="md-cell md-cell--4 md-cell--6-desktop"
        />
        <div className="file-block md-cell md-cell--12">
          <FileInput
            id="videoFile"
            secondary
            label="Video"
            accept="video/*"
            onChange={this._selectFile}
          />
          <TextField
            id="videoFileName"
            value={fileName}
            onChange={this._updateFileName}
            disabled={!file}
            helpText="You can rename the new file blah blah"
          />
        </div>
        <div className="submit-block md-cell md-cell--12">
          <i className="md-body-1">
            Note: Converted file will be in the same folder as the input file.
          </i>
          <Button
            raised
            secondary
            type="submit"
            label="Submit"
            disabled={!file}
            onClick={this._fakeSubmit}
          />
        </div>
        <Dialog {...dialogProps} />
      </form>
    );
  }
}
