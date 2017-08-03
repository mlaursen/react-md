import PageLayoutAndIcons from '!!raw-loader!./index.jsx';
import AppToolbar from '!!raw-loader!./AppToolbar.jsx';
import Recents from '!!raw-loader!./Recents.jsx';
import Favorites from '!!raw-loader!./Favorites.jsx';
import Nearby from '!!raw-loader!./Nearby.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* PageLayoutAndIcons.jsx */
${PageLayoutAndIcons}
\`\`\`

\`\`\`jsx
/* AppToolbar.jsx */
${AppToolbar}
\`\`\`

\`\`\`jsx
/* Recents.jsx */
${Recents}
\`\`\`

\`\`\`jsx
/* Favorites.jsx */
${Favorites}
\`\`\`

\`\`\`jsx
/* Nearby */
${Nearby}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
