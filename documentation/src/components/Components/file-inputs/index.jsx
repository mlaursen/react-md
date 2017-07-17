import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';

import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SimpleFileUpload from './SimpleFileUpload';
import SimpleFileUploadRaw from './SimpleFileUpload/code';
import ServerUpload from './ServerUpload';
import ServerUploadRaw from '!!raw-loader!./ServerUpload.jsx';

const examples = [{
  title: 'Simple FileInput Examples',
  description: `
The \`FileInput\` is a very simple wrapper for a \`<label>\` and \`<input type="file" />\`
to gain the styles of the \`Button\` component. All of the styling props on a button are
available on the \`FileInput\`.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'FileUpload Example',
  description: `
The \`FileUpload\` component is a wrapper of the \`FileInput\` that has some additional hooks
for handling uploading a file to a **browser**, **not** a **server**.

This example shows how you can hook into the upload progress props to display a progress bar
and optional abort the upload. This will really only be effect if you choose big files since
it is pretty fast to upload small files to the browser.
  `,
  code: SimpleFileUploadRaw,
  children: <SimpleFileUpload />,
}, {
  title: 'Uploading to a Server',
  code: ServerUploadRaw,
  children: <ServerUpload />,
}];

const FileInputs = () => <ExamplesPage description={README} examples={examples} />;
export default FileInputs;
