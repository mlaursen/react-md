import React from 'react';
import FileInput from 'react-md/lib/FileInputs';

const Simple = () => (
  <div className="file-inputs">
    <FileInput id="image-input-1" accept="image/*" name="images" />
    <FileInput id="image-input-2" accept="image/*" name="images" flat />
    <FileInput id="image-input-3" accept="image/*" name="images" primary />
    <FileInput id="image-input-3" accept="image/*" name="images" flat secondary />
    <FileInput id="image-input-4" accept="image/*" name="images" disabled />
    <FileInput id="image-input-5" accept="image/*" name="images" flat disabled iconBefore />
  </div>
);

export default Simple;
