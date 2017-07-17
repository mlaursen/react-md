/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import { FileUpload } from 'react-md/lib/FileInputs';
import Button from 'react-md/lib/Buttons/Button';
import CardActions from 'react-md/lib/Cards/CardActions';
import Snackbar from 'react-md/lib/Snackbars';

import { API_ENDPOINT, FAKE_UPLOAD_ENDPOINT } from 'constants/application';
import UploadedFileCard from './SimpleFileUpload/UploadedFileCard';

// const MBit = 124999; // Megabit is 125000 bytes
// const speed4G = 15.1 * MBit; // The average 4g speed is 15.1 MBit/s

export default class ServerUpload extends PureComponent {
  state = { file: null, toasts: [] };

  setForm = (form) => {
    this.form = form;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const file = data.get('file');
    if (!file || !file.name) {
      this.addToast('A file is required.');
      return;
    }

    fetch(`${API_ENDPOINT}${FAKE_UPLOAD_ENDPOINT}`, {
      method: 'POST',
      body: data,
    }).then((response) => {
      this.setState({ progress: 0, max: file.size });
      return this.handleProgress(response.body.getReader());
    });
  };

  handleProgress = async (reader) => {
    const result = await reader.read();
    if (result.done) {
      console.log('DONE');
      this.setState({ progress: this.state.file.size });
      return null;
    }

    console.log('result:', result);
    const chunk = result.value;
    console.log('chunk:', chunk);
    console.log('chunk.byteLength:', chunk.byteLength);
    this.setState({ progress: this.state.progress + chunk.byteLegth });

    return this.handleProgress(reader);
  };

  handleLoad = (uploadedFile, uploadedData) => {
    const { name, size, type, lastModifiedDate } = uploadedFile;
    const file = {
      name,
      size,
      type,
      data: uploadedData,
      lastModified: new Date(lastModifiedDate),
    };

    this.setState({ file });
  };

  addToast = (text) => {
    const toasts = [{ text, action: 'Ok' }];
    this.setState({ toasts });
  };

  dismiss = () => {
    const [, ...toasts] = this.state;
    this.setState({ toasts });
  };

  handleRemove = () => {
    this.form.reset();
  };

  handleReset = () => {
    this.setState({ file: null });
  };

  render() {
    const { toasts, file } = this.state;

    let filePreview;
    if (file) {
      filePreview = <UploadedFileCard file={file} onRemoveClick={this.handleRemove} />;
    }

    return (
      <form
        id="server-upload-form"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        name="server-upload-form"
        encType="multipart/form-data"
      >
        <FileUpload
          id="server-upload-file"
          required
          onLoad={this.handleLoad}
          name="file"
        />
        {filePreview}
        <CardActions>
          <Button type="reset" flat className="md-cell--right">Reset</Button>
          <Button type="submit" flat primary>Submit</Button>
        </CardActions>
        <Snackbar id="file-upload-errors" toasts={toasts} onDismiss={this.dismiss} autohide={false} />
      </form>
    );
  }
}
