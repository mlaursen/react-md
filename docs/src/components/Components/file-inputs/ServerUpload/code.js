import ServerUpload from '!!raw-loader!./index.jsx';
import styles from '!!raw-loader!./_styles.scss';

import server from '!!raw-loader!server/api/fakeUpload.js';

export default `/* ServerUpload.jsx */
${ServerUpload}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
\`\`\`

\`\`\`js
/* fake upload endpoint: fakeUpload.js */
${server}
`;

