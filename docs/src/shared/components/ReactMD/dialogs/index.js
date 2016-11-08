import React from 'react';
import SimpleDialogExamples from './SimpleDialogExamples';
import SimpleDialogExamplesRaw from '!!raw!./SimpleDialogExamples';
import ModalDialogExamples from './ModalDialogExamples';
import ModalDialogExamplesRaw from '!!raw!./ModalDialogExamples';
import FullPageDialogExamples from './FullPageDialogExamples';
import FullPageDialogExamplesRaw from '!!raw!./FullPageDialogExamples';

export default [{
  title: 'Simple Dialog Examples',
  description: `
A \`Simple Dialog\` will be rendered if there are no actions given
to this component. A simple dialog usually consists of list items
that a user must select. These can be scrollable. This dialog can
be closed by clicking the overlay or one of the actions.
`,
  code: SimpleDialogExamplesRaw,
  children: <SimpleDialogExamples />,
}, {
  title: 'Modal Dialog Examples',
  description: `
\`Modal Dialog\` is a dialog that _must_ can only be closed by
clicking one of the actions.
`,
  code: ModalDialogExamplesRaw,
  children: <ModalDialogExamples />,
}, {
  title: 'Full Page Dialog Examples',
  description: `
A \`Full Page Dialog\` is what it says: a full page dialog.. This
is probably more useful on mobile devices. A full page dialog
is rendered if \`actionLeft\` and \`actionRight\` are given as props.


When opened, the dialog will consist of an app bar with the given \`title\`,
\`actionLeft\`, and \`actionRight\`. Any other content will be rendered in
\`.md-dialog-content\`.
`,
  code: FullPageDialogExamplesRaw,
  children: <FullPageDialogExamples />,
}];
