import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { RaisedButton } from 'react-md/lib/Buttons';
import { LinearProgress } from 'react-md/lib/Progress';
import { FileUpload } from 'react-md/lib/FileInputs';

import UploadedFileCard from './UploadedFileCard';

export default class FileUploadExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { files: {} };
    this._timeout = null;
  }

  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
  }

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
    this.refs.upload.abort();
    this.setState({ file: null, progress: null });
  };

  /**
   * Removes an uploaded file if the close IconButton is clicked.
   */
  _handleListClick = (e) => {
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
  };

  render() {
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);

    let stats;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress key="progress" value={progress} />,
        <RaisedButton key="abort" label="Abort Upload" onClick={this._abortUpload} />,
      ];
    }

    return (
      <div>
        {stats}
        <FileUpload
          multiple
          secondary
          ref="upload"
          label="Select files to upload"
          onLoadStart={this._setFile}
          onProgress={this._handleProgress}
          onLoad={this._onLoad}
        />
        <CSSTransitionGroup
          component="output"
          className="md-card-list"
          transitionName="upload"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          onClick={this._handleListClick}
        >
          {cards}
        </CSSTransitionGroup>
      </div>
    );
  }
}
