import React from 'react';
import { FileInput, SVGIcon } from 'react-md';

import fileDownload from 'icons/file_download.svg';

const Simple = () => (
  <div className="file-inputs">
    <FileInput id="image-input-1" accept="image/*" name="images" />
    <FileInput id="image-input-2" accept="image/*" name="images" flat />
    <FileInput id="image-input-3" accept="image/*" name="images" primary />
    <FileInput id="image-input-3" accept="image/*" name="images" flat secondary />
    <FileInput id="image-input-4" accept="image/*" name="images" disabled />
    <FileInput id="image-input-5" accept="image/*" name="images" flat disabled iconBefore />
    <FileInput id="image-input-6" accept="image/*" name="images" icon={<SVGIcon use={fileDownload.url} />} />
    <FileInput id="image-input-7" accept="image/*" name="images" icon={null} />
  </div>
);

export default Simple;
