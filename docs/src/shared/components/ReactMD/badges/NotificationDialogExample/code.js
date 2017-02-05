import NotificationDialogExampleRaw from '!!raw!./index';
import NotificationDialogRaw from '!!raw!./NotificationDialog';
import NoNotificationsRaw from '!!raw!./NoNotifications';

import css from '!!raw!./_styles.scss';

export default `
/* NotificationDialogExample.jsx */
${NotificationDialogExampleRaw}
\`\`\`

\`\`\`js
/* NotificationDialog.jsx */
${NotificationDialogRaw}
\`\`\`

\`\`\`js
/* NoNotifications */
${NoNotificationsRaw}
\`\`\`

\`\`\`scss
/* _styles.scss */
${css}
`;
