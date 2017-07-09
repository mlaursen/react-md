import RoutingExample from '!!raw-loader!./RoutingExample.jsx';
import NavItemLink from '!!raw-loader!./NavItemLink.jsx';
import Inbox from '!!raw-loader!./Inbox.jsx';
import Starred from '!!raw-loader!./Starred.jsx';
import SendMail from '!!raw-loader!./SendMail.jsx';
import Drafts from '!!raw-loader!./Drafts.jsx';
import DraftCard from '!!raw-loader!./DraftCard.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* RoutingExample.jsx */
${RoutingExample}
\`\`\`

\`\`\`js
/* NavItemLink.jsx */
${NavItemLink}
\`\`\`

\`\`\`js
/* Inbox.jsx */
${Inbox}
\`\`\`

\`\`\`js
/* Starred.jsx */
${Starred}
\`\`\`

\`\`\`js
/* SendMail.jsx */
${SendMail}
\`\`\`

\`\`\`js
/* Drafts.jsx */
${Drafts}
\`\`\`

\`\`\`js
/* DraftCard.jsx */
${DraftCard}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
