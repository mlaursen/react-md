import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';

import UploadedFileCard from './UploadedFileCard';

export default class FileUploadExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { files: {} };
    this._timeout = null;
    this._onLoad = this._onLoad.bind(this);
    this._setFile = this._setFile.bind(this);
    this._setUpload = this._setUpload.bind(this);
    this._abortUpload = this._abortUpload.bind(this);
    this._handleListClick = this._handleListClick.bind(this);
    this._handleProgress = this._handleProgress.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setUpload(upload) {
    this._upload = upload;
  }

  _onLoad(file, uploadResult) {
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
  }

  _setFile(file) {
    this.setState({ file });
  }

  _handleProgress(file, progress) {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file === file) {
      this.setState({ progress });
    }
  }

  _abortUpload() {
    if (this._upload) {
      this._upload.abort();
    }

    this.setState({ file: null, progress: null });
  }

  /**
   * Removes an uploaded file if the close IconButton is clicked.
   */
  _handleListClick(e) {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.dataset.name) {
        const files = Object.assign({}, this.state.files);
        delete files[target.dataset.name];
        this.setState({ files });
        return;
      }

      target = target.parentNode;
    }
  }

  render() {
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);

    let stats;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress key="progress" value={progress} />,
        <Button raised key="abort" label="Abort Upload" onClick={this._abortUpload} />,
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
