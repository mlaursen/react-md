import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import SimpleStyles from '!!raw-loader!./_simple.scss';

import Notifications from './Notifications';
import NotificationsRaw from './Notifications/code';

const template = '`${max}`+'; // eslint-disable-line

const examples = [{
  title: 'Simple',
  description: `
The main use case for the badge is to create a notification component.  When the badge
content is set to a number, it will automatically be truncated to \`max\` prop value.
If the number is greater than the \`max\`, it will be displayed as \`${template}\`.
This is really only done to get the number within the bubble. The buble size can be
changed via Sass.

Even though the main use case of the badge is for notifications, you can also float
any content. However, it will be up to you to position correctly with additional styles
or class names.
`,
  code: `/* Simple.jsx */
${SimpleRaw}
\`\`\`

\`\`\`scss
${SimpleStyles}
  `,
  children: <Simple />,
}, {
  title: 'Notification Dialog Example',
  description: `
This is an example of how you might want to use the \`Badge\` component to display
notifications within you app. It links together with the \`Dialog\` component to
display a list of _new_ content that happened since the last visit.
`,
  code: NotificationsRaw,
  children: <Notifications />,
}];

const Badges = () => <ExamplesPage description={README} examples={examples} />;
export default Badges;
