import React from 'react';

import NotificationDialogExample from './NotificationDialogExample';
import NotificationDialogExampleRaw from './NotificationDialogExample/code';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import './_styles.scss';

const template = '`${max}`+'; // eslint-disable-line

export default [{
  title: 'Notification Dialog Example',
  description: `
This is an example of how you might want to use the \`Badge\` component to display
notifications within you app. It links together with the \`Dialog\` component to
display a list of _new_ content that happened since the last visit.
`,
  code: NotificationDialogExampleRaw,
  children: <NotificationDialogExample />,
}, {
  title: 'Simple Examples',
  description: `
As stated above, the main use case for the badge is to create a notification component.
When the badge content is set to a number, it will automatically be truncated to \`max\`
prop value. If the number is greater than the \`max\`, it will be displayed as
\`${template}\`.  This is really only done to get the number within the bubble. The
buble size can be changed via Sass.

Even though the main use case of the badge is for notifications, you can also float
any content. However, it will be up to you to position correctly.
`,
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}];
