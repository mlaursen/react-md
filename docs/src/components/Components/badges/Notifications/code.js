import Notifications from '!!raw-loader!./index.jsx';
import BadgeWithDialog from '!!raw-loader!./BadgeWithDialog.jsx';
import NotificationDialog from '!!raw-loader!./NotificationDialog.jsx';
import NotificationCard from '!!raw-loader!./NotificationCard.jsx';
import Dismiss from '!!raw-loader!./Dismiss.jsx';
import Reset from '!!raw-loader!./Reset.jsx';
import ToolbarWithBadge from '!!raw-loader!./ToolbarWithBadge.jsx';
import css from '!!raw-loader!./_styles.scss';

export default `/* Notifications.jsx */
${Notifications}
\`\`\`

\`\`\`jsx
/* Reset.jsx */
${Reset}
\`\`\`

\`\`\`jsx
/* ToolbarWithBadge.jsx */
${ToolbarWithBadge}
\`\`\`

\`\`\`jsx
/* BadgeWithDialog.jsx */
${BadgeWithDialog}
\`\`\`

\`\`\`jsx
/* NotificationDialog.jsx */
${NotificationDialog}
\`\`\`

\`\`\`jsx
/* NotificationCard.jsx */
${NotificationCard}
\`\`\`

\`\`\`jsx
/* Dismiss.jsx */
${Dismiss}
\`\`\`

\`\`\`scss
/* _styles.scss */
${css}
`;
