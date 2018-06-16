import ToolbarSearch from '!!raw-loader!./index.jsx';
import Search from '!!raw-loader!./Search.jsx';
import Nav from '!!raw-loader!./Nav.jsx';
import Action from '!!raw-loader!./Action.jsx';
import FakeResult from '!!raw-loader!./FakeResult.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* ToolbarSearch.jsx */
${ToolbarSearch}
\`\`\`

\`\`\`jsx
/* Search.jsx */
${Search}
\`\`\`

\`\`\`jsx
/* Nav.jsx */
${Nav}
\`\`\`

\`\`\`jsx
/* Action.jsx */
${Action}
\`\`\`

\`\`\`jsx
/* FakeResult.jsx */
${FakeResult}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
