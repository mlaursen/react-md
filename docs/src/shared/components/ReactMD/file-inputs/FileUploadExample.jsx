import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';

import { omit } from 'lodash/object';
import UploadedFileCard from './UploadedFileCard';

export default class FileUploadExample extends PureComponent {
  state = { files: {} };

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _timeout = null;

  _setUpload = (upload) => {
    this._upload = upload;
  };

  _onLoad = (file, uploadResult) => {
    const { name, size, type, lastModifiedDate } = file;

    const files = Object.assign({}, this.state.files);
    files[name] = {
      name,
      type,
      size,
      lastModified: new Date(lastModifiedDate),
      uploadResult,
    };

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ progress: null });
    }, 2000);

    this.setState({ files, progress: 100 });
  };

  _setFile = (file) => {
    this.setState({ file });
  };

  _handleProgress = (file, progress) => {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file === file) {
      this.setState({ progress });
    }
  };

  _abortUpload = () => {
    if (this._upload) {
      this._upload.abort();
    }

    this.setState({ file: null, progress: null });
  };

  /**
   * Removes an uploaded file if the close IconButton is clicked.
   */
  _handleListClick = (e) => {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.dataset.name) {
        this.setState({ files: omit(this.state.files, [target.dataset.name]) });
        return;
      }

      target = target.parentNode;
    }
  };

  render() {
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);

    let stats;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress key="progress" value={progress} id="upload-progress" />,
        <Button raised key="abort" onClick={this._abortUpload}>Abort Upload</Button>,
      ];
    }

    return (
      <div>
        {stats}
        <FileUpload
          id="multiFileUpload"
          multiple
          secondary
          name="mutlipart-file-upload"
          ref={this._setUpload}
          label="Select files to upload"
          onLoadStart={this._setFile}
          onProgress={this._handleProgress}
          onLoad={this._onLoad}
        />
        <CSSTransitionGroup
          component="output"
          className="md-grid"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          onClick={this._handleListClick}
        >
          {cards}
        </CSSTransitionGroup>
      </div>
    );
  }
}
