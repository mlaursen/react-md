import React from 'react';
import PropTypes from 'prop-types';
import { Button, LinearProgress } from 'react-md';

const UploadProgress = ({ progress, onAbortClick, file }) => {
  if (typeof progress !== 'number') {
    return null;
  }

  let uploading;
  if (file && file.name) {
    uploading = <p>{`Uploading ${file.name}.`}</p>;
  }

  return (
    <header className="md-cell md-cell--12">
      <LinearProgress id="file-upload-progress" value={progress} />
      {uploading}
      <Button raised onClick={onAbortClick}>Abort</Button>
    </header>
  );
};

UploadProgress.propTypes = {
  progress: PropTypes.number,
  onAbortClick: PropTypes.func,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default UploadProgress;
