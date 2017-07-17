import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Button from 'react-md/lib/Buttons/Button';
import { FileUpload } from 'react-md/lib/FileInputs';
import guid from 'uuid/v1';
import { without } from 'lodash/array';

import './_styles.scss';
import UploadProgress from './UploadProgress';
import UploadedFileCard from './UploadedFileCard';

const LOADING_PROPS = {
  'aria-busy': true,
  'aria-describedby': 'file-upload-progress',
};

export default class SimpleFileUpload extends PureComponent {
  state = { files: [], progress: null, file: null };

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setFileUpload = (fileUpload) => {
    this.fileUpload = fileUpload;
  };

  setFile = (file) => {
    this.setState({ file });
  };

  abortUpload = () => {
    if (this.fileUpload) {
      this.fileUpload.abort();
    }

    this.setState({ file: null, progress: null });
  };

  /**
   * This is triggered once a file has been successfully uploaded.
   *
   * @param {File} uploadedFile - the fully uploaded file. The properties
   *    of this object change depending on the browser, but normally
   *    the name, size, type, and lastModifiedDate are the same.
   * @param {String} uploadedData - This will be whatever the results of
   *    the upload was. So this could be the text in a file, a data-url
   *    for an image, or some other content for other file types.
   */
  handleLoad = (uploadedFile, uploadedData) => {
    const { name, size, type, lastModifiedDate } = uploadedFile;
    const file = {
      id: guid(),
      name,
      size,
      type,
      data: uploadedData,
      lastModified: new Date(lastModifiedDate),
    };

    const files = [...this.state.files, file];

    // Show progress bar for one more second
    this.timeout = setTimeout(() => {
      this.timeout = null;

      this.setState({ progress: null });
    }, 1000);
    this.setState({ files, progress: 100 });
  };

  handleProgress = (file, progress) => {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file) {
      this.setState({ progress });
    }
  };

  removeFile = (file) => {
    const files = without(this.state.files, file);
    this.setState({ files });
  };

  removeAll = () => {
    this.setState({ files: [] }, () => {
      const example = document.getElementById('file-upload-example');
      const toolbar = document.getElementById('main-toolbar');
      if (example && toolbar) {
        window.scrollTo(0, example.offsetTop - toolbar.offsetHeight);
      }
    });
  };

  render() {
    const { progress, file, files } = this.state;

    const uploadedFileCards = files.map((file => <UploadedFileCard key={file.id} file={file} onRemoveClick={this.removeFile} />));
    let fab;
    if (files.length) {
      fab = (
        <Button
          floating
          fixed
          secondary
          onClick={this.removeAll}
          tooltipPosition="left"
          tooltipLabel="Remove all uploads"
        >
          delete
        </Button>
      );
    }

    return (
      <div>
        <UploadProgress progress={progress} onAbortClick={this.abortUpload} file={file} />
        <FileUpload
          id="multiple-file-upload"
          multiple
          secondary
          name="multipart-file-upload"
          ref={this.setFileUpload}
          label="Select files"
          onLoadStart={this.setFile}
          onProgress={this.handleProgress}
          onLoad={this.handleLoad}
        />
        <CSSTransitionGroup
          component="section"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-grid"
          {...(typeof progress === 'number' ? LOADING_PROPS : undefined)}
        >
          {uploadedFileCards}
          {fab}
        </CSSTransitionGroup>
      </div>
    );
  }
}
