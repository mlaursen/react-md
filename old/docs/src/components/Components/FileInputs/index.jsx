import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';

import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SimpleFileUpload from './SimpleFileUpload';
import SimpleFileUploadRaw from './SimpleFileUpload/code';
import ServerUpload from './ServerUpload';
import ServerUploadRaw from './ServerUpload/code';
import AllowingDuplicates from './AllowingDuplicates';
import AllowingDuplicatesRaw from '!!raw-loader!./AllowingDuplicates.jsx';

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
  description: `
This example shows how you can use the \`FileUpload\` component along with \`FormData\` to "upload"
a file to my documentation server.
  `,
  code: ServerUploadRaw,
  children: <ServerUpload />,
}, {
  title: 'Allowing Duplicates',
  description: `
Since the \`FileInput\` is a simple wrapper of the \`<input type="file" />\` element, this means that the native
behavior is enabled by default. Once a user selects a file, they will not be able to select that file again
immediately. They will need to select a different file and then select the file again if they want to upload/select
it again. This is because the file input stores the path of the files as its value and does not trigger the \`onChange\`
event again.

This behavior can be overridden by enabling the \`allowDuplicates\` prop to never store the \`value\` of the file's path
and triggering the \`onChange\` event every time a file is selected.
  `,
  code: AllowingDuplicatesRaw,
  children: <AllowingDuplicates />,
}];

const FileInputs = () => <ExamplesPage description={README} examples={examples} />;
export default FileInputs;
