import React from 'react';
import FileInputExamples from './FileInputExamples';
import FileInputExamplesRaw from '!!raw!./FileInputExamples';
import FileConverterExample from './FileConverterExample';
import FileConverterExampleRaw from '!!raw!./FileConverterExample';
import FileUploadExample from './FileUploadExample';
import FileUploadExampleRaw from '!!raw!./FileUploadExample';

export default [{
  title: 'Basic File Input Example',
  code: FileInputExamplesRaw,
  children: <FileInputExamples />,
}, {
  title: 'Linked with a TextField',
  code: FileConverterExampleRaw,
  children: <FileConverterExample />,
}, {
  title: 'File Upload Example',
  description: `
The \`FileUpload\` component is usefuly when you need to have the user select a file and
locally display that file as a preview. It handles some of the \`File\`/\`FileList\` work
behind the scenes.

The demo below shows how you can implement a progress bar with the upload and abort the upload.
The best results come from using a large file or a file from a remote server.
`,
  code: FileUploadExampleRaw,
  children: <FileUploadExample />,
}];
